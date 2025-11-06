const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const http = require('http');
const { Server } = require('socket.io');
const { connectDatabase } = require('./config/db');
const User = require('./models/userModel');
const Student = require('./models/Student');
const Teacher = require('./models/Teacher');
const Admin = require('./models/Admin');
const Parent = require('./models/Parent');
const Lesson = require('./models/Lesson');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Session configuration
// Note: Must be configured before passport middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'tinySigns-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 14 * 24 * 60 * 60 // 14 days
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS required in production
    httpOnly: true,
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' // Required for OAuth in production
  }
}));

// Initialize Passport and restore authentication state from session
app.use(passport.initialize());
app.use(passport.session());

// Passport serialization - store user ID in session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Passport deserialization - retrieve user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Google OAuth Strategy Configuration
// This strategy handles Google OAuth2 authentication flow
const googleCallbackURL = process.env.GOOGLE_CALLBACK_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://tinysigns.vercel.app/auth/google/callback'
    : 'http://localhost:3000/auth/google/callback');

// Validate Google OAuth credentials at startup
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.warn('⚠️  WARNING: Google OAuth credentials not found in environment variables.');
  console.warn('   Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your .env file.');
} else {
  console.log('✅ Google OAuth credentials loaded');
  console.log('📋 Callback URL:', googleCallbackURL);
  console.log('⚠️  IMPORTANT: Make sure this callback URL is registered in Google Cloud Console!');
}

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  // Redirect URI - must match exactly what's configured in Google Cloud Console
  // For local dev: http://localhost:3000/auth/google/callback
  // For production: https://tinysigns.vercel.app/auth/google/callback
  callbackURL: googleCallbackURL,
  scope: ['profile', 'email'] // Request user profile and email
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Extract user information from Google profile
    const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
    const name = profile.displayName || profile.name?.givenName || 'User';
    const profilePicture = profile.photos && profile.photos[0] ? profile.photos[0].value : '';
    const googleId = profile.id;

    if (!email) {
      return done(new Error('No email found in Google profile'), null);
    }

    // Check if user already exists by email
    let user = await User.findOne({ email: email });

    if (user) {
      // User exists - update Google OAuth info if not already set
      if (!user.googleId) {
        user.googleId = googleId;
        user.authProvider = 'google';
        if (!user.profilePicture && profilePicture) {
          user.profilePicture = profilePicture;
        }
        await user.save();
      }
      // Mark as logged in
      user.loggedIn = true;
      await user.save();
      return done(null, user);
    } else {
      // New user - create account with Google info
      user = await User.create({
        username: name,
        email: email,
        password: '', // No password for OAuth users
        stakeholder: 'student', // Default role - can be changed later
        loggedIn: true,
        googleId: googleId,
        profilePicture: profilePicture,
        authProvider: 'google'
      });
      return done(null, user);
    }
  } catch (err) {
    console.error('❌ Google OAuth strategy error:', err);
    console.error('   Error details:', err.message);
    // Log specific error types for easier debugging
    if (err.message && err.message.includes('redirect_uri_mismatch')) {
      console.error('   ⚠️  REDIRECT URI MISMATCH!');
      console.error('   Expected callback URL:', googleCallbackURL);
      console.error('   Make sure this URL is registered in Google Cloud Console:');
      console.error('   https://console.cloud.google.com/apis/credentials');
    }
    return done(err, null);
  }
}));

// Middleware
// CORS configuration - must allow credentials for OAuth sessions
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, or OAuth redirects)
    const allowedOrigins = [
      process.env.FRONTEND_URL || 'http://localhost:5173',
      'http://localhost:3000',
      'https://tinysigns.vercel.app'
    ];
    
    // Allow requests with no origin (server-to-server, OAuth callbacks)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Required for OAuth sessions and cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Role-based middleware
function requireRole(role) {
  return (req, res, next) => {
    if (!req.session.loggedin || req.session.role !== role) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
}

function requireAuth(req, res, next) {
  if (!req.session.loggedin) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  next();
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Session check endpoint
app.get('/api/auth/check-session', (req, res) => {
  if (req.session.loggedin) {
    res.json({
      authenticated: true,
      user: {
        email: req.session.email,
        role: req.session.role,
        name: req.session.name
      }
    });
  } else {
    res.json({ authenticated: false });
  }
});

// Check available roles for email (for dual-login)
app.post('/api/auth/check-roles', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if this email exists for multiple roles
    const allUsersWithEmail = await User.find({ email });
    const availableRoles = [...new Set(allUsersWithEmail.map(u => u.stakeholder))];

    if (availableRoles.length > 1) {
      return res.json({
        hasMultipleRoles: true,
        availableRoles: availableRoles,
        name: user.username
      });
    }

    // Single role - proceed with login
    user.loggedIn = true;
    await user.save();

    req.session.loggedin = true;
    req.session.email = user.email;
    req.session.role = user.stakeholder || 'student';
    req.session.name = user.username;

    res.json({
      hasMultipleRoles: false,
      user: {
        email: user.email,
        role: user.stakeholder,
        name: user.username
      }
    });
  } catch (err) {
    next(err);
  }
});

