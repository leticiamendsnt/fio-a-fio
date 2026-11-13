import { Sale } from '../models/Sale.js';
import { salesService } from '../services/salesService.js';
import { generateId } from '../utils/helpers.js';

export const getSales = async (req, res, next) => {
  try {
    const { creatorId } = req.query;
    const filter = creatorId ? { creatorId } : {};
    const sales = await Sale.find(filter).sort({ createdAt: -1 }).exec();
    res.status(200).json(sales.map(s => s.toJSON()));
  } catch (error) {
    next(error);
  }
};

export const getSalesSummary = async (req, res, next) => {
  try {
    const { creatorId } = req.query;
    const report = await salesService.getSalesReport(creatorId);
    res.status(200).json({
      totalGrossSales: report.totalGrossSales,
      creatorNetShare: report.creatorNetShare,
      platformShare: report.platformShare,
      totalStudents: report.totalStudents,
      activeCourses: report.activeCourses
    });
  } catch (error) {
    next(error);
  }
};

export const getSalesReport = async (req, res, next) => {
  try {
    const { creatorId } = req.query;
    const report = await salesService.getSalesReport(creatorId);
    res.status(200).json(report);
  } catch (error) {
    next(error);
  }
};

export const createSale = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (!data.id) {
      data.id = generateId('sale');
    }
    const sale = new Sale(data);
    await sale.save();
    res.status(201).json(sale.toJSON());
  } catch (error) {
    next(error);
  }
};
