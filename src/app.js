import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import ProductsRoutes from './routes/products.routes.js'

const app = express();

app.use(cors())
app.use(morgan('dev'))
app.use(express.json());
app.use(ProductsRoutes)

// Servir archivos estáticos desde la carpeta donde está el frontend compilado
app.use(express.static(path.join(__dirname, "dist")));



export default app
