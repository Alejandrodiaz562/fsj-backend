import admin from "firebase-admin";
import fs from "fs";
import "dotenv/config"; // Asegúrate de importar dotenv si usas un archivo .env

const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!serviceAccountPath) {
  throw new Error("La variable de entorno GOOGLE_APPLICATION_CREDENTIALS no está definida.");
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export default db;