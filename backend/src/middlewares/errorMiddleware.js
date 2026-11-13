export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    error: 'Não encontrado',
    message: `A rota '${req.method} ${req.originalUrl}' não foi encontrada na API do Fio a Fio.`
  });
};

export const errorHandler = (err, req, res, next) => {
  console.error('[Error Middleware]:', err);

  // Erro de validação Mongoose
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      error: 'Erro de validação',
      details: messages
    });
  }

  // Erro de chave duplicada (E11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'campo';
    return res.status(409).json({
      error: 'Registro duplicado',
      message: `Já existe um registro com o mesmo valor para '${field}'.`
    });
  }

  // CastError (ID com formato inválido)
  if (err.name === 'CastError') {
    return res.status(400).json({
      error: 'Parâmetro inválido',
      message: `Formato inválido para o campo '${err.path}'.`
    });
  }

  const statusCode = err.statusCode || res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    error: err.name || 'Erro interno do servidor',
    message: err.message || 'Ocorreu um erro inesperado ao processar a requisição.'
  });
};