// Login endpoint with role selection
app.post('/api/auth/login', async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    
    // Find user with specific role
    const user = await User.findOne({ email, stakeholder: role });
    
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update loggedIn status
    user.loggedIn = true;
    await user.save();

    // Create session
    req.session.loggedin = true;
    req.session.email = user.email;
    req.session.role = role;
    req.session.name = user.username;

    res.json({
      message: 'Login successful',
      user: {
        email: user.email,
        role: role,
        name: user.username
      }
    });
  } catch (err) {
    next(err);
  }
});

// Logout endpoint
app.post('/api/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.json({ message: 'Logout successful' });
  });
});

// ============================================
// Google OAuth2 Routes (Passport.js)
// ============================================

/**
 * GET /auth/google
 * Initiates Google OAuth2 login flow
 * Redirects user to Google's consent screen
 */
app.get('/auth/google', (req, res, next) => {
  // Validate Google OAuth configuration
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.error('❌ Google OAuth not configured. Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in .env');
    return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=google_not_configured`);
  }

  // Log the expected callback URL for debugging
  const expectedCallbackUrl = process.env.GOOGLE_CALLBACK_URL || 
    (process.env.NODE_ENV === 'production' 
      ? 'https://tinysigns.vercel.app/auth/google/callback'
      : 'http://localhost:3000/auth/google/callback');
  
  console.log('🔐 Starting Google OAuth flow...');
  console.log('📋 Expected callback URL:', expectedCallbackUrl);
  console.log('⚠️  Make sure this URL is registered in Google Cloud Console!');

  // Use Passport to authenticate with Google
  // Passport will handle redirecting to Google's OAuth consent screen
  passport.authenticate('google', {
    scope: ['profile', 'email'], // Request user profile and email
    prompt: 'select_account' // Always show account selection
  })(req, res, next);
});

/**
 * GET /auth/google/callback
 * Handles the OAuth callback from Google
 * This is where Google redirects after user grants/denies permission
 */
app.get('/auth/google/callback', 
  // Step 1: Authenticate with Google using Passport
  passport.authenticate('google', { 
    failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=google`,
    session: true // Enable session
  }),
  // Step 2: If authentication succeeds, this function runs
  async (req, res) => {
    try {
      // At this point, req.user is set by Passport (from the strategy callback)
      const user = req.user;

      if (!user) {
        console.error('❌ No user found after Google authentication');
        return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=google`);
      }

      // Update session with user information
      req.session.loggedin = true;
      req.session.email = user.email;
      req.session.role = user.stakeholder || 'student';
      req.session.name = user.username;

      console.log('✅ Google OAuth successful for:', user.email);

      // Determine redirect path based on user role
      const dashboardRoutes = {
        student: '/home',
        parent: '/parent-dashboard',
        teacher: '/teacher-dashboard',
        admin: '/admin-dashboard'
      };
      const redirectPath = dashboardRoutes[user.stakeholder] || '/home';
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      
      // Redirect to appropriate dashboard
      res.redirect(`${frontendUrl}${redirectPath}`);
    } catch (err) {
      console.error('❌ Error in Google OAuth callback:', err);
      res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=google`);
    }
  }
);

// Legacy route for backward compatibility (if frontend still uses /api/auth/google)
app.get('/api/auth/google', (req, res) => {
  res.redirect('/auth/google');
});

