import mongoose from 'mongoose';

const MaterialSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    authorId: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      required: [true, 'Título do material é obrigatório'],
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'PDF / Revista'
    },
    category: {
      type: String,
      default: 'Vestuário'
    },
    downloadsCount: {
      type: Number,
      default: 0
    },
    author: {
      type: String,
      default: 'Equipe Fio a Fio'
    },
    date: {
      type: String,
      default: () => new Date().toLocaleDateString('pt-BR')
    },
    fileSize: {
      type: String,
      default: '1.5 MB'
    },
    thumbnail: {
      type: String,
      default: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
    },
    downloadUrl: {
      type: String,
      default: '#'
    }
  },
  {
    timestamps: true
  }
);

MaterialSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.id || ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const Material = mongoose.model('Material', MaterialSchema);
