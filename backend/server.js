const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDatabase } = require('./config/db');
const User = require('./models/userModel');
const Student = require('./models/Student');
const Teacher = require('./models/Teacher');
const Admin = require('./models/Admin');
const Parent = require('./models/Parent');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
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
app.get('/api/student/:email', async (req, res, next) => {
  try {
    let student = await Student.findOne({ email: req.params.email });
    if (!student) {
      student = await Student.create({ email: req.params.email });
    }
    res.json(student);
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
    res.json(student);
  } catch (err) {
    next(err);
  }
});

// Teacher endpoints
app.get('/api/teacher/:email', async (req, res, next) => {
  try {
    let teacher = await Teacher.findOne({ email: req.params.email });
    if (!teacher) {
      teacher = await Teacher.create({ email: req.params.email });
    }
    res.json(teacher);
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
app.get('/api/admin/:email', async (req, res, next) => {
  try {
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
app.get('/api/parent/:email', async (req, res, next) => {
  try {
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

const PORT = process.env.PORT || 5000;

connectDatabase(process.env.MONGO_URI)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });


