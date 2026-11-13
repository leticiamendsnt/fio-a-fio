import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      trim: true
    },
    username: {
      type: String,
      required: [true, 'Nome de usuário é obrigatório'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },
    email: {
      type: String,
      required: [true, 'E-mail é obrigatório'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },
    password: {
      type: String,
      required: [true, 'Senha é obrigatória']
    },
    role: {
      type: String,
      enum: ['user', 'creator', 'admin', 'guest'],
      default: 'user'
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    bio: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    },
    followersCount: {
      type: Number,
      default: 0
    },
    followingCount: {
      type: Number,
      default: 0
    },
    following: {
      type: [String],
      default: []
    },
    followers: {
      type: [String],
      default: []
    },
    joinedDate: {
      type: String,
      default: () => {
        const date = new Date();
        return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
      }
    },
    verifiedCreator: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['Ativo', 'Em Análise', 'Suspenso'],
      default: 'Ativo'
    }
  },
  {
    timestamps: true
  }
);

// Hash de senha antes de salvar caso tenha sido alterada
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para verificar senha
UserSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password || !candidatePassword) return false;
  // Suporta comparação com hash bcrypt ou texto plano (para dados legados de migração se houver)
  if (this.password.startsWith('$2a$') || this.password.startsWith('$2b$')) {
    return await bcrypt.compare(candidatePassword, this.password);
  }
  return candidatePassword === this.password;
};

// Formatação JSON pública
UserSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.id || ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.password; // Não expõe a senha em JSON de saída
    return ret;
  }
});

export const User = mongoose.model('User', UserSchema);
