import express from 'express';
import { renderMovimientosIndex,
        eliminarMovimiento,
        renderMovimientoDetalle,
        renderFormularioNuevoMovimiento,
        crearMovimiento,
        renderFormularioEditarMovimiento,
        actualizarMovimiento,
        renderReporteMovimientosPorFecha
} from '../controllers/movimientosController.js';

const router = express.Router();
/*      Rule of Thumb: Always declare routes from most specific → most general:

        /productos/nuevo → specific string
        /productos/:id/editar → dynamic + specific
        /productos/:id → catch-all dynamic → ALWAYS LAST        */

router.get('/reporte', renderReporteMovimientosPorFecha);   // Lo mas específico
router.get('/nuevo', renderFormularioNuevoMovimiento); 
router.get('/:id/editar', renderFormularioEditarMovimiento);            // mas específico que /:id, va antes de /:id
router.put('/:id', actualizarMovimiento);                               // lo mismo que el anterior
router.get('/', renderMovimientosIndex);                                // Root siempre antes de los parametros dinamicos
router.post('/', crearMovimiento);
router.delete('/:id', eliminarMovimiento);                              // dinámico
router.get('/:id', renderMovimientoDetalle);                            // GET dinamico siempre al final

export default router;