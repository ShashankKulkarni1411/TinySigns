const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  totalUsers: {
    students: { type: Number, default: 0 },
    teachers: { type: Number, default: 0 },
    activeUsers: { type: Number, default: 0 }
  },
  totalLessons: { type: Number, default: 0 },
  systemHealth: { type: Number, default: 100 },
  recentActivity: [{ type: Object, default: [] }],
  systemAlerts: [{ type: Object, default: [] }],
  contentManagement: {
    totalLessons: { type: Number, default: 0 },
    published: { type: Number, default: 0 },
    drafts: { type: Number, default: 0 },
    views: { type: Number, default: 0 }
  },
  analytics: {
    activeUsers: { type: Number, default: 0 },
    lessonsCompleted: { type: Number, default: 0 },
    avgSessionTime: { type: Number, default: 0 },
    completionRate: { type: Number, default: 0 },
    userGrowth: { type: Number, default: 0 },
    modulePopularity: { type: Object, default: {} },
    mostPopularLesson: { type: String, default: '' },
    avgQuizScore: { type: Number, default: 0 }
  },
  settings: { type: Object, default: {} },
  securityCenter: {
    recentActivity: [{ type: Object, default: [] }],
    blockedIPs: [{ type: String, default: [] }],
    warnings: { type: Number, default: 0 },
    logs: [{ type: Object, default: [] }]
  },
  systemMonitoring: {
    cpuUsage: { type: Number, default: 0 },
    memoryUsage: { type: Number, default: 0 },
    diskUsage: { type: Number, default: 0 },
    networkUsage: { type: Number, default: 0 },
    serverStatus: { type: String, default: 'online' }
  }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);


