import mongoose from 'mongoose';

// Base de datos: TiendaGrupo19
const uri = 'mongodb://localhost:27017/TiendaGrupo19';

// Conexión
const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Conexión a mongoDB exitosa.');
    } catch(err) {
        console.error('Error de conexión a mongoDB:', err);
        process.exit(1);
    }
};

export default connectDB;