// OAuth Facebook Login - Initial redirect
app.get('/api/auth/facebook', async (req, res) => {
  try {
    const FB_APP_ID = process.env.FB_APP_ID;
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const redirectUri = `${backendUrl}/api/auth/facebook/callback`;
    
    if (!FB_APP_ID) {
      return res.status(500).json({ message: 'Facebook OAuth not configured. Please set FB_APP_ID in environment variables.' });
    }
    
    const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${FB_APP_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=email,public_profile&response_type=code`;
    
    res.redirect(authUrl);
  } catch (err) {
    res.status(500).json({ message: 'OAuth error: ' + err.message });
  }
});

// OAuth Facebook Callback
app.get('/api/auth/facebook/callback', async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=oauth_failed`);
    }

    const FB_APP_ID = process.env.FB_APP_ID;
    const FB_APP_SECRET = process.env.FB_APP_SECRET;
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const redirectUri = `${backendUrl}/api/auth/facebook/callback`;

    // Exchange code for access token
    const tokenUrl = `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${FB_APP_ID}&client_secret=${FB_APP_SECRET}&redirect_uri=${encodeURIComponent(redirectUri)}&code=${code}`;
    
    const tokenResponse = await fetch(tokenUrl, {
      method: 'GET'
    });

    if (!tokenResponse.ok) {
      return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=token_exchange_failed`);
    }

    const tokenData = await tokenResponse.json();
    
    // Get user info from Facebook
    const userInfoResponse = await fetch(`https://graph.facebook.com/v18.0/me?fields=id,name,email&access_token=${tokenData.access_token}`);

    if (!userInfoResponse.ok) {
      return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=user_info_failed`);
    }

    const userInfo = await userInfoResponse.json();

    // Find or create user
    let user = await User.findOne({ email: userInfo.email });
    if (!user && userInfo.email) {
      // Create user with default role
      user = await User.create({
        username: userInfo.name || userInfo.email.split('@')[0],
        email: userInfo.email,
        password: 'oauth_' + Math.random().toString(36).substring(7),
        stakeholder: 'student',
        loggedIn: true
      });
    } else if (user) {
      user.loggedIn = true;
      await user.save();
    } else {
      return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=no_email`);
    }

    // Create session
    req.session.loggedin = true;
    req.session.email = user.email;
    req.session.role = user.stakeholder || 'student';
    req.session.name = user.username;

    // Redirect to appropriate dashboard
    const dashboardRoutes = {
      student: '/home',
      parent: '/parent-dashboard',
      teacher: '/teacher-dashboard',
      admin: '/admin-dashboard'
    };
    const redirectPath = dashboardRoutes[user.stakeholder] || '/home';
    
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}${redirectPath}`);
  } catch (err) {
    console.error('Facebook OAuth error:', err);
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=oauth_error`);
  }
});

// Routes
app.use('/api/videos', require('./routes/videoRoutes'));

