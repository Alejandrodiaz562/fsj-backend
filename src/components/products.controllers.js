import cloudinary from '../config/cloudinary.js';
import fs from 'fs'
import db from "../firebase.js";


export const getProducts = async (req, res) => {
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

export const getProductById = async (req, res) => {
    try {
        const {id} = req.params

        const docRef = db.collection('products').doc(id)
        const docSnap = await docRef.get()

        if (!docSnap.exists){
            return res.status(404).json({
                error: 'producto no encontrado'
            })
        }

        res.status(200).json({
            id: docSnap.id,
            ...docSnap.data()
        })
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        res.status(500).json({ error: "Error al obtener el producto" });
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
        const id = productRef.id;
        
        await productRef.set({
          ...newProduct,
          id // ¡esto es lo que falta!
        });

        res.json({
            message: 'Imagenes y datos subidos con éxito',
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al subir las imagenesy o guardar los datos' })
    }
    
}

export const updateProduct = async (req, res) => {
    try {
        const {id} = req.params
        const { price, description, existingImages, category } = req.body

        if (!id){
            return res.status(400).json({message: 'ID faltante'})
        }

        // imágenes antiguas (vienen como JSON string)
        const oldImages = existingImages
            ? JSON.parse(existingImages)
            : [];

        const dataToUpdate = {};

        // imágenes nuevas (subidas con multer + cloudinary)
        const newImages = req.files
            ? req.files.map(file => file.path)
            : [];

        const finalImages = [...oldImages, ...newImages];

        if (price !== undefined) dataToUpdate.price = price;
        if (description !== undefined) dataToUpdate.description = description
        if (finalImages !== undefined) dataToUpdate.images = finalImages;
        if (category !== undefined) dataToUpdate.category = category;

        if (Object.keys(dataToUpdate).length === 0) {
            return res.status(400).json({ message: "No hay datos para actualizar" });
        }

        //const productRef = doc(db, 'products', id)

        //await updateDoc(productRef, data)

        await db.collection('products').doc(id).update(dataToUpdate)

        return res.status(200).json({
            message: 'producto actualizado correctamente', 
            id,
            data: dataToUpdate
        })


        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'erroro al editar el producto',
            error: error.message
        })

    }
}


export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    console.log("Intentando eliminar producto con ID:", id);

    try {
        const productRef = db.collection('products').doc(id);
        const doc = await productRef.get();

        if (!doc.exists) {
            console.log("No se encontró el documento en Firestore.");
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
          }
        await productRef.delete();
        res.json({mensaje: 'Producto eliminado correctamente'})
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ mensaje: 'Error al eliminar el producto' });
    }
}

