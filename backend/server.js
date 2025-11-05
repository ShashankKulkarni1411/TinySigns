const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const http = require('http');
const { Server } = require('socket.io');
const { connectDatabase } = require('./config/db');
const User = require('./models/userModel');
const Student = require('./models/Student');
const Teacher = require('./models/Teacher');
const Admin = require('./models/Admin');
const Parent = require('./models/Parent');

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
app.use(session({
  secret: process.env.SESSION_SECRET || 'tinySigns-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 14 * 24 * 60 * 60 // 14 days
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days
  }
}));

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
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
    
    let teacher = await Teacher.findOne({ email: req.params.email });
    if (!teacher) {
      teacher = await Teacher.create({ email: req.params.email });
    }
    res.json(teacher);
  } catch (err) {
    next(err);
  }
});

// Get all students for teacher to add (only from User collection with role='student')
app.get('/api/teacher/students/available', requireRole('teacher'), async (req, res, next) => {
  try {
    // Get students from User collection with role='student' and loggedin=true
    const studentUsers = await User.find({ 
      stakeholder: 'student', 
      loggedIn: true 
    }).select('email username');
    
    // Get student data from Student collection
    const studentEmails = studentUsers.map(u => u.email);
    const studentData = await Student.find({ email: { $in: studentEmails } })
      .select('email parentEmail numberOfLessonsCompleted averageScore');
    
    // Combine user and student data
    const students = studentUsers.map(user => {
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

    // Get teacher and update totalStudents
    let teacher = await Teacher.findOne({ email: teacherEmail });
    if (!teacher) {
      teacher = await Teacher.create({ email: teacherEmail });
    }

    // Increment totalStudents
    teacher.totalStudents = (teacher.totalStudents || 0) + 1;
    await teacher.save();

    // Emit Socket.IO event for real-time update
    io.emit('teacher-updated', { email: teacherEmail });

    res.json({ message: 'Student added successfully', teacher });
  } catch (err) {
    next(err);
  }
});

// Create lesson plan
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


