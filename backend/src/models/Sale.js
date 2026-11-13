import mongoose from 'mongoose';

const SaleSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    purchaseId: {
      type: String,
      index: true
    },
    lessonId: {
      type: String,
      required: true,
      index: true
    },
    creatorId: {
      type: String,
      required: true,
      index: true
    },
    buyerId: {
      type: String,
      required: true,
      index: true
    },
    courseTitle: {
      type: String,
      required: true
    },
    buyerName: {
      type: String,
      required: true
    },
    date: {
      type: String,
      default: () => new Date().toLocaleDateString('pt-BR')
    },
    grossAmount: {
      type: Number,
      required: true
    },
    netAmount: {
      type: Number,
      required: true // 85%
    },
    platformAmount: {
      type: Number,
      required: true // 15%
    },
    status: {
      type: String,
      enum: ['Aprovado', 'Pendente', 'Cancelado'],
      default: 'Aprovado'
    }
  },
  {
    timestamps: true
  }
);

SaleSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.id || ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const Sale = mongoose.model('Sale', SaleSchema);
