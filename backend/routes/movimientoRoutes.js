import express from 'express';
import {
  crearMovimiento,
  obtenerMovimientos,
  obtenerMovimientoPorId,
  actualizarMovimiento,
  eliminarMovimiento,
  generarReporteMovimientos
} from '../controllers/movimientoController.js';

import { validateObjectId } from '../middlewares/validateObjectId.js'; // Validar el id

const router = express.Router();

router.get('/reporte', generarReporteMovimientos);
router.get('/:id', validateObjectId, obtenerMovimientoPorId);
router.put('/:id', validateObjectId, actualizarMovimiento);
router.delete('/:id', validateObjectId, eliminarMovimiento);
router.get('/', obtenerMovimientos);
router.post('/', crearMovimiento);


export default router;
