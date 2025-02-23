import multer from 'multer';

// Configurar Multer para almacenar en memoria
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (_req, file, cb) => {
        const ext = file.originalname.split(".").pop()
        cb(null, `${Date.now( )}.${ext}`)
    }
})

export const upload = multer({storage})