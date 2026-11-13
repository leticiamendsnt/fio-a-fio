import mongoose from 'mongoose';

const StorySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    authorId: {
      type: String,
      required: true,
      index: true
    },
    authorNameSnapshot: {
      type: String,
      default: ''
    },
    avatarSnapshot: {
      type: String,
      default: ''
    },
    mediaUrl: {
      type: String,
      required: [true, 'URL da mídia do story é obrigatória']
    },
    caption: {
      type: String,
      default: ''
    },
    hasStory: {
      type: Boolean,
      default: true
    },
    hasUnseen: {
      type: Boolean,
      default: true
    },
    isOwn: {
      type: Boolean,
      default: false
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000)
    }
  },
  {
    timestamps: true
  }
);

StorySchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.id || ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const Story = mongoose.model('Story', StorySchema);
