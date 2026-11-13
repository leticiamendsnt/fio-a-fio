import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    postId: {
      type: String,
      required: [true, 'ID do post é obrigatório'],
      index: true
    },
    authorId: {
      type: String,
      required: [true, 'ID do autor é obrigatório'],
      index: true
    },
    authorSnapshot: {
      name: String,
      username: String,
      avatar: String
    },
    text: {
      type: String,
      required: [true, 'Texto do comentário é obrigatório'],
      trim: true
    },
    timeAgo: {
      type: String,
      default: 'Agora mesmo'
    }
  },
  {
    timestamps: true
  }
);

CommentSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.id || ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const Comment = mongoose.model('Comment', CommentSchema);
