import * as movimientoService from '../services/movimientoService.js';
import { createError } from '../utils/createError.js';

// Crear un nuevo movimiento
export const crearMovimiento = async (req, res, next) => {
  try {
    const nuevoMovimiento = await movimientoService.crearMovimiento(req.body);
    res.status(201).json(nuevoMovimiento);
  } catch (error) {   
    if (error.name === 'ValidationError') {
      return next(createError(400, error.message));
    }
    return next(createError(500, `Error al crear el movimiento: ${error.message}`));
  }
};

// Obtener la lista de todos los movimientos
export const obtenerMovimientos = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const sort = req.query.sort || 'createdAt';        // orden por defecto: createdAt
    const order = req.query.order || 'asc';            // ej,: order=desc 
    const keyword = req.query.keyword || '';           // ej.: ?keyword=entrada

    const { movimientos, total, pages } = await movimientoService.obtenerMovimientos(page, limit, sort, order, keyword);

    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;

    res.status(200).json({
      success: true,
      data: movimientos,
      meta: {
        total,
        page,
        pages,
        prevPage: page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null,       // ternario para asignar valor a prevPage
        nextPage: page < pages ? `${baseUrl}?page=${page + 1}&limit=${limit}` : null,   // ternario para asignar valor a nextPage
        hasPrev: page > 1,                        // bool. Asi el front sabe si usar el botón "PREVIO" 
        hasNext: page < pages                     // bool. Asi el front sabe si usar el botón "NEXT"
      }
    });
  } catch (error) {
    return next(createError(500, `Error al obtener movimientos: ${error.message}`));
  }
};

// Obtener un movimiento por su Id
export const obtenerMovimientoPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movimiento = await movimientoService.obtenerMovimientoPorId(id);
    if (!movimiento) {
      return next(createError(404, 'Movimiento no encontrado'));
    }
    res.status(200).json(movimiento);
  } catch (error) {
    return next(createError(500, `Error al obtener el movimiento. ${error.message}`));
  }
};

// Actualizar un movimiento
export const actualizarMovimiento = async (req, res, next) => {
  try {
    const { id } = req.params;    
    const movimientoActualizado = await movimientoService.actualizarMovimiento(id, req.body);
    if (!movimientoActualizado) {
      return next(createError(404, 'Movimiento no encontrado'));
    }
    res.status(200).json(movimientoActualizado);
  } catch (error) {
    return next(createError(500, `Error al actualizar el movimiento. ${error.message}`));
  }
};

// Eliminar un movimiento
export const eliminarMovimiento = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movimientoEliminado = await movimientoService.eliminarMovimiento(id);
    if (!movimientoEliminado) {
      return next(createError(404, 'Movimiento no encontrado'));
    }
    res.status(200).json({ mensaje: 'Movimiento eliminado correctamente' });
  } catch (error) {
    return next(createError(500, `Error al eliminar el movimiento. Verifique el Id. ${error.message}`));
  }
};


export const generarReporteMovimientos = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Debe proporcionar startDate y endDate.' });
    }

    const movimientos = await movimientoService.obtenerMovimientosPorFecha(startDate, endDate);

    res.status(200).json({
      success: true,
      data: movimientos
    });
  } catch (error) {
    return next(createError(500, `Error al generar el reporte: ${error.message}`));
  }
};