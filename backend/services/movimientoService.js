import Movimiento from '../models/movimientos.js';

// Crear un nuevo movimiento
export const crearMovimiento = async (data) => {
  const movimiento = new Movimiento(data);
  return await movimiento.save();
};

// Retornar el listado de movimientos
export const obtenerMovimientos = async (page = 1, limit = 5, sort = 'createdAt', order = 'asc', keyword = '') => {
  const skip = (page - 1) * limit;

  const filter = keyword
    ? {
        $or: [
          { tipo: { $regex: keyword, $options: 'i' } },     // keyword busca en el tipo (entrada, salida)
          { motivo: { $regex: keyword, $options: 'i' } }    // o en el motivo del movimiento
        ]
      }
    : {};
  
  const sortOption = { [sort]: order === 'desc' ? -1 : 1 };   // ordenar los campos, asc o desc

  const [movimientos, total] = await Promise.all([
    Movimiento.find(filter)
      .populate('productoId', 'nombre codigo')
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean(),
    Movimiento.countDocuments(filter)
  ]);

  return {
    movimientos,
    total,
    page,
    pages: Math.ceil(total / limit)
  };
};

// Retornar un movimiento por ID
export const obtenerMovimientoPorId = async (id) => {
  return await Movimiento.findById(id).populate('productoId', 'nombre codigo').lean();
};

// Actualizar un movimiento
export const actualizarMovimiento = async (id, data) => {
  return await Movimiento.findByIdAndUpdate(id, data, { 
    new: true,
    runValidators: true 
  });
};

// Eliminar un movimiento
export const eliminarMovimiento = async (id) => {
  return await Movimiento.findByIdAndDelete(id);
};

// obtener movimientos (fechaInicio, fechaFin)
// obtener movimientos (fechaInicio, fechaFin)
export const obtenerMovimientosPorFecha = async (startDate, endDate) => {

  const filter = {
    fecha: {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    }
  };

  const movimientos = await Movimiento.find(filter)
    .populate('productoId', 'nombre codigo')
    .sort({ fecha: 1 })
    .lean();

  return movimientos;
};
