## Base de Datos II - TP FINAL - Grupo 19.
---
### 1️⃣ Generalidades
- Título: Mini proyecto con MongoDB - JavaScript.
- Proyecto seleccionado: Sistema de Inventario de Tienda (4).
- Entorno de ejecución: Node.js 
- Web Framework: Express
- Lenguaje: JavaScript. 
- Base de datos: MongoDB.

---

---
### 2️⃣ Descripción:
- Se trata de un proyecto enfocado en el diseño de una base de datos en MongoDB y en la construcción de una API RESTful para su empleo.
- Primariamente, se accede mediante Postman para verificar el correcto funcionamiento del sistema y para emplear la totalidad de los servicios que provee este Sistema de Inventario de Tienda.
- Secundariamente, se ofrece una sencilla app web, al solo efecto de visualizar facil y rápidamente algunas de las posibilidades que brinda la API del proyecto.
- Para cumplir con la consigna, se crea una base de datos en mongoDB con las colecciones provistas: productos, movimientos, proveedores.
- La base de datos en particular, es accesible en <pre> ``` mongodb://localhost:27017/TiendaGrupo19 ``` </pre>
---


---
### 3️⃣ Instalación y ejecución:
- Requisitos: Tener instalado MongoDB.
- Ejecución: Ubicados en la raiz del proyecto y desde Visual Studio Code, ejecutar en secuencia los siguientes
tres comandos:
- npm install
- npm run seed
- npm run dev
- Finalizado el proceso indicado, la terminal anunciará lo siguiente:
- [1] Frontend activo en http://localhost:3001. Este es el acceso a la app web.
- [0] Conexión a mongoDB exitosa.
- [0] Servidor en http://localhost:3000. Este es el acceso a la API.
---

##  API RESTful
---

## 4️⃣ Arquitectura General del Backend
---
```
                                             ↑                                             
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│             │    │             │    │             │    │             │    │             │
│  entidades  │◄──►│  servicios  │◄──►│controladores│◄───│    rutas    │◄───│     app     │◄─── localhost:3000
│             │    │             │    │             │    │             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

---
## 5️⃣ Estructura de Archivos Backend
---
```
proyecto/
├── backend/
│   ├── db/                     # Conección MongoDB. Seed BDD.
│   ├── controllers/            # Atiende la lógica req/res.
│   ├── middleware/             # Validación y manejo de errores.
│   ├── models/                 # Entidades.
│   ├── routes/                 # Rutas de la API.
│   ├── services/               # Interacciona con la BDD.
│   ├── app.js                  # Inicio y arranque del servidor.
│   ├── package.json            # Dependencias de Express.
```

---
## 6️⃣ Servicios API
---
```
- GET, POST, GET:id, POST:id, PUT:id, DELETE:id, para las siguientes direcciones:

- http://localhost:3000/api/proveedores 

- http://localhost:3000/api/movimientos 

- http://localhost:3000/api/productos

```

---
## 7️⃣ Servicios API extra exigidos por consignas
---
```
- Reporte "Listar productos con stock por debajo del mínimo":
- GET http://localhost:3000/api/productos/stock-bajo

- Reporte de "movimientos en período":
- GET http://localhost:3000/api/movimientos/reporte?startDate=2025-07-01&endDate=2025-07-30

```

---
## 8️⃣ GET URL's  
---
```
http://localhost:3000/                              Retorna una health page
http://localhost:3000/proveedores                   Retorna lista de todos los proveedores
http://localhost:3000/proveedores/:id               Retorna un proveedor, por id
http://localhost:3000/productos                     Retorna lista de todos los productos
http://localhost:3000/productos/:id                 Retorna un producto, por id
http://localhost:3000/movimientos                   Retorna lista de todos los movimientos
http://localhost:3000/movimientos/:id               Retorna un movimiento, por id
```


---
## 9️⃣ Parámetros QUERY 
---
```
&page=1                 Para agregar la página buscada
&limit=2                Para agregar la cantidad de páginas deseada
&sort=-campo            Para agregar el orden deseado por campo. - revierte el orden
&order=asc/desc         Para agregar el orden deseado por campo, sin usar el -
&keyword=               Para agregar una búsqueda por codigo, nombre, contacto, tipo o motivo
&startDate              Para agregar la fecha de inicio en la consulta Reporte de movimientos
&endDate                Para agregar la fecha de cierre en la consulta Reporte de movimientos
```

---
## 🔟 POST Nuevo proveedor (ejemplo)
---
```
http://localhost:3000/api/proveedores
   
    {
        "nombre": "Distribuidora Food",
        "contacto": "Daniel Ariel Ramirez",
        "telefono": "+54 291 456-2882",
        "email": "food_products@gmail.com",
        "productosOfrecidos": [
            "PROD001",
            "PROD002"
        ]
    }
```

---
## 1️⃣1️⃣ POST Nuevo producto (ejemplo)
---
```
http://localhost:3000/api/productos
   

    {
        "codigo": "PROD001",
        "nombre": "Arroz Gallo",
        "categoria": "No perecederos",
        "precio": 799.95,
        "stockActual": 15,
        "stockMinimo": 2,
        "proveedorId": "686874af18df466d5c5516d7"
    }
```

---
## 1️⃣2️⃣ POST Nuevo movimiento (ejemplo)
---
```
http://localhost:3000/api/movimientos
   
    {
        "productoId": "686a6ce512e30b8c6aa203bd",
        "tipo": "entrada",
        "cantidad": 5,
        "motivo": "Compra de saldos",
        "usuario": "admin"
    }
```

---
## 1️⃣3️⃣ PUT
---
```
PUT http://localhost:3000/proveedores/:id                   Editar un proveedor. id del proveedor.

PUT http://localhost:3000/productos/:id                     Editar un producto. id del producto.

PUT http://localhost:3000/movimientos/:id                   Editar un movimiento. id del movimiento.
```

---
## 1️⃣4️⃣ DELETE  
---
```
DELETE http://localhost:3000/proveedores/:id               Borrar un proveedor. id del proveedor.

DELETE http://localhost:3000/productos/:id                 Borrar un producto. id del producto.

DELETE http://localhost:3000/movimientos/:id               Borrar un movimiento. id del movimiento.
```

---
## 1️⃣5️⃣ Configuración del puerto
---

- Puerto: El servidor está escuchando en el puerto 3000.
- Este valor se configura en el archivo backend/app.js
- const PORT = process.env.BACK_PORT || process.env.PORT || 3000;

---
##  GRUPO 19

---
## 1️⃣6️⃣ Integrantes

- Arce Carlos Alberto
- Baltian Ortiz Jeronimo
- Campagnucci Gianfranco
- Colantonio Dario
