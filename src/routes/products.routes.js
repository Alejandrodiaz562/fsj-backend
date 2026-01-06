import {Router} from 'express'
import {getProducts, getProductById, createProduct, updateProduct, deleteProduct} from '../components/products.controllers.js'

import { upload } from '../config/multer.js'

const router = Router()

router.get('/', (req, res) => {
    res.send('API funcionando 🚀');
  });


router.get('/products', getProducts)

router.get('/products/:id', getProductById)

router.post('/products', upload.array('photos', 12), createProduct)

router.put('/products/:id', updateProduct)

router.delete('/products/:id', deleteProduct)

export default router