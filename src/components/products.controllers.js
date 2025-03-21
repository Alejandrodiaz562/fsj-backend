import cloudinary from '../config/cloudinary.js';
import fs from 'fs'
import db from "../firebase.js";

export const getProduct = async (req, res) => {
    try {
        // Obtener la colección 'products' de Firestore
        const snapshot = await db.collection('products').get();
        
        // Verificar si hay datos en la colección
        if (snapshot.empty) {
            return res.status(200).json([]);
        }

        // Convertir los documentos en un array de productos
        const products = snapshot.docs.map(doc => ({
            id: doc.id, // Agregamos el ID del documento
            ...doc.data() // Desestructuramos los datos del documento
        }));

        res.json(products);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({ error: "Error al obtener los productos" });
    }
}


export const createProduct = async (req, res) => {

    try {
        
        const { price, description, category } = req.body;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No se subieron archivos' })
        }

        const imageUrls = [];

        for (const file of req.files) {
           const result = await cloudinary.uploader.upload(file.path, {
               folder: 'Alejo'
           });
           imageUrls.push(result.secure_url);
           // Eliminar la imagen local después de subirla
            fs.unlinkSync(file.path);

        }

        // Guardar en Firebase
        const newProduct = {
            price: parseFloat(price),
            description,
            images: imageUrls,  // Guardar todas las URLs de las imágenes
            category
        };

        const productRef = db.collection('products').doc();
        await productRef.set(newProduct);

        res.json({
            message: 'Imagenes y datos subidos con éxito',
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al subir las imagenesy o guardar los datos' })
    }
    
}

export const updateProduct = (req, res) => {
    res.send("updating products")
}


export const deleteProduct = (req, res) => {
    res.send("deleting products")
}

