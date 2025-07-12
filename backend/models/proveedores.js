import mongoose from 'mongoose';

const ProveedorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del proveedor es obligatorio'],
    trim: true
  },
  contacto: {
    type: String,
    required: [true, 'El nombre del contacto es obligatorio'],
    trim: true
  },
  telefono: {
    type: String,
    required: [true, 'El teléfono del proveedor es obligatorio'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El correo electrónico del proveedor es obligatorio'],
    trim: true,
    match: [/\S+@\S+\.\S+/, 'El correo electrónico no tiene un formato válido']
  },  
  productosOfrecidos: {
  type: [String],
  required: [true, 'Debe seleccionar al menos un producto'],
  default: []
  }
});

export default mongoose.model('Proveedor', ProveedorSchema);
