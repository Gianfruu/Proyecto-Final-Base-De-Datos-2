import express from 'express';
import { renderProveedoresIndex,
        renderFormularioEditarProveedor,
        actualizarProveedor,
        eliminarProveedor,
        renderProveedorDetalle
} from '../controllers/proveedoresController.js'; 

const router = express.Router();
/*      Rule of Thumb: Always declare routes from most specific → most general:

        /productos/nuevo → specific string
        /productos/:id/editar → dynamic + specific
        /productos/:id → catch-all dynamic → ALWAYS LAST        */

router.get('/:id/editar', renderFormularioEditarProveedor);       // mas específico que /:id, va antes de /:id
router.put('/:id', actualizarProveedor);                          // lo mismo que el anterior
router.get('/', renderProveedoresIndex);                          // Root siempre antes de los parametros dinamicos
router.delete('/:id', eliminarProveedor);                         // dinámico
router.get('/:id', renderProveedorDetalle);                       // GET dinamico siempre al final

export default router;