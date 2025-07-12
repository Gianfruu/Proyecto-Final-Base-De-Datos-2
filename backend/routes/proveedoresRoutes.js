import express from 'express';
import {
  crearProveedor,
  obtenerProveedores,
  obtenerProveedorPorId,
  actualizarProveedor,
  eliminarProveedor
} from '../controllers/proveedorController.js';

import { validateObjectId } from '../middlewares/validateObjectId.js';    // Validar el id

const router = express.Router();

router.get('/:id', validateObjectId, obtenerProveedorPorId);
router.put('/:id', validateObjectId, actualizarProveedor);
router.delete('/:id', validateObjectId, eliminarProveedor);
router.get('/', obtenerProveedores);
router.post('/', crearProveedor);

export default router;