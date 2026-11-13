import { Purchase } from '../models/Purchase.js';
import { salesService } from '../services/salesService.js';
import { findByIdOrCustomId, updateByIdOrCustomId, deleteByIdOrCustomId } from '../utils/helpers.js';

export const getPurchases = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};
    const purchases = await Purchase.find(filter).sort({ createdAt: -1 }).exec();
    res.status(200).json(purchases.map(p => p.toJSON()));
  } catch (error) {
    next(error);
  }
};

export const getPurchaseById = async (req, res, next) => {
  try {
    const purchase = await findByIdOrCustomId(Purchase, req.params.id);
    if (!purchase) {
      return res.status(404).json({ error: 'Compra não encontrada' });
    }
    res.status(200).json(purchase.toJSON());
  } catch (error) {
    next(error);
  }
};

export const createPurchase = async (req, res, next) => {
  try {
    const { userId, lessonId, amount, paymentMethod } = req.body;
    const finalUserId = userId || req.user?.id || 'usr-1';

    const result = await salesService.processPurchase({
      userId: finalUserId,
      lessonId,
      amount,
      paymentMethod
    });

    res.status(201).json(result.purchase);
  } catch (error) {
    next(error);
  }
};

export const updatePurchase = async (req, res, next) => {
  try {
    const updated = await updateByIdOrCustomId(Purchase, req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ error: 'Compra não encontrada' });
    }
    res.status(200).json(updated.toJSON());
  } catch (error) {
    next(error);
  }
};

export const deletePurchase = async (req, res, next) => {
  try {
    const deleted = await deleteByIdOrCustomId(Purchase, req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Compra não encontrada' });
    }
    res.status(200).json({ message: 'Compra cancelada/removida com sucesso', id: req.params.id });
  } catch (error) {
    next(error);
  }
};
