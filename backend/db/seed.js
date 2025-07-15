import mongoose from "mongoose";
import Producto from '../models/productos.js';
import Proveedor from '../models/proveedores.js';
import Movimiento from '../models/movimientos.js';
import connectDB from '../db/db.js';

await connectDB();

try {       
    const existingProductos = await Producto.countDocuments();
    const existingProveedores = await Proveedor.countDocuments();
    const existingMovimientos = await Movimiento.countDocuments();

    if (existingProductos || existingProveedores || existingMovimientos) {
        console.log('Ya existen datos en la base. Abortando el seed.');
        process.exit(0);
    }

    // insertar proveedores. Va primero para formar su id
    const proveedores = await Proveedor.insertMany([
        {
            nombre: "Distribuidora Food",
            contacto: "Daniel Ariel Ramirez",
            telefono: "+54 291 456-2882",
            email: "food_products@gmail.com",
            productosOfrecidos: ["PROD001", "PROD002", "PROD003", "PROD004", "PROD005"]
        },
        {
            nombre: "Mayorista Argentino",
            contacto: "Javier Jhonathan Quemehuencho",
            telefono: "+54 2932 575-552",
            email: "pachamama@gmail.com",
            productosOfrecidos: ["PROD006", "PROD007", "PROD008", "PROD009", "PROD010", "PROD011"]
        },
        {
            nombre: "Jumbo Alimentos S.A.",
            contacto: "Lorena Sanabria",
            telefono: "+54 291 455-1587",
            email: "jumbo.jazmin@tutamail.com",
            productosOfrecidos: ["PROD071","PROD072","PROD073"]
        },
        {
            nombre: "Atlántico Shop",
            contacto: "Augusto Roa Bastos",
            telefono: "+54 291 453-6598",
            email: "atlantico@hotmail.com",
            productosOfrecidos: ["PROD061", "PROD062", "PROD063", "PROD064", "PROD065"]
        },
        {
            nombre: "Costco Sudamerica",
            contacto: "John Richard Trump",
            telefono: "+54 11 1412-1111",
            email: "food_products@lamyplace.com",
            productosOfrecidos: ["PROD040", "PROD041", "PROD042", "PROD043"]
        },
        {
            nombre: "Hipermaxi",
            contacto: "Cecilio Guzmán de Rojas",
            telefono: "+54 11 7547-2895",
            email: "hipermaxi@yahoo.com.ar",
            productosOfrecidos: ["PROD051", "PROD052", "PROD053", "PROD054", "PROD055", "PROD056"]
        }
        
    ]);
    console.log('Se insertaron datos en Proveedores.');

    // insertar productos. El id del proveedor es formado dinámicamente
    const productos = await Producto.insertMany([
        {
            codigo: "PROD001",
            nombre: "Arroz Gallo 500Gr",
            categoria: "No perecederos",
            precio: 969.99,
            stockActual: 95,
            stockMinimo: 2,
            proveedorId: proveedores[0]._id
        },
        {
            codigo: "PROD002",
            nombre: "Arroz largo fino Dos Hermanos 5Kg",
            categoria: "No perecederos",
            precio: 5499.99,
            stockActual: 55,
            stockMinimo: 3,
            proveedorId: proveedores[0]._id
        },
        {
            codigo: "PROD003",
            nombre: "Aceite Aro 5Lt",
            categoria: "Aceites",
            precio: 11099.99,
            stockActual: 40,
            stockMinimo: 2,
            proveedorId: proveedores[0]._id
        },
        {
            codigo: "PROD004",
            nombre: "Cacao Nesquik 2Kg",
            categoria: "No perecederos",
            precio: 12614.99,
            stockActual: 15,
            stockMinimo: 2,
            proveedorId: proveedores[0]._id
        },
        {
            codigo: "PROD005",
            nombre: "Café El Monaguillo granos 1Kg",
            categoria: "Café",
            precio: 29999.99,
            stockActual: 25,
            stockMinimo: 3,
            proveedorId: proveedores[0]._id
        },
        {
            codigo: "PROD006",
            nombre: "Aceite Cocinero Girasol 1,5Lt",
            categoria: "Aceites",
            precio: 3199.99,
            stockActual: 8,
            stockMinimo: 2,
            proveedorId: proveedores[1]._id
        },
        {
            codigo: "PROD007",
            nombre: "Arlistan 100Gr",
            categoria: "Café",
            precio: 3189.99,
            stockActual: 17,
            stockMinimo: 2,
            proveedorId: proveedores[1]._id
        },
        {
            codigo: "PROD008",
            nombre: "Yerba Mate Chamigo 1Kg",
            categoria: "Yerba",
            precio: 1149.99,
            stockActual: 28,
            stockMinimo: 2,
            proveedorId: proveedores[1]._id
        },
        {
            codigo: "PROD009",
            nombre: "Yerba Mate Pipore 500Gr",
            categoria: "Yerba",
            precio: 1249.99,
            stockActual: 38,
            stockMinimo: 6,
            proveedorId: proveedores[1]._id
        },
        {
            codigo: "PROD010",
            nombre: "Arveja M&k Lata 300Gr",
            categoria: "Enlatados",
            precio: 449.99,
            stockActual: 95,
            stockMinimo: 12,
            proveedorId: proveedores[1]._id
        },
        {
            codigo: "PROD011",
            nombre: "Lenteja M&k Lata 350Gr",
            categoria: "Enlatados",
            precio: 509.99,
            stockActual: 81,
            stockMinimo: 12,
            proveedorId: proveedores[1]._id
        },
        {
            codigo: "PROD061",
            nombre: "Vino Alma Mora Malbec 750Ml",
            categoria: "Vinos",
            precio: 4999.99,
            stockActual: 175,
            stockMinimo: 4,
            proveedorId: proveedores[3]._id
        },
        {
            codigo: "PROD062",
            nombre: "Vino San Telmo Malbec 750Ml",
            categoria: "Vinos",
            precio: 2699.99,
            stockActual: 1,
            stockMinimo: 4,
            proveedorId: proveedores[3]._id
        },
        {
            codigo: "PROD063",
            nombre: "Vino Los Arboles Cabernet Malbec 750Ml",
            categoria: "Vinos",
            precio: 3499.99,
            stockActual: 102,
            stockMinimo: 4,
            proveedorId: proveedores[3]._id
        },
        {
            codigo: "PROD064",
            nombre: "Vino Don David Malbec 750Ml",
            categoria: "Vinos",
            precio: 5799.99,
            stockActual: 43,
            stockMinimo: 4,
            proveedorId: proveedores[3]._id
        },
        {
            codigo: "PROD065",
            nombre: "Vino Alma Mora Malbec 750Ml",
            categoria: "Vinos",
            precio: 4999.99,
            stockActual: 175,
            stockMinimo: 4,
            proveedorId: proveedores[3]._id
        },
        {
            codigo: "PROD071",
            nombre: "Mostaza Sabora 500Gr",
            categoria: "Aderezos",
            precio: 1850.99,
            stockActual: 3,
            stockMinimo: 5,
            proveedorId: proveedores[2]._id
        },
        {
            codigo: "PROD072",
            nombre: "Yerba Playadito 1Kg",
            categoria: "Yerba",
            precio: 2999.99,
            stockActual: 43,
            stockMinimo: 3,
            proveedorId: proveedores[2]._id
        },
        {
            codigo: "PROD073",
            nombre: "Azucar Ledesma 1Kg",
            categoria: "Azucar",
            precio: 879.99,
            stockActual: 55,
            stockMinimo: 6,
            proveedorId: proveedores[2]._id
        },
        {
            codigo: "PROD040",
            nombre: "Hamburguesa Union Ganadera 12U",
            categoria: "Carnes",
            precio: 12829.99,
            stockActual: 10,
            stockMinimo: 1,
            proveedorId: proveedores[4]._id
        },
        {
            codigo: "PROD041",
            nombre: "Hamburguesa Union Ganadera 2U",
            categoria: "Carnes",
            precio: 3325.00,
            stockActual: 12,
            stockMinimo: 1,
            proveedorId: proveedores[4]._id
        },
        {
            codigo: "PROD042",
            nombre: "Medallon de carne Swift 4U",
            categoria: "Carnes",
            precio: 2449.99,
            stockActual: 20,
            stockMinimo: 1,
            proveedorId: proveedores[4]._id
        },
        {
            codigo: "PROD043",
            nombre: "Medallon de carne M&K 4U",
            categoria: "Carnes",
            precio: 799.99,
            stockActual: 26,
            stockMinimo: 1,
            proveedorId: proveedores[4]._id
        },
        {
            codigo: "PROD051",
            nombre: "Arvejas Inca Lata 350grs",
            categoria: "Enlatados",
            precio: 620.99,
            stockActual: 72,
            stockMinimo: 4,
            proveedorId: proveedores[5]._id
        },
        {
            codigo: "PROD052",
            nombre: "Arvejas Caracas Lata 300grs",
            categoria: "Enlatados",
            precio: 684.99,
            stockActual: 26,
            stockMinimo: 4,
            proveedorId: proveedores[5]._id
        },
        {
            codigo: "PROD053",
            nombre: "Arvejas Denaro Lata 300grs",
            categoria: "Enlatados",
            precio: 999.99,
            stockActual: 59,
            stockMinimo: 4,
            proveedorId: proveedores[5]._id
        },
        {
            codigo: "PROD054",
            nombre: "Lentejas remojadas Inca Lata 350grs",
            categoria: "Enlatados",
            precio: 749.99,
            stockActual: 67,
            stockMinimo: 4,
            proveedorId: proveedores[5]._id
        },
        {
            codigo: "PROD055",
            nombre: "Lentejas Marolio Lata 350grs",
            categoria: "Enlatados",
            precio: 1725.45,
            stockActual: 82,
            stockMinimo: 4,
            proveedorId: proveedores[5]._id
        },
        {
            codigo: "PROD056",
            nombre: "Lentejas La Banda Lata 350grs",
            categoria: "Enlatados",
            precio: 1104.99,
            stockActual: 25,
            stockMinimo: 4,
            proveedorId: proveedores[5]._id
        }


    ]);
    console.log('Se insertaron datos en Productos.');

    // insertar movimientos. id's formados dinamicamente
    await Movimiento.insertMany([
        {
            productoId: productos[0]._id,
            tipo: "salida",
            cantidad: 5,
            motivo: "Venta CF",
            usuario: "admin"
        },
        {
            productoId: productos[1]._id,
            tipo: "salida",
            cantidad: 22,
            motivo: "Venta CF",
            usuario: "admin"
        }
    ]);
    console.log('Se insertaron datos en Movimientos.');

    console.log('La base de datos fue correctamente poblada');
    process.exit(0);
} catch (error) {
    console.error('Error al cargar los datos iniciales: ', error);
    process.exit(1);
}