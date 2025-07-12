import express from 'express';
import {
    agregarProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto,
    productosStockBajo,
    verificarCodigoExistente,
    obtenerProductosfull
} from '../controllers/productoController.js';

import { validateObjectId } from '../middlewares/validateObjectId.js';      // Validar el id
import { sanitizeBody } from '../middlewares/validateBody.js';              // Validar el body

const router = express.Router();

// a fin de evitar que el put o el post, incluyan campos no deseados
const camposPermitidos = ['codigo','nombre', 'categoria', 'precio', 'stockActual', 'stockMinimo', 'proveedorId'];

router.get('/stock-bajo', productosStockBajo);
router.get('/full', obtenerProductosfull);
router.get('/codigo/:codigo', verificarCodigoExistente);
router.get('/:id', validateObjectId, obtenerProductoPorId);
router.put('/:id', validateObjectId, sanitizeBody(camposPermitidos), actualizarProducto);
router.delete('/:id', validateObjectId, eliminarProducto);
router.get('/', obtenerProductos);
router.post('/', sanitizeBody(camposPermitidos), agregarProducto);


export default router;