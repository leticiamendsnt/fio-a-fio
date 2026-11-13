import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
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
    authorSnapshot: {
      name: String,
      username: String,
      avatar: String,
      verified: Boolean
    },
    title: {
      type: String,
      required: [true, 'Título é obrigatório'],
      trim: true
    },
    content: {
      type: String,
      required: [true, 'Conteúdo é obrigatório'],
      trim: true
    },
    category: {
      type: String,
      default: 'Vestuário'
    },
    image: {
      type: String,
      default: ''
    },
    likesCount: {
      type: Number,
      default: 0
    },
    isLiked: {
      type: Boolean,
      default: false
    },
    likedBy: {
      type: [String],
      default: []
    },
    commentsCount: {
      type: Number,
      default: 0
    },
    timeAgo: {
      type: String,
      default: 'Agora mesmo'
    },
    moderationStatus: {
      type: String,
      enum: ['active', 'pending', 'removed'],
      default: 'active',
      index: true
    }
  },
  {
    timestamps: true
  }
);

PostSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.id || ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const Post = mongoose.model('Post', PostSchema);
