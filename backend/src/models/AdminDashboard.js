import mongoose from 'mongoose';

const AdminReportSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    postTitle: { type: String, required: true },
    author: { type: String, required: true },
    reason: { type: String, required: true },
    date: { type: String, default: 'Hoje' },
    status: { type: String, default: 'Em Análise' }
  },
  { _id: false }
);

const AdminDashboardSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: 'main-dashboard',
      unique: true
    },
    totalUsers: { type: Number, default: 0 },
    activeCreators: { type: Number, default: 0 },
    publishedCourses: { type: Number, default: 0 },
    totalPosts: { type: Number, default: 0 },
    pendingModerationPosts: { type: Number, default: 0 },
    pendingReports: { type: Number, default: 0 },
    platformRevenueMonth: { type: Number, default: 0 },
    recentUsers: { type: Array, default: [] },
    reportedPosts: { type: [AdminReportSchema], default: [] }
  },
  {
    timestamps: true
  }
);

AdminDashboardSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.id || ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const AdminDashboard = mongoose.model('AdminDashboard', AdminDashboardSchema);
