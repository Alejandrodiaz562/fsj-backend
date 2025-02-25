import {Router} from 'express'
import {getProduct, createProduct, updateProduct, deleteProduct} from '../components/products.controllers.js'

import { upload } from '../config/multer.js'

const router = Router()

// Capturar TODAS las rutas y devolver index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });

router.get('/products', getProduct)

router.post('/products', upload.array('photos', 12), createProduct)

router.put('/products', updateProduct)

router.delete('/products', deleteProduct)

export default router