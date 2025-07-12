import axios from 'axios';

// Producir el listado de todos los movimientos
export const renderMovimientosIndex = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = parseInt(req.query.limit) || 7;    
    const sort = req.query.sort || '';
    const order = req.query.order || 'asc';
    const keyword = req.query.keyword || '';
   
    const response = await axios.get(`http://localhost:3000/api/movimientos`, {params: { page, limit, sort, order, keyword }});
   
    const movimientos = response.data.data;
    const meta = response.data.meta;

    res.render('movimientos/index', { movimientos, meta, sort, order, keyword, limit }); 
  } catch (error) {
    console.error('Error al obtener movimientos:', error.message);
    res.status(500).send('Error al obtener movimientos');
  }
};


// Eliminar un movimiento
export const eliminarMovimiento = async (req, res) => {
  try {
    const { page = 1, limit = 10, keyword = '', sort = '', order = '' } = req.query;

    await axios.delete(`http://localhost:3000/api/movimientos/${req.params.id}`);

    res.redirect(`/movimientos?page=${page}&limit=${limit}&keyword=${keyword}&sort=${sort}&order=${order}`);
  } catch (error) {
    console.error('Error al eliminar movimiento:', error.message);
    res.status(500).send('Error al eliminar el movimiento');
  }
};

// ver un movimiento por su id
export const renderMovimientoDetalle = async (req, res) => {
  try {
    const { id } = req.params;

    // Capturar parametros de la consulta
    const { page = 1, limit = 7, keyword = '', sort = '', order = 'asc' } = req.query;

    const response = await axios.get(`http://localhost:3000/api/movimientos/${id}`);
    const movimiento = response.data;

    // Pasar los parametros a la vista
    res.render('movimientos/detalle', { movimiento, page, limit, keyword, sort, order });
  } catch (error) {
    console.error('Error al obtener el movimiento:', error.message);
    res.status(500).send('Movimiento no encontrado');
  }
};

// Cargar un nuevo movimiento usando el navegador web
// Formulario
export const renderFormularioNuevoMovimiento = async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3000/api/productos/full');
    const productos = response.data.data;    
    res.render('movimientos/nuevo', { productos, error: null });
  } catch (error) {
    console.error('Error al cargar formulario:', error.message);
    res.status(500).send('Error al cargar formulario');
  }
};
// post a la api para crear el producto

export const crearMovimiento = async (req, res) => {
  try {
    const nuevoProducto = req.body;
    await axios.post('http://localhost:3000/api/movimientos', nuevoProducto);    
    res.redirect('/movimientos');
  } catch (error) {
    let errorMsg = 'Error al crear movimiento';
    
    if (error.response && error.response.status === 400) {
      errorMsg = error.response.data.message || 'Error al crear el movimiento';
    }

    // Fetch productos nuevamente, para el formulario
    const response = await axios.get('http://localhost:3000/api/productos/full');
    const productos = response.data.data;

    res.status(400).render('productos/nuevo', { productos, error: errorMsg });
  }
};


// actualizar un movimiento
// formulario
export const renderFormularioEditarMovimiento = async (req, res) => {
  try {
    const { id } = req.params;

    const [movimientoRes, productosRes] = await Promise.all([
      axios.get(`http://localhost:3000/api/movimientos/${id}`),
      axios.get('http://localhost:3000/api/productos/full') 
    ]);

    const movimiento = movimientoRes.data;
    const productos = productosRes.data.data;

    res.render('movimientos/editar', { movimiento, productos });
  } catch (error) {
    console.error('Error al cargar el movimiento:', error.message);
    res.status(500).send('Error al cargar el formulario de edición');
  }
};
// post a la api para actualizar el producto
export const actualizarMovimiento = async (req, res) => {
  try {
    const { id } = req.params;
    await axios.put(`http://localhost:3000/api/movimientos/${id}`, req.body);
    res.redirect('/movimientos');
  } catch (error) {
    console.error('Error al actualizar el movimiento:', error.message);
    res.status(500).send('Error al actualizar el movimiento');
  }
};


// Reporte de movimientos por fecha (fechaInicio, fechaFin)
export const renderReporteMovimientosPorFecha = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.render('movimientos/reporte', {
        movimientos: [],
        startDate,
        endDate,
        error: 'Debe ingresar ambas fechas para generar el reporte.'
      });
    }

    const response = await axios.get('http://localhost:3000/api/movimientos/reporte', {
      params: { startDate, endDate }
    });

    const movimientos = response.data.data;

    res.render('movimientos/reporte', {
      movimientos,
      startDate,
      endDate,
      error: null
    });

  } catch (error) {
    console.error('Error al generar reporte:', error.message);
    res.status(500).render('movimientos/reporte', {
      movimientos: [],
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      error: 'Error al generar el reporte'
    });
  }
};

