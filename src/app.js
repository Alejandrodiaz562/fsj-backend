import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import ProductsRoutes from './routes/products.routes.js'

const app = express();

app.use(cors())
app.use(morgan('dev'))
app.use(express.json());
app.use(ProductsRoutes)

export default app
