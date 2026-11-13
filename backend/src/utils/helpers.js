import mongoose from 'mongoose';

/**
 * Busca documento por id customizado (ex: 'usr-1', 'post-1') ou por ObjectId do MongoDB.
 */
export const findByIdOrCustomId = async (Model, id, populate = '') => {
  if (!id) return null;

  const isObjectId = mongoose.Types.ObjectId.isValid(id) && String(new mongoose.Types.ObjectId(id)) === String(id);

  let query;
  if (isObjectId) {
    query = Model.findOne({ $or: [{ _id: id }, { id: String(id) }] });
  } else {
    query = Model.findOne({ id: String(id) });
  }

  if (populate) {
    query = query.populate(populate);
  }

  return await query.exec();
};

/**
 * Atualiza documento por id customizado ou ObjectId.
 */
export const updateByIdOrCustomId = async (Model, id, updateData, options = { new: true, runValidators: true }) => {
  if (!id) return null;

  const isObjectId = mongoose.Types.ObjectId.isValid(id) && String(new mongoose.Types.ObjectId(id)) === String(id);
  const filter = isObjectId ? { $or: [{ _id: id }, { id: String(id) }] } : { id: String(id) };

  return await Model.findOneAndUpdate(filter, updateData, options).exec();
};

/**
 * Exclui documento por id customizado ou ObjectId.
 */
export const deleteByIdOrCustomId = async (Model, id) => {
  if (!id) return null;

  const isObjectId = mongoose.Types.ObjectId.isValid(id) && String(new mongoose.Types.ObjectId(id)) === String(id);
  const filter = isObjectId ? { $or: [{ _id: id }, { id: String(id) }] } : { id: String(id) };

  return await Model.findOneAndDelete(filter).exec();
};

/**
 * Gera um ID amigável com prefixo (ex: 'usr-abc123', 'post-xyz456')
 */
export const generateId = (prefix = 'item') => {
  const random = Math.random().toString(36).substring(2, 9);
  return `${prefix}-${random}`;
};

/**
 * Calcula divisão de receitas da plataforma: 85% criador, 15% plataforma
 */
export const calculateRevenueSplit = (grossAmount) => {
  const gross = Number(grossAmount) || 0;
  const netAmount = Number((gross * 0.85).toFixed(2));
  const platformAmount = Number((gross * 0.15).toFixed(2));

  return {
    grossAmount: gross,
    netAmount,
    platformAmount
  };
};
