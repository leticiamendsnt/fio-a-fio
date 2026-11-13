import mongoose from 'mongoose';

const LessonItemSchema = new mongoose.Schema(
  {
    id: { type: String, default: () => 'les-' + Math.random().toString(36).substring(2, 7) },
    title: { type: String, required: true },
    duration: { type: String, default: '15 min' },
    videoUrl: { type: String, default: 'https://www.w3schools.com/html/mov_bbb.mp4' }
  },
  { _id: false }
);

const ModuleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    lessons: [LessonItemSchema]
  },
  { _id: false }
);

const VideoLessonSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    creatorId: {
      type: String,
      required: [true, 'ID do criador é obrigatório'],
      index: true
    },
    creatorBio: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      required: [true, 'Título da vídeo-aula é obrigatório'],
      trim: true
    },
    subtitle: {
      type: String,
      default: '',
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    price: {
      type: Number,
      required: [true, 'Preço é obrigatório'],
      min: [0, 'Preço não pode ser negativo']
    },
    rating: {
      type: Number,
      default: 5.0,
      min: 0,
      max: 5
    },
    reviewsCount: {
      type: Number,
      default: 0
    },
    duration: {
      type: String,
      default: '1h 30min'
    },
    level: {
      type: String,
      enum: ['Iniciante', 'Intermediário', 'Avançado'],
      default: 'Iniciante'
    },
    category: {
      type: String,
      default: 'Vestuário'
    },
    thumbnail: {
      type: String,
      default: 'https://images.unsplash.com/photo-1619252584172-a83a949b6efd?w=800&auto=format&fit=crop&q=80'
    },
    videoUrl: {
      type: String,
      default: ''
    },
    studentsCount: {
      type: Number,
      default: 0
    },
    requirements: {
      type: [String],
      default: []
    },
    whatYouWillLearn: {
      type: [String],
      default: []
    },
    modules: {
      type: [ModuleSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

VideoLessonSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.id || ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const VideoLesson = mongoose.model('VideoLesson', VideoLessonSchema);
