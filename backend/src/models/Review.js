import mongoose from 'mongoose';

/**
 * Modelo de Avaliação (Review) de Vídeo-aulas
 * Armazena a nota em estrelas (1 a 5), o comentário do aluno e dados do autor.
 */
const ReviewSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    lessonId: {
      type: String,
      required: [true, 'ID da vídeo-aula é obrigatório'],
      index: true
    },
    userId: {
      type: String,
      required: [true, 'ID do usuário avaliador é obrigatório'],
      index: true
    },
    userName: {
      type: String,
      default: 'Aluna Fio a Fio'
    },
    userAvatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    rating: {
      type: Number,
      required: [true, 'Nota da avaliação é obrigatória'],
      min: [1, 'A nota mínima é 1 estrela'],
      max: [5, 'A nota máxima é 5 estrelas']
    },
    comment: {
      type: String,
      required: [true, 'Comentário da avaliação é obrigatório'],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

ReviewSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.id || ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const Review = mongoose.model('Review', ReviewSchema);
