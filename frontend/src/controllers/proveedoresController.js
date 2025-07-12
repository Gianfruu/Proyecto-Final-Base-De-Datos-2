// Proveedores
import axios from 'axios';

// Producir el listado de todos los proveedores
export const renderProveedoresIndex = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = parseInt(req.query.limit) || 7;    
    const sort = req.query.sort || '';
    const order = req.query.order || 'asc';
    const keyword = req.query.keyword || '';
   
    const response = await axios.get(`http://localhost:3000/api/proveedores`, {params: { page, limit, sort, order, keyword }});
   
    const proveedores = response.data.data;
    const meta = response.data.meta;

    res.render('proveedores/index', { proveedores, meta, sort, order, keyword, limit }); 
  } catch (error) {
    console.error('Error al obtener proveedores:', error.message);
    res.status(500).send('Error al obtener proveedores');
  }
};


// Eliminar un proveedor
export const eliminarProveedor = async (req, res) => {
  try {
    const { page = 1, limit = 10, keyword = '', sort = '', order = '' } = req.query;

    await axios.delete(`http://localhost:3000/api/proveedores/${req.params.id}`);

    res.redirect(`/proveedores?page=${page}&limit=${limit}&keyword=${keyword}&sort=${sort}&order=${order}`);
  } catch (error) {
    console.error('Error al eliminar proveedor:', error.message);
    res.status(500).send('Error al eliminar el proveedor');
  }
};


// ver un proveedor por su id
export const renderProveedorDetalle = async (req, res) => {
  try {
    const { id } = req.params;

    // Capturar parametros de la consulta
    const { page = 1, limit = 7, keyword = '', sort = '', order = 'asc' } = req.query;

    const response = await axios.get(`http://localhost:3000/api/proveedores/${id}`);
    const proveedores = response.data;

    // Pasar los parametros a la vista
    res.render('proveedores/detalle', { proveedores, page, limit, keyword, sort, order });
  } catch (error) {
    console.error('Error al obtener el proveedor:', error.message);
    res.status(500).send('Proveedor no encontrado');
  }
};


// actualizar un proveedor
// formulario
export const renderFormularioEditarProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`http://localhost:3000/api/proveedores/${id}`);
    const proveedor = response.data;

    res.render('proveedores/editar', { proveedor });
  } catch (error) {
    console.error('Error al cargar el proveedor:', error.message);
    res.status(500).send('Error al cargar el formulario de edición');
  }
};
// post a la api para actualizar el proveedor
export const actualizarProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    await axios.put(`http://localhost:3000/api/proveedores/${id}`, req.body);
    res.redirect('/proveedores');
  } catch (error) {
    console.error('Error al actualizar el proveedor:', error.message);
    res.status(500).send('Error al actualizar el proveedor');
  }
};