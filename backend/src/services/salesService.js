import { Purchase } from '../models/Purchase.js';
import { Sale } from '../models/Sale.js';
import { VideoLesson } from '../models/VideoLesson.js';
import { User } from '../models/User.js';
import { generateId, calculateRevenueSplit, findByIdOrCustomId } from '../utils/helpers.js';

export const salesService = {
  /**
   * Registra uma nova compra e automaticamente cria o registro de venda com divisão 85%/15%.
   */
  async processPurchase({ userId, lessonId, amount, paymentMethod }) {
    const lesson = await findByIdOrCustomId(VideoLesson, lessonId);
    if (!lesson) {
      const error = new Error('Vídeo-aula não encontrada.');
      error.statusCode = 404;
      throw error;
    }

    const buyer = await findByIdOrCustomId(User, userId);
    const buyerName = buyer ? buyer.name : 'Aluno Fio a Fio';

    const finalAmount = Number(amount || lesson.price);
    const split = calculateRevenueSplit(finalAmount);

    const purchaseId = generateId('pur');
    const newPurchase = new Purchase({
      id: purchaseId,
      userId: userId || 'usr-1',
      lessonId: lesson.id,
      date: new Date().toLocaleDateString('pt-BR'),
      status: 'Concluído',
      amount: finalAmount,
      paymentMethod: paymentMethod || 'PIX',
      lessonProgressPercent: 0
    });

    await newPurchase.save();

    // Cria registro de venda correspondente para o professor
    const saleId = generateId('sale');
    const newSale = new Sale({
      id: saleId,
      purchaseId: purchaseId,
      lessonId: lesson.id,
      creatorId: lesson.creatorId,
      buyerId: userId || 'usr-1',
      courseTitle: lesson.title,
      buyerName: buyerName,
      date: new Date().toLocaleDateString('pt-BR'),
      grossAmount: split.grossAmount,
      netAmount: split.netAmount,
      platformAmount: split.platformAmount,
      status: 'Aprovado'
    });

    await newSale.save();

    // Atualiza contagem de alunos da aula
    await VideoLesson.updateOne({ id: lesson.id }, { $inc: { studentsCount: 1 } });

    return {
      purchase: newPurchase.toJSON(),
      sale: newSale.toJSON()
    };
  },

  /**
   * Gera o relatório financeiro consolidado (85% criador / 15% plataforma)
   */
  async getSalesReport(creatorId) {
    const filter = creatorId ? { creatorId } : {};
    const sales = await Sale.find(filter).sort({ createdAt: -1 }).exec();

    let totalGrossSales = 0;
    let creatorNetShare = 0;
    let platformShare = 0;
    const uniqueStudents = new Set();

    for (const s of sales) {
      totalGrossSales += Number(s.grossAmount) || 0;
      creatorNetShare += Number(s.netAmount) || 0;
      platformShare += Number(s.platformAmount) || 0;
      if (s.buyerId) uniqueStudents.add(s.buyerId);
    }

    const courseFilter = creatorId ? { creatorId } : {};
    const activeCourses = await VideoLesson.countDocuments(courseFilter);

    return {
      totalGrossSales: Number(totalGrossSales.toFixed(2)),
      creatorNetShare: Number(creatorNetShare.toFixed(2)),
      platformShare: Number(platformShare.toFixed(2)),
      totalStudents: uniqueStudents.size,
      activeCourses,
      recentSales: sales.map(s => s.toJSON())
    };
  }
};
