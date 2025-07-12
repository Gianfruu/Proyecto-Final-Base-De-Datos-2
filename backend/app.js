import express from 'express';
import connectDB from './db/db.js';
import productoRoutes from './routes/productoRoutes.js';
import proveedorRoutes from './routes/proveedoresRoutes.js';
import movimientoRoutes from './routes/movimientoRoutes.js';
import apiInfoRoutes from './routes/apiInfoRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFound } from './middlewares/notFound.js';

// instancia del servidor
const app = express();

// built-in middleware
app.use(express.json());


// Rutas
app.use('/api/productos', productoRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/movimientos', movimientoRoutes);

// Ruta para la raiz
app.use('/', apiInfoRoutes);

// Middleware Error 404
app.use(notFound);


// Middleware para administración centralizada de errores
app.use(errorHandler);


// Conexión & Inicio del servidor
(async () => {
  try {    
    await connectDB();

    const PORT = process.env.BACK_PORT || process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor en http://localhost:${PORT}`);      
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
})();