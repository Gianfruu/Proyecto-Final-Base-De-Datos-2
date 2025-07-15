export function errorHandler(err, req, res, next) {
  // Log only if not in production
  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }

  // Mongoose: Error de Validación 
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: Object.values(err.errors).map(e => e.message).join(', ')
    });
  }

  // Mongoose: CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: `ID inválido: ${err.value}`
    });
  }

  // Mongoose: Duplicate Key (unique index violation)
  if (err.code === 11000) {
    const campo = Object.keys(err.keyValue).join(', ');
    return res.status(400).json({
      success: false,
      error: `Ya existe un registro con ese valor en el campo: ${campo}`
    });
  }

  // Default fallback error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';

  return res.status(statusCode).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
}