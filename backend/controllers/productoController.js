import * as productoService from '../services/productoService.js';
import { createError } from '../utils/createError.js';

// Productos con stock por debajo del minimo
export const productosStockBajo = async (req, res, next) => {
  try {
    const productos = await productoService.productosStockBajo();
    res.status(200).json({
      success: true,
      data: productos
    });
  } catch (error) {
    next(createError(500, `Error al obtener productos con bajo stock. ${error.message}`));
  }
};

// Crear un nuevo producto
export const agregarProducto = async (req, res, next) => {
  try {  
    const nuevoProducto = await productoService.agregarProducto(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(createError(400, error.message));
    }

    // Error para duplicados en "codigo"
    if (error.code === 11000 && error.keyPattern?.codigo) {
      return next(createError(400, 'Ya existe un producto con ese código.'));
    }
    
    return next(createError(500, `Error al crear el producto. ${error.message}`));
  }
};

// Obtener la lista de todos los productos
export const obtenerProductos = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const sort = req.query.sort || 'nombre';      // ej.: ?sort=precio
    const order = req.query.order || 'asc';       // ej,: order=desc 
    const keyword = req.query.keyword || '';      // ej.: ?keyword=harina

    const { productos, total, pages } = await productoService.obtenerProductos(page, limit, sort, order, keyword);

    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`; 

    res.status(200).json({
      success: true,
      data: productos,
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
    return next(createError(500, `Error al obtener el listado de productos. ${error.message}`));
  }
};


// Obtener un producto por su ID
export const obtenerProductoPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const producto = await productoService.obtenerProductoPorId(id);
    if (!producto) {      
      return next(createError(404, 'Producto no encontrado'));
    }
    res.status(200).json(producto);
  } catch (error) {
    return next(createError(500, `Error al obtener el producto. ${error.message}`));
  }
};

// Actualizar un producto
export const actualizarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productoActualizado = await productoService.actualizarProducto(id, req.body);
    if (!productoActualizado) {
      return next(createError(404, 'Producto no encontrado'));
    }
    res.status(200).json(productoActualizado);
  } catch (error) {
    return next(createError(500, `Error al actualizar el producto. ${error.message}`));
  }
};

// Eliminar un producto
export const eliminarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productoEliminado = await productoService.eliminarProducto(id);
    if (!productoEliminado) {
      return next(createError(404, 'Producto no encontrado'));
    }
    res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    return next(createError(500, `Error al eliminar el producto. ${error.message}`));
  }
};


// Verificar que no se repitan valores de 'codigo'
//import createError from 'http-errors';

export const verificarCodigoExistente = async (req, res, next) => {
  try {
    const codigo = req.params.codigo;
    const producto = await productoService.existeProductoPorCodigo(codigo);
    
    if (!producto) {
      return res.sendStatus(404); // Código disponible
    }

    res.status(200).json(producto); // Código en uso
  } catch (error) {
    next(createError(500, `Error al verificar el código: ${error.message}`));
  }
};


// Obtener la lista de todos los productos sin limite
export const obtenerProductosfull = async (req, res, next) => {
  try {
    const sort = req.query.sort || 'nombre';
    const order = req.query.order || 'asc';
    const { productos } = await productoService.obtenerProductosfull(order, sort);
    res.status(200).json({
      data: productos      
    });
  } catch (error) {
    return next(createError(500, `Error al obtener el listado de productos. ${error.message}`));
  }
};
