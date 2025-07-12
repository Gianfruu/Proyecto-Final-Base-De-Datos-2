import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  const ejemplos = {
    producto: {
      codigo: "PROD001",
      nombre: "Arroz Gallo",
      categoria: "No perecederos",
      precio: 799.95,
      stockActual: 15,
      stockMinimo: 2,
      proveedorId: "686874af18df466d5c5516d7"
    },
    proveedor: {
      nombre: "Distribuidora Food",
      contacto: "Daniel Ariel Ramirez",
      telefono: "+54 291 456-2882",
      email: "food_products@gmail.com",
      productosOfrecidos: ["PROD001", "PROD002"]
    },
    movimiento: {
      productoId: "686a6ce512e30b8c6aa203bd",
      tipo: "entrada",
      cantidad: 5,
      motivo: "Compra de saldos",
      usuario: "admin"
    }    
  };

  res.render('postman/postman', { ejemplos });
});

export default router;