// User CRUD endpoints
app.post('/api/users', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

app.get('/api/users', async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

app.get('/api/users/:email', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

app.put('/api/users/:email', async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/users/:email', async (req, res, next) => {
  try {
    const user = await User.findOneAndDelete({ email: req.params.email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
});

// Student endpoints
app.get('/api/student/:email', requireAuth, async (req, res, next) => {
  try {
    // Check if user can access this student's data
    if (req.session.role !== 'admin' && req.session.email !== req.params.email) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    let student = await Student.findOne({ email: req.params.email });
    if (!student) {
      student = await Student.create({ email: req.params.email });
    }
    res.json(student);
  } catch (err) {
    next(err);
  }
});

// Create student with auto-link to parent
app.post('/api/student/create', async (req, res, next) => {
  try {
    const { email, parentEmail, ...studentData } = req.body;
    
    // Create or update student
    let student = await Student.findOneAndUpdate(
      { email },
      { email, parentEmail, ...studentData },
      { new: true, upsert: true, runValidators: true }
    );

    // Auto-link to parent if parentEmail exists
    if (parentEmail) {
      // Check if parent User exists, if not create it
      let parentUser = await User.findOne({ email: parentEmail, stakeholder: 'parent' });
      if (!parentUser) {
        // Create parent User account
        parentUser = await User.create({
          email: parentEmail,
          username: parentEmail.split('@')[0] || 'Parent',
          password: 'defaultPassword123', // Parent should set their own password later
          stakeholder: 'parent',
          loggedIn: false
        });
      }

      // Check if parent document exists
      let parent = await Parent.findOne({ email: parentEmail });
      
      if (!parent) {
        // Create new parent document
        parent = await Parent.create({
          email: parentEmail,
          children: [{ studentEmail: email }]
        });
      } else {
        // Add student to existing parent's children array if not already there
        const childExists = parent.children.some(
          child => child.studentEmail === email
        );
        if (!childExists) {
          parent.children.push({ studentEmail: email });
          await parent.save();
        }
      }
      
      // Emit Socket.IO event for real-time update
      io.emit('parent-updated', { email: parentEmail });
    }

    // Emit Socket.IO event
    io.emit('student-created', { email });

    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
});

app.put('/api/student/:email', async (req, res, next) => {
  try {
    let student = await Student.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    
    // Emit Socket.IO event for real-time update
    io.emit('student-updated', { email: req.params.email });
    
    res.json(student);
  } catch (err) {
    next(err);
  }
});

// Teacher endpoints
app.get('/api/teacher/:email', requireAuth, async (req, res, next) => {
  try {
    // Check if user can access this teacher's data
    if (req.session.role !== 'admin' && req.session.email !== req.params.email) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    let teacher = await Teacher.findOne({ email: req.params.email })
      .populate('students', 'email numberOfLessonsCompleted averageScore timeSpent');
    if (!teacher) {
      teacher = await Teacher.create({ email: req.params.email });
    }
    
    // Calculate stats from populated students
    if (teacher.students && teacher.students.length > 0) {
      teacher.totalStudents = teacher.students.length;
      const totalLessons = teacher.students.reduce((sum, s) => sum + (s.numberOfLessonsCompleted || 0), 0);
      const totalScores = teacher.students.reduce((sum, s) => sum + (s.averageScore || 0), 0);
      teacher.lessonsCompleted = totalLessons;
      teacher.classAverage = teacher.students.length > 0 ? Math.round(totalScores / teacher.students.length) : 0;
    }
    
    res.json(teacher);
  } catch (err) {
    next(err);
  }
});

// Get teacher's student progress (for View Progress page)
app.get('/api/teacher/student/:id/progress', requireRole('teacher'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const teacherEmail = req.session.email;
    
    // Find student by ID (could be ObjectId or email)
    let student;
    try {
      // Try as ObjectId first
      student = await Student.findById(id);
    } catch (e) {
      // If not ObjectId, try as email
      student = await Student.findOne({ email: decodeURIComponent(id) });
    }
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    // Verify teacher has access to this student
    const teacher = await Teacher.findOne({ email: teacherEmail });
    if (!teacher || !teacher.students?.some(s => s.toString() === student._id.toString())) {
      return res.status(403).json({ message: 'Access denied - student not in your class' });
    }
    
    // Get user info for name
    const user = await User.findOne({ email: student.email, stakeholder: 'student' });
    
    const completedLessons = student.numberOfLessonsCompleted || 0;
    const totalLessons = 12; // 4 per module × 3 modules
    const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    
    // Calculate per-module progress
    const lessonsPerModule = completedLessons / 3;
    const totalLessonsPerModule = 4;
    
    const progress = {
      isl: {
        completed: Math.min(Math.floor(lessonsPerModule), totalLessonsPerModule),
        total: totalLessonsPerModule,
        score: student.averageScore || 0,
        needsHelp: (student.averageScore || 0) < 60
      },
      mathematics: {
        completed: Math.min(Math.floor(lessonsPerModule), totalLessonsPerModule),
        total: totalLessonsPerModule,
        score: student.averageScore || 0,
        needsHelp: (student.averageScore || 0) < 60
      },
      science: {
        completed: Math.min(Math.floor(lessonsPerModule), totalLessonsPerModule),
        total: totalLessonsPerModule,
        score: student.averageScore || 0,
        needsHelp: (student.averageScore || 0) < 60
      }
    };
    
    res.json({
      name: user?.username || student.email.split('@')[0],
      email: student.email,
      grade: 'Student', // Can be enhanced with actual grade field
      avatar: (user?.username || student.email.split('@')[0]).charAt(0).toUpperCase(),
      completedLessons: completedLessons,
      totalLessons: totalLessons,
      percentage: percentage,
      marksInExams: student.marksInExams || 0,
      averageScore: student.averageScore || 0,
      bestScore: student.bestScore || 0,
      progress: progress,
      recentActivity: [
        { 
          date: student.updatedAt ? new Date(student.updatedAt).toLocaleString() : 'Recently', 
          activity: `Completed ${completedLessons} lessons`, 
          score: student.averageScore || 0 
        }
      ]
    });
  } catch (err) {
    next(err);
  }
});

// Get teacher's students list with details
app.get('/api/teacher/:email/students', requireAuth, async (req, res, next) => {
  try {
    // Check if user can access this teacher's data
    if (req.session.role !== 'admin' && req.session.email !== req.params.email) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const teacher = await Teacher.findOne({ email: req.params.email })
      .populate({
        path: 'students',
        select: 'email numberOfLessonsCompleted averageScore timeSpent createdAt updatedAt'
      });
    
    if (!teacher) {
      return res.json([]);
    }
    
    // Get user data for names
    const studentEmails = teacher.students.map(s => s.email);
    const users = await User.find({ email: { $in: studentEmails }, stakeholder: 'student' })
      .select('email username');
    
    // Combine student data with user info
    const studentsWithDetails = teacher.students.map(student => {
      const user = users.find(u => u.email === student.email);
      const completed = student.numberOfLessonsCompleted || 0;
      const avgScore = student.averageScore || 0;
      
      return {
        id: student._id.toString(),
        email: student.email,
        name: user?.username || student.email.split('@')[0],
        avatar: (user?.username || student.email.split('@')[0]).charAt(0).toUpperCase(),
        lastActive: student.updatedAt ? new Date(student.updatedAt).toLocaleString() : 'Never',
        progress: {
          isl: { completed: Math.floor(completed / 3), total: 4, score: avgScore, needsHelp: avgScore < 60 },
          mathematics: { completed: Math.floor(completed / 3), total: 4, score: avgScore, needsHelp: avgScore < 60 },
          science: { completed: Math.floor(completed / 3), total: 4, score: avgScore, needsHelp: avgScore < 60 }
        },
        attendance: 85, // Default value, can be calculated from actual data
        behavior: avgScore >= 80 ? 'Excellent' : avgScore >= 60 ? 'Good' : 'Needs Attention'
      };
    });
    
    res.json(studentsWithDetails);
  } catch (err) {
    next(err);
  }
});

// Get all students for teacher to add (only from User collection with role='student')
app.get('/api/teacher/students/available', requireRole('teacher'), async (req, res, next) => {
  try {
    const teacherEmail = req.session.email;
    
    // Get current teacher to check existing students
    const teacher = await Teacher.findOne({ email: teacherEmail })
      .populate('students', 'email');
    const existingStudentEmails = teacher?.students?.map(s => s.email) || [];
    
    // Get students from User collection with role='student' (filter out parents and teachers)
    const studentUsers = await User.find({ 
      stakeholder: 'student'
    }).select('email username');
    
    // Filter out students already linked to this teacher
    const availableStudentUsers = studentUsers.filter(
      user => !existingStudentEmails.includes(user.email)
    );
    
    // Get student data from Student collection
    const studentEmails = availableStudentUsers.map(u => u.email);
    const studentData = await Student.find({ email: { $in: studentEmails } })
      .select('email parentEmail numberOfLessonsCompleted averageScore');
    
    // Combine user and student data
    const students = availableStudentUsers.map(user => {
      const data = studentData.find(s => s.email === user.email);
      return {
        email: user.email,
        name: user.username || user.email.split('@')[0],
        parentEmail: data?.parentEmail || '',
        numberOfLessonsCompleted: data?.numberOfLessonsCompleted || 0,
        averageScore: data?.averageScore || 0
      };
    });
    
    res.json(students);
  } catch (err) {
    next(err);
  }
});

// Get all students for parent to add (available students not yet linked)
app.get('/api/parent/students/available', requireRole('parent'), async (req, res, next) => {
  try {
    const parentEmail = req.session.email;
    
    // Get current parent to check existing children
    const parent = await Parent.findOne({ email: parentEmail });
    const existingChildrenEmails = parent?.children?.map(c => c.studentEmail) || [];
    
    // Get all students from User collection
    const studentUsers = await User.find({ 
      stakeholder: 'student', 
      loggedIn: true 
    }).select('email username');
    
    // Filter out students already linked to this parent
    const availableStudents = studentUsers
      .filter(user => !existingChildrenEmails.includes(user.email))
      .map(user => ({
        email: user.email,
        name: user.username || user.email.split('@')[0]
      }));
    
    res.json(availableStudents);
  } catch (err) {
    next(err);
  }
});

// Add student to teacher
app.post('/api/teacher/add-student', requireRole('teacher'), async (req, res, next) => {
  try {
    const { studentEmail } = req.body;
    const teacherEmail = req.session.email;

    // Get teacher
    let teacher = await Teacher.findOne({ email: teacherEmail });
    if (!teacher) {
      teacher = await Teacher.create({ email: teacherEmail });
    }

    // Find student by email
    let student = await Student.findOne({ email: studentEmail });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update both sides of the relationship
    const studentId = student._id;
    const teacherId = teacher._id;

    // Add student to teacher's students array (avoid duplicates)
    await Teacher.updateOne(
      { _id: teacherId },
      { $addToSet: { students: studentId } }
    );

    // Set student's teacherId
    await Student.updateOne(
      { _id: studentId },
      { $set: { teacherId: teacherId } }
    );

    // Refresh teacher data to get updated count
    teacher = await Teacher.findById(teacherId);
    teacher.totalStudents = teacher.students ? teacher.students.length : 0;
    await teacher.save();

    // Emit Socket.IO event for real-time update
    io.emit('teacher-updated', { email: teacherEmail });

    res.json({ message: 'Student added successfully', teacher });
  } catch (err) {
    next(err);
  }
});

// Create lesson plan (legacy - kept for compatibility)
app.post('/api/teacher/create-plan', requireRole('teacher'), async (req, res, next) => {
  try {
    const teacherEmail = req.session.email;
    let teacher = await Teacher.findOne({ email: teacherEmail });
    if (!teacher) {
      teacher = await Teacher.create({ email: teacherEmail });
    }

    const newPlan = { ...req.body, createdAt: new Date() };
    teacher.lessonPlans = teacher.lessonPlans || [];
    teacher.lessonPlans.push(newPlan);
    await teacher.save();

    io.emit('teacher-updated', { email: teacherEmail });
    res.json({ message: 'Lesson plan created', teacher });
  } catch (err) {
    next(err);
  }
});

// Schedule a new lesson (saves to Lesson collection)
app.post('/api/teacher/schedule-lesson', requireRole('teacher'), async (req, res, next) => {
  try {
    const teacherEmail = req.session.email;
    const { title, subject, date, description, status, students } = req.body;
    
    // Get teacher to link lesson
    let teacher = await Teacher.findOne({ email: teacherEmail });
    if (!teacher) {
      teacher = await Teacher.create({ email: teacherEmail });
    }

    // Create new lesson
    const lesson = new Lesson({
      title,
      subject,
      date: new Date(date),
      description: description || '',
      teacherId: teacher._id,
      teacherEmail: teacherEmail,
      status: status || 'Upcoming',
      students: students || []
    });

    await lesson.save();

    // Emit Socket.IO event for real-time update
    io.emit('lesson-scheduled', { teacherEmail, lesson });

    res.status(201).json({ message: 'Lesson scheduled successfully', lesson });
  } catch (err) {
    next(err);
  }
});

// Get teacher's scheduled lessons
app.get('/api/teacher/:teacherEmail/lessons', requireAuth, async (req, res, next) => {
  try {
    const teacherEmail = req.params.teacherEmail;
    
    // Verify access
    if (req.session.role !== 'admin' && req.session.email !== teacherEmail) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const lessons = await Lesson.find({ teacherEmail })
      .sort({ date: 1 }) // Sort by date ascending
      .populate('students', 'email');

    res.json(lessons);
  } catch (err) {
    next(err);
  }
});

// Update a scheduled lesson
app.put('/api/teacher/lesson/:lessonId', requireRole('teacher'), async (req, res, next) => {
  try {
    const teacherEmail = req.session.email;
    const { lessonId } = req.params;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    // Verify teacher owns this lesson
    if (lesson.teacherEmail !== teacherEmail) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Update lesson
    Object.assign(lesson, req.body);
    if (req.body.date) {
      lesson.date = new Date(req.body.date);
    }
    await lesson.save();

    io.emit('lesson-updated', { teacherEmail, lesson });
    res.json({ message: 'Lesson updated successfully', lesson });
  } catch (err) {
    next(err);
  }
});

// Delete a scheduled lesson
app.delete('/api/teacher/lesson/:lessonId', requireRole('teacher'), async (req, res, next) => {
  try {
    const teacherEmail = req.session.email;
    const { lessonId } = req.params;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    // Verify teacher owns this lesson
    if (lesson.teacherEmail !== teacherEmail) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Lesson.findByIdAndDelete(lessonId);

    io.emit('lesson-deleted', { teacherEmail, lessonId });
    res.json({ message: 'Lesson deleted successfully' });
  } catch (err) {
    next(err);
  }
});

// Create assessment
app.post('/api/teacher/create-assessment', requireRole('teacher'), async (req, res, next) => {
  try {
    const teacherEmail = req.session.email;
    let teacher = await Teacher.findOne({ email: teacherEmail });
    if (!teacher) {
      teacher = await Teacher.create({ email: teacherEmail });
    }

    const newAssessment = { ...req.body, createdAt: new Date() };
    teacher.assessments = teacher.assessments || [];
    teacher.assessments.push(newAssessment);
    await teacher.save();

    io.emit('teacher-updated', { email: teacherEmail });
    res.json({ message: 'Assessment created', teacher });
  } catch (err) {
    next(err);
  }
});

app.put('/api/teacher/:email', async (req, res, next) => {
  try {
    let teacher = await Teacher.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    res.json(teacher);
  } catch (err) {
    next(err);
  }
});

// Admin endpoints
app.get('/api/admin/users', requireRole('admin'), async (req, res, next) => {
  try {
    const users = await User.find({}, 'username email stakeholder loggedIn createdAt').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

app.get('/api/admin/:email', requireAuth, async (req, res, next) => {
  try {
    // Only admin can access admin data
    if (req.session.role !== 'admin' || req.session.email !== req.params.email) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    let admin = await Admin.findOne({ email: req.params.email });
    if (!admin) {
      admin = await Admin.create({ email: req.params.email });
    }
    res.json(admin);
  } catch (err) {
    next(err);
  }
});

app.put('/api/admin/:email', async (req, res, next) => {
  try {
    let admin = await Admin.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    res.json(admin);
  } catch (err) {
    next(err);
  }
});

// Parent endpoints
app.get('/api/parent/:email', requireAuth, async (req, res, next) => {
  try {
    // Check if user can access this parent's data
    if (req.session.role !== 'admin' && req.session.email !== req.params.email) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    let parent = await Parent.findOne({ email: req.params.email });
    if (!parent) {
      parent = await Parent.create({ email: req.params.email });
    }
    
    // Fetch children's data if children exist
    if (parent.children && parent.children.length > 0) {
      const childrenData = await Promise.all(
        parent.children.map(async (child) => {
          const student = await Student.findOne({ email: child.studentEmail });
          return student || { email: child.studentEmail, notFound: true };
        })
      );
      parent = parent.toObject();
      parent.childrenData = childrenData;
    }
    
    res.json(parent);
  } catch (err) {
    next(err);
  }
});

// Add child to parent
app.post('/api/parent/add-child', requireRole('parent'), async (req, res, next) => {
  try {
    const { studentEmail } = req.body;
    const parentEmail = req.session.email;

    let parent = await Parent.findOne({ email: parentEmail });
    if (!parent) {
      parent = await Parent.create({ email: parentEmail });
    }

    // Check if child already exists
    const childExists = parent.children?.some(c => c.studentEmail === studentEmail);
    if (!childExists) {
      parent.children = parent.children || [];
      parent.children.push({ studentEmail });
      
      // Update parent stats
      parent.totalChildrenActivity = (parent.totalChildrenActivity || 0) + 1;
      
      await parent.save();

      // Update student's parentEmail if not set
      const student = await Student.findOne({ email: studentEmail });
      if (student && !student.parentEmail) {
        student.parentEmail = parentEmail;
        await student.save();
      }

      io.emit('parent-updated', { email: parentEmail });
      res.json({ message: 'Child added successfully', parent });
    } else {
      res.status(400).json({ message: 'Child already linked' });
    }
  } catch (err) {
    next(err);
  }
});

// Get parent's child progress summary
app.get('/api/parent/child/:parentEmail', requireRole('parent'), async (req, res, next) => {
  try {
    const parentEmail = req.session.email;
    
    // Verify parent is accessing their own data
    if (req.params.parentEmail !== parentEmail) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Get parent's children
    const parent = await Parent.findOne({ email: parentEmail });
    if (!parent || !parent.children || parent.children.length === 0) {
      return res.json({ progress: null, children: [] });
    }
    
    // Fetch all children's progress data
    const childrenEmails = parent.children.map(c => c.studentEmail);
    const students = await Student.find({ email: { $in: childrenEmails } });
    
    // Calculate overall progress from all children
    const totalLessons = 12; // 4 per module (ISL, Math, Science) × 3 modules
    let totalCompleted = 0;
    let totalScores = 0;
    let childrenCount = 0;
    
    const childrenProgress = students.map(student => {
      const completed = student.numberOfLessonsCompleted || 0;
      const avgScore = student.averageScore || 0;
      totalCompleted += completed;
      totalScores += avgScore;
      childrenCount++;
      
      return {
        email: student.email,
        completedLessons: completed,
        averageScore: avgScore,
        progress: {
          overall: totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0,
          mathematics: Math.round(((Math.floor(completed / 3) / 4) * 100)),
          science: Math.round(((Math.floor(completed / 3) / 4) * 100)),
          isl: Math.round(((Math.floor(completed / 3) / 4) * 100))
        }
      };
    });
    
    const overallProgress = totalLessons > 0 ? Math.round((totalCompleted / (childrenCount * totalLessons)) * 100) : 0;
    const overallAverageScore = childrenCount > 0 ? Math.round(totalScores / childrenCount) : 0;
    
    res.json({
      progress: {
        overall: overallProgress,
        individualProgress: {
          mathematics: childrenProgress.length > 0 ? Math.round(childrenProgress.reduce((sum, c) => sum + c.progress.mathematics, 0) / childrenProgress.length) : 0,
          science: childrenProgress.length > 0 ? Math.round(childrenProgress.reduce((sum, c) => sum + c.progress.science, 0) / childrenProgress.length) : 0,
          isl: childrenProgress.length > 0 ? Math.round(childrenProgress.reduce((sum, c) => sum + c.progress.isl, 0) / childrenProgress.length) : 0
        }
      },
      children: childrenProgress
    });
  } catch (err) {
    next(err);
  }
});

// View child progress (for parent)
app.get('/api/parent/view-progress/:studentId', requireRole('parent'), async (req, res, next) => {
  try {
    const parentEmail = req.session.email;
    const studentEmail = decodeURIComponent(req.params.studentId);
    
    // Verify parent has access to this student
    const parent = await Parent.findOne({ email: parentEmail });
    if (!parent || !parent.children?.some(c => c.studentEmail === studentEmail)) {
      return res.status(403).json({ message: 'Access denied - student not linked to parent' });
    }
    
    // Fetch student data with progress
    const student = await Student.findOne({ email: studentEmail });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    // Get user info for name
    const user = await User.findOne({ email: studentEmail, stakeholder: 'student' });
    
    res.json({
      student: {
        email: student.email,
        name: user?.username || student.email.split('@')[0],
        numberOfLessonsCompleted: student.numberOfLessonsCompleted || 0,
        averageScore: student.averageScore || 0,
        bestScore: student.bestScore || 0,
        timeSpent: student.timeSpent || 0,
        totalExams: student.totalExams || 0,
        marksInExams: student.marksInExams || 0,
        createdAt: student.createdAt,
        updatedAt: student.updatedAt
      }
    });
  } catch (err) {
    next(err);
  }
});

// Add schedule for parent
app.post('/api/parent/add-schedule', requireRole('parent'), async (req, res, next) => {
  try {
    const parentEmail = req.session.email;
    let parent = await Parent.findOne({ email: parentEmail });
    if (!parent) {
      parent = await Parent.create({ email: parentEmail });
    }

    const newSchedule = { ...req.body, createdAt: new Date() };
    parent.schedule = parent.schedule || [];
    parent.schedule.push(newSchedule);
    await parent.save();

    io.emit('parent-updated', { email: parentEmail });
    res.json({ message: 'Schedule added', parent });
  } catch (err) {
    next(err);
  }
});

// Get student progress (for progress dashboard)
app.get('/api/student/progress/:email', requireAuth, async (req, res, next) => {
  try {
    // Check if user can access this student's data
    if (req.session.role !== 'admin' && req.session.email !== req.params.email) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const student = await Student.findOne({ email: req.params.email });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({
      marksInExams: student.marksInExams || 0,
      totalExams: student.totalExams || 0,
      averageScore: student.averageScore || 0,
      bestScore: student.bestScore || 0,
      numberOfLessonsCompleted: student.numberOfLessonsCompleted || 0,
      timeSpent: student.timeSpent || 0
    });
  } catch (err) {
    next(err);
  }
});

// Get per-subject progress for a student
app.get('/api/student/:email/subjects/progress', requireAuth, async (req, res, next) => {
  try {
    // Check if user can access this student's data
    if (req.session.role !== 'admin' && req.session.email !== req.params.email) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const student = await Student.findOne({ email: req.params.email });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const completedLessons = student.numberOfLessonsCompleted || 0;
    const lessonsPerModule = completedLessons / 3; // Distribute across 3 modules
    const totalLessonsPerModule = 4; // Each module has 4 lessons

    const subjects = [
      {
        name: 'Indian Sign Language',
        module: 'isl',
        completedLessons: Math.min(Math.floor(lessonsPerModule), totalLessonsPerModule),
        totalLessons: totalLessonsPerModule,
        percentage: totalLessonsPerModule > 0 
          ? Math.round((Math.min(Math.floor(lessonsPerModule), totalLessonsPerModule) / totalLessonsPerModule) * 100) 
          : 0,
        averageScore: student.averageScore || 0
      },
      {
        name: 'Mathematics',
        module: 'mathematics',
        completedLessons: Math.min(Math.floor(lessonsPerModule), totalLessonsPerModule),
        totalLessons: totalLessonsPerModule,
        percentage: totalLessonsPerModule > 0 
          ? Math.round((Math.min(Math.floor(lessonsPerModule), totalLessonsPerModule) / totalLessonsPerModule) * 100) 
          : 0,
        averageScore: student.averageScore || 0
      },
      {
        name: 'Science',
        module: 'science',
        completedLessons: Math.min(Math.floor(lessonsPerModule), totalLessonsPerModule),
        totalLessons: totalLessonsPerModule,
        percentage: totalLessonsPerModule > 0 
          ? Math.round((Math.min(Math.floor(lessonsPerModule), totalLessonsPerModule) / totalLessonsPerModule) * 100) 
          : 0,
        averageScore: student.averageScore || 0
      }
    ];

    res.json(subjects);
  } catch (err) {
    next(err);
  }
});

// Update student progress when lesson is completed
app.post('/api/student/update-progress', requireAuth, async (req, res, next) => {
  try {
    const { studentId, subjectId, lessonCompleted } = req.body;
    const studentEmail = req.session.email;
    
    // Verify student can only update their own progress (unless admin)
    if (req.session.role !== 'admin' && req.session.email !== studentEmail) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const student = await Student.findOne({ email: studentEmail });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Increment completed lessons if lesson is marked complete
    if (lessonCompleted) {
      student.numberOfLessonsCompleted = (student.numberOfLessonsCompleted || 0) + 1;
    }

    await student.save();

    // Emit Socket.IO events for real-time update to all relevant dashboards
    io.emit('progressUpdated', { 
      studentId: student._id.toString(),
      studentEmail: studentEmail,
      progress: {
        numberOfLessonsCompleted: student.numberOfLessonsCompleted,
        averageScore: student.averageScore
      }
    });

    res.json({ 
      message: 'Progress updated successfully',
      student: {
        numberOfLessonsCompleted: student.numberOfLessonsCompleted,
        averageScore: student.averageScore
      }
    });
  } catch (err) {
    next(err);
  }
});

app.put('/api/parent/:email', async (req, res, next) => {
  try {
    let parent = await Parent.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    res.json(parent);
  } catch (err) {
    next(err);
  }
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Server Error' });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

connectDatabase(process.env.MONGO_URI)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('MongoDB connected successfully');
    server.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });


