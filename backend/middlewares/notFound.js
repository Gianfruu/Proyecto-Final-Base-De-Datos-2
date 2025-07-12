// Middleware Error 404
export function notFound(req, res, next) {

  // With this change, your server will quietly skip the favicon request, 
  // and your logs will stay clean.
  // Verifica si el navegador está solicitando un favicon
  if (req.originalUrl === '/favicon.ico') {
    // 204: No hay favicon, no hay error tampoco.
    return res.status(204).end(); 
  }

  const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
  error.statusCode = 404;
  // Le pasamos el error al administrador centralizado de errores
  next(error);
}