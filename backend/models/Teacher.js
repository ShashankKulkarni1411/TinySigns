const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  totalStudents: { type: Number, default: 0 },
  activeToday: { type: Number, default: 0 },
  lessonsCompleted: { type: Number, default: 0 },
  classAverage: { type: Number, default: 0 },
  lessonPlans: [{ type: Object, default: [] }],
  assessments: [{ type: Object, default: [] }],
  messages: [{ type: Object, default: [] }],
  settings: { type: Object, default: {} },
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);


