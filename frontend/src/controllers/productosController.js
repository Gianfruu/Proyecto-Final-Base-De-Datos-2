import axios from 'axios';

// Producir el listado de todos los productos
export const renderProductosIndex = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = parseInt(req.query.limit) || 7;    
    const sort = req.query.sort || '';
    const order = req.query.order || 'asc';
    const keyword = req.query.keyword || '';
   
    const response = await axios.get(`http://localhost:3000/api/productos`, {params: { page, limit, sort, order, keyword }});
   
    const productos = response.data.data;
    const meta = response.data.meta;

    res.render('productos/index', { productos, meta, sort, order, keyword, limit }); 
  } catch (error) {
    console.error('Error al obtener productos:', error.message);
    res.status(500).send('Error al obtener productos');
  }
};


// Productos con stock bajo
export const renderProductosConStockBajo = async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3000/api/productos/stock-bajo');
    const productos = response.data.data;
    res.render('productos/stockBajo', { productos });
  } catch (error) {
    console.error('Error al obtener productos con bajo stock:', error.message);
    res.status(500).send('Error al obtener productos con bajo stock');
  }
};


// Eliminar un producto
export const eliminarProducto = async (req, res) => {
  try {
    const { page = 1, limit = 10, keyword = '', sort = '', order = '' } = req.query;

    await axios.delete(`http://localhost:3000/api/productos/${req.params.id}`);

    res.redirect(`/productos?page=${page}&limit=${limit}&keyword=${keyword}&sort=${sort}&order=${order}`);
  } catch (error) {
    console.error('Error al eliminar producto:', error.message);
    res.status(500).send('Error al eliminar el producto');
  }
};


// Cargar un nuevo producto usando el navegador web
// Formulario
export const renderFormularioNuevoProducto = async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3000/api/proveedores');
    const proveedores = response.data.data;    
    res.render('productos/nuevo', { proveedores, error: null });
  } catch (error) {
    console.error('Error al cargar formulario:', error.message);
    res.status(500).send('Error al cargar formulario');
  }
};
// post a la api para crear el producto
export const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = req.body;
    await axios.post('http://localhost:3000/api/productos', nuevoProducto);    
    res.redirect('/productos');
  } catch (error) {
    let errorMsg = 'Error al crear producto';
    
    if (error.response && error.response.status === 400) {
      errorMsg = error.response.data.message || 'Código duplicado.';
    }

    // Fetch proveedores again for the form
    const response = await axios.get('http://localhost:3000/api/proveedores');
    const proveedores = response.data.data;

    res.status(400).render('productos/nuevo', { proveedores, error: errorMsg });
  }
};



// ver un producto por su id
export const renderProductoDetalle = async (req, res) => {
  try {
    const { id } = req.params;

    // Capturar parametros de la consulta
    const { page = 1, limit = 7, keyword = '', sort = '', order = 'asc' } = req.query;

    const response = await axios.get(`http://localhost:3000/api/productos/${id}`);
    const producto = response.data;

    // Pasar los parametros a la vista
    res.render('productos/detalle', { producto, page, limit, keyword, sort, order });
  } catch (error) {
    console.error('Error al obtener el producto:', error.message);
    res.status(500).send('Producto no encontrado');
  }
};


// actualizar un producto
// formulario
export const renderFormularioEditarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`http://localhost:3000/api/productos/${id}`);
    const producto = response.data;

    res.render('productos/editar', { producto });
  } catch (error) {
    console.error('Error al cargar el producto:', error.message);
    res.status(500).send('Error al cargar el formulario de edición');
  }
};
// post a la api para actualizar el producto
export const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    await axios.put(`http://localhost:3000/api/productos/${id}`, req.body);
    res.redirect('/productos');
  } catch (error) {
    console.error('Error al actualizar el producto:', error.message);
    res.status(500).send('Error al actualizar el producto');
  }
};