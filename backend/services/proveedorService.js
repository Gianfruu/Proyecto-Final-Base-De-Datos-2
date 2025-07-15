import Proveedor from '../models/proveedores.js';


// crear un nuevo proveedor
export const crearProveedor = async (data) => {
    const proveedor = new Proveedor(data);
    return await proveedor.save();
};

// Retornar el listado de proveedores
export const obtenerProveedores = async (page = 1, limit = 5, sort = 'nombre', keyword = '') => {
  const skip = (page - 1) * limit;  // skip(n) le dice a mongodb n° resultados a evitar (y donde empezar)

  const filter = keyword
    ? {
        $or: [
          { nombre: { $regex: keyword, $options: 'i' } },     // keyword busca en el nombre comercial
          { contacto: { $regex: keyword, $options: 'i' } }    // o en contacto
        ]
      }
    : {};

  const [proveedores, total] = await Promise.all([
    Proveedor.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    Proveedor.countDocuments(filter)
  ]);

  return {
    proveedores,
    total,
    page,
    pages: Math.ceil(total / limit)
  };
};

// Retornar un proveedor por id
export const obtenerProveedorPorId = async (id) => {
    return await Proveedor.findById(id).lean();
};

// Actualizar un proveedor
export const actualizarProveedor = async (id, data) => {
    return await Proveedor.findByIdAndUpdate(id, data, { 
        new: true,
        runValidators: true 
    });
};

// Eliminar un proveedor
export const eliminarProveedor = async (id) => {
    return await Proveedor.findByIdAndDelete(id);
};