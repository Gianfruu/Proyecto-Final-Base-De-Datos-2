import express from 'express';
import { renderProductosIndex, 
    eliminarProducto, 
    renderProductosConStockBajo,
    crearProducto,
    renderFormularioNuevoProducto,
    renderProductoDetalle,
    renderFormularioEditarProducto,
    actualizarProducto
} from '../controllers/productosController.js';

const router = express.Router();
/*      Rule of Thumb: Always declare routes from most specific → most general:

        /productos/nuevo → specific string
        /productos/:id/editar → dynamic + specific
        /productos/:id → catch-all dynamic → ALWAYS LAST        */

router.get('/nuevo', renderFormularioNuevoProducto);            // Lo mas específico
router.get('/stock-bajo', renderProductosConStockBajo);
router.get('/:id/editar', renderFormularioEditarProducto);      // mas específico que /:id, va antes de /:id
router.put('/:id', actualizarProducto);                         // lo mismo que el anterior
router.get('/', renderProductosIndex);                          // Root siempre antes de los parametros dinamicos
router.post('/', crearProducto);
router.delete('/:id', eliminarProducto);                        // dinámico
router.get('/:id', renderProductoDetalle);                      // GET dinamico siempre al final


export default router;