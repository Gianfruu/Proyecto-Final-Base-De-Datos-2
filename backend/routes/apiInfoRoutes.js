import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'La API está funcionando',
    
    variables_GET: '&page=1, &limit=2, &sort=-campo, &order=asc/desc, &keyword=(busca en codigo, nombre, contacto, tipo, motivo)',
   
    crud: 'GET, GET:id, POST:id, PUT:id, DELETE:id',
    endpoints: {
      productos: {
        acceso: 'http://localhost:3000/api/productos',
        descripcion: 'Listados y gestión de productos disponibles en la tienda.',
        ejemplo: 'http://localhost:3000/api/productos?page=1&limit=15&sort=-nombre&keyword=arroz'        
      },
      proveedores: {
        acceso: 'http://localhost:3000/api/proveedores',
        descripcion: 'Listados y gestión de proveedores de la tienda.',
        ejemplo: 'http://localhost:3000/api/proveedores?keyword=lorena'
      },
      movimientos: {
        acceso: 'http://localhost:3000/api/movimientos',
        descripcion: 'Listados y gestión de movimientos de productos.',
        ejemplo: 'http://localhost:3000/api/productos?page=1&limit=15&sort=categoria&keyword=corona'
      }
    },
    funciones_requeridas:{
      agregar_producto: 'POSTMAN POST http://localhost:3000/api/productos/',
      registrar_movimiento: '',
      consultar_stock: 'http://localhost:3000/api/productos/:id',
      stock_bajo: 'http://localhost:3000/api/productos/stock-bajo',
      reporte_de_movimiento: ''
    },
    colecciones:{
      productos: 'codigo, nombre, categoria, precio, stockActual, stockMinimo, proveedorId',
      proveedores: 'nombre, contacto, telefono, email, productosOfrecidos',
      movimientos: 'productoId, tipo, cantidad, motivo, usuario'
    }
  });
});

export default router;
