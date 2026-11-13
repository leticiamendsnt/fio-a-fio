import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    conversationId: {
      type: String,
      required: true,
      index: true
    },
    senderId: {
      type: String,
      required: true,
      index: true
    },
    text: {
      type: String,
      required: [true, 'Texto da mensagem é obrigatório'],
      trim: true
    },
    timestamp: {
      type: String,
      default: () => new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    },
    read: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

MessageSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.id || ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const Message = mongoose.model('Message', MessageSchema);
