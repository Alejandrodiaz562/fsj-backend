import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import ProductsRoutes from './routes/products.routes.js'

const app = express();

// Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json());

// Rutas de API
app.use(ProductsRoutes)

export default app
