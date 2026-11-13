import { Material } from '../models/Material.js';
import { findByIdOrCustomId, updateByIdOrCustomId, deleteByIdOrCustomId, generateId } from '../utils/helpers.js';

export const getMaterials = async (req, res, next) => {
  try {
    const { category, type, q } = req.query;
    const filter = {};

    if (category && category !== 'Todas') {
      filter.category = category;
    }

    if (type) {
      filter.type = type;
    }

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }

    const materials = await Material.find(filter).sort({ createdAt: -1 }).exec();
    res.status(200).json(materials.map(m => m.toJSON()));
  } catch (error) {
    next(error);
  }
};

export const getMaterialById = async (req, res, next) => {
  try {
    const material = await findByIdOrCustomId(Material, req.params.id);
    if (!material) {
      return res.status(404).json({ error: 'Material não encontrado' });
    }
    res.status(200).json(material.toJSON());
  } catch (error) {
    next(error);
  }
};

export const createMaterial = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (!data.id) {
      data.id = generateId('mat');
    }
    const material = new Material(data);
    await material.save();
    res.status(201).json(material.toJSON());
  } catch (error) {
    next(error);
  }
};

export const updateMaterial = async (req, res, next) => {
  try {
    const updated = await updateByIdOrCustomId(Material, req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ error: 'Material não encontrado' });
    }
    res.status(200).json(updated.toJSON());
  } catch (error) {
    next(error);
  }
};

export const deleteMaterial = async (req, res, next) => {
  try {
    const deleted = await deleteByIdOrCustomId(Material, req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Material não encontrado' });
    }
    res.status(200).json({ message: 'Material removido com sucesso', id: req.params.id });
  } catch (error) {
    next(error);
  }
};
