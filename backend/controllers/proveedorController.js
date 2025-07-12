import * as proveedorService from '../services/proveedorService.js';
import { createError } from '../utils/createError.js';

// Crear un nuevo proveedor
export const crearProveedor = async (req, res, next) => {
  try {
    const nuevoProveedor = await proveedorService.crearProveedor(req.body);
    res.status(201).json(nuevoProveedor);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(createError(400, error.message));
    }
    return next(createError(500, `Error al crear el proveedor. ${error.message}`));
  }
};

// Obtener la lista de todos los proveedores
export const obtenerProveedores = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const sort = req.query.sort || 'nombre';        // ej.: ?sort=contacto
    const keyword = req.query.keyword || '';        // ek.: ?keyword=mayorista

    const { proveedores, total, pages } = await proveedorService.obtenerProveedores(page, limit, sort, keyword);

    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;    

    res.status(200).json({
      success: true,
      data: proveedores,
      meta: {
        total,
        page,
        pages,
        prevPage: page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null,       // ternario para asignar valor a prevPage
        nextPage: page < pages ? `${baseUrl}?page=${page + 1}&limit=${limit}` : null,   // ternario para asignar valor a nextPage
        hasPrev: page > 1,                          // bool. Asi el front sabe si usar el botón "PREVIO" 
        hasNext: page < pages                       // bool. Asi el front sabe si usar el botón "NEXT"
      }
    });
  } catch (error) {
    return next(createError(500, `Error al obtener la lista de proveedores. ${error.message}`));
  }
};

// Obtener un proveedor por su ID
export const obtenerProveedorPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const proveedor = await proveedorService.obtenerProveedorPorId(id);
    if (!proveedor) {
      return next(createError(404, 'Proveedor no encontrado'));
    }
    res.status(200).json(proveedor);
  } catch (error) {
    return next(createError(500, `Error al obtener el proveedor. ${error.message}`));
  }
};

// Actualizar un proveedor
export const actualizarProveedor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const proveedorActualizado = await proveedorService.actualizarProveedor(id, req.body);
    if (!proveedorActualizado) {
      return next(createError(404, 'Proveedor no encontrado'));
    }
    res.status(200).json(proveedorActualizado);
  } catch (error) {
    return next(createError(500, `Error al actualizar el proveedor. ${error.message}`));
  }
};

// Eliminar un proveedor
export const eliminarProveedor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const proveedorEliminado = await proveedorService.eliminarProveedor(id);
    if (!proveedorEliminado) {
      return next(createError(404, 'Proveedor no encontrado'));
    }
    res.status(200).json({ mensaje: 'Proveedor eliminado correctamente' });
  } catch (error) {
    return next(createError(500, `Error al eliminar el proveedor. ${error.message}`));
  }
};