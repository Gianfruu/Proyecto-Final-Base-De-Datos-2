import mongoose from 'mongoose';

const MovimientoSchema = new mongoose.Schema({
    productoId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Producto', 
        required: [true, 'El producto es obligatorio'] 
    },
    tipo: { 
        type: String, 
        enum: {
        values: ['entrada', 'salida'],
        message: 'El tipo debe ser "entrada" o "salida"'
        }, 
        required: [true, 'El tipo de movimiento es obligatorio'] 
    },
    cantidad: { 
        type: Number, 
        required: [true, 'La cantidad es obligatoria'], 
        min: [1, 'La cantidad mínima es 1'] 
    },
    motivo: { 
        type: String, 
        required: [true, 'El motivo es obligatorio'],
        trim: true 
    },
    fecha: { 
        type: Date, 
        default: Date.now 
    },
    usuario: { 
        type: String, 
        required: [true, 'El usuario es obligatorio'], 
        trim: true 
    }
});

export default mongoose.model('Movimiento', MovimientoSchema )