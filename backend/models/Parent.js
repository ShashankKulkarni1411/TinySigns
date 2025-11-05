const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  children: [{ 
    studentEmail: { type: String, required: true }
  }],
  totalChildrenActivity: { type: Number, default: 0 },
  lessonsDoneToday: { type: Number, default: 0 },
  avgScore: { type: Number, default: 0 },
  schedule: [{ type: Object, default: [] }],
  messages: [{ type: Object, default: [] }],
  settings: { type: Object, default: {} },
}, { timestamps: true });

module.exports = mongoose.model('Parent', parentSchema);


