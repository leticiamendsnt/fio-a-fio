import mongoose from 'mongoose';

const PurchaseSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    userId: {
      type: String,
      required: [true, 'ID do usuário é obrigatório'],
      index: true
    },
    lessonId: {
      type: String,
      required: [true, 'ID da aula é obrigatório'],
      index: true
    },
    date: {
      type: String,
      default: () => new Date().toLocaleDateString('pt-BR')
    },
    status: {
      type: String,
      enum: ['Concluído', 'Pendente', 'Cancelado'],
      default: 'Concluído'
    },
    amount: {
      type: Number,
      required: [true, 'Valor da compra é obrigatório']
    },
    paymentMethod: {
      type: String,
      default: 'PIX'
    },
    lessonProgressPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    }
  },
  {
    timestamps: true
  }
);

PurchaseSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.id || ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const Purchase = mongoose.model('Purchase', PurchaseSchema);
