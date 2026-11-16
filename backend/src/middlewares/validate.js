import { z } from 'zod';

/**
 * Middleware para validação de requisições Express com Zod.
 * @param {z.ZodSchema} schema - Esquema Zod para validação
 * @param {'body' | 'query' | 'params'} source - Propriedade da requisição (padrão: 'body')
 */
export const validate = (schema, source = 'body') => (req, res, next) => {
  try {
    const parsed = schema.parse(req[source]);
    req[source] = parsed;
    return next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Erro de validação',
        details: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
    }
    return next(error);
  }
};

export default validate;
