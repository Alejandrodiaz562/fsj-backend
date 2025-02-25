import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import ProductsRoutes from './routes/products.routes.js'
import path from 'path'
import { fileURLToPath } from 'url'; // Necesario para __dirname en ES modules

const app = express();

// Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json());

// Rutas de API
app.use(ProductsRoutes)

// Obtener la ubicación del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde la carpeta donde está el frontend compilado
app.use(express.static(path.join(__dirname, "dist")));

// Capturar todas las rutas desconocidas y devolver index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
  

export default app
