const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  parentEmail: { type: String, default: '' },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', default: null },
  numberOfLessonsCompleted: { type: Number, default: 0 },
  marksInExams: { type: Number, default: 0 },
  lastSeenVideo: { type: String, default: '' },
  totalExams: { type: Number, default: 0 },
  averageScore: { type: Number, default: 0 },
  bestScore: { type: Number, default: 0 },
  timeSpent: { type: Number, default: 0 }, // in minutes
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);


