const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true }, // ISL, Mathematics, Science
  date: { type: Date, required: true },
  description: { type: String, default: '' },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  teacherEmail: { type: String, required: true },
  status: { type: String, enum: ['Upcoming', 'In Progress', 'Completed'], default: 'Upcoming' },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }], // Optional: assign to specific students
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);

