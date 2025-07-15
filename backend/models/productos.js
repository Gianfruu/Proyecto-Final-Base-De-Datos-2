import mongoose from 'mongoose';

const ProductoSchema = new mongoose.Schema({    
    codigo: { 
        type: String, 
        required: [true, 'El código del producto es obligatorio'],
        trim: true,
        unique: true 
    },
    nombre: { 
        type: String, 
        required: [true, 'El nombre del producto es obligatorio'],
        trim: true 
    },
    categoria: { 
        type: String, 
        required: [true, 'La categoría del producto es obligatoria'],
        trim: true 
    },
    precio: { 
        type: Number, 
        required: [true, 'El precio del producto es obligatorio'],
        min: [0, 'El precio no puede ser negativo'] 
    },
    stockActual: { 
        type: Number, 
        required: [true, 'El stock actual es obligatorio'],
        min: [0, 'El stock actual no puede ser negativo']
    },
    stockMinimo: { 
        type: Number, 
        required: [true, 'El stock mínimo es obligatorio'],
        min: [0, 'El stock mínimo no puede ser negativo']
    },
    proveedorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Proveedor', 
        required: [true, 'El proveedor es obligatorio'] 
    },
    fechaUltimaActualizacion: { 
        type: Date, 
        default: Date.now 
    }
});

export default mongoose.model('Producto', ProductoSchema);