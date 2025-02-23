import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();
// CONFIGURAR CLOUDINARY
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

// Exportar la instancia configurada
export default cloudinary;