import Producto from '../models/productos.js';

// Productos con stock por debajo del minimo
export const productosStockBajo = async () => {
  return await Producto.find({
    $expr: { $lt: ['$stockActual', '$stockMinimo'] }
  }).lean();
};

// Crear un nuevo producto
export const agregarProducto = async (data) => {
    const producto = new Producto(data);
    return await producto.save();
};

// Retornar el listado de productos
export const obtenerProductos = async (page = 1, limit = 5, sort = 'nombre', order = 'asc', keyword = '') => {
  const skip = (page - 1) * limit;    // skip(n) le dice a mongodb n° resultados a evitar (y donde empezar)
 
  const filter = keyword
    ? {
        $or: [
          { nombre: { $regex: keyword, $options: 'i' } },     // busqueda en el campo nombre
          { codigo: { $regex: keyword, $options: 'i' } }      // o en codigo
        ]
      }
    : {};

  const sortOption = { [sort]: order === 'desc' ? -1 : 1 };   // ordenar los campos, asc o desc

  const [productos, total] = await Promise.all([    
    Producto.find(filter).sort(sortOption).skip(skip).limit(limit).lean(),
    Producto.countDocuments(filter)
  ]);

  return {
    productos,
    total,
    page,
    pages: Math.ceil(total / limit)
  };
};

// Retornar un producto por id
export const obtenerProductoPorId = async (id) => {
    return await Producto.findById(id)
    .populate('proveedorId', 'nombre') 
    .lean();
};

// Actualizar un producto
export const actualizarProducto = async (id, data) => {
    return await Producto.findByIdAndUpdate(id, data, { 
        new: true,
        runValidators: true 
    });
};

// Eliminar un producto
export const eliminarProducto = async (id) => {
    return await Producto.findByIdAndDelete(id);    
}

// Verificar que no se repitan valores de 'codigo'
export const existeProductoPorCodigo = async (codigo) => {
  return await Producto.findOne({ codigo: codigo.trim().toUpperCase() });
};


// Retornar el listado de productos
export const obtenerProductosfull = async (order = 'asc', sort = 'nombre') => { 
  const sortOption = { [sort]: order === 'desc' ? -1 : 1 }; 
  const productos = await Producto.find().sort(sortOption).lean();   
  return { productos };
};