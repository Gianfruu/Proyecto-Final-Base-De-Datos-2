import express from 'express';
import path from 'path';

import { fileURLToPath } from 'url';
import methodOverride from 'method-override';

import productosRouter from './src/routes/productosRoutes.js';
import proveedoresRouter from './src/routes/proveedoresRoutes.js';
import movimientosRouter from './src/routes/movimientosRoutes.js';
import postmanRoutes from './src/routes/postmanRoutes.js';
import consignasRouter from './src/routes/consignasRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Configuración de vistas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Archivos estáticos (CSS, imágenes, etc)
app.use(express.static(path.join(__dirname, 'src/public')));

// Ruta principal
app.get('/', (req, res) => {
  res.render('index');                  // Renderiza frontend/views/index.ejs
});

// productos
app.use('/productos/', productosRouter);

// proveedores
app.use('/proveedores/', proveedoresRouter);

// movimientos
app.use('/movimientos',movimientosRouter);

// Página con detalle de las consignas solicitadas
app.use('/consignas', consignasRouter);

// Página postman
app.use('/postman', postmanRoutes);

// Manejar rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).render('404');        // Renderiza frontend/views/404.ejs
});

// Servidor
const PORT = process.env.FRONT_PORT || process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Frontend activo en http://localhost:${PORT}`);
});
