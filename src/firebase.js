import admin from "firebase-admin";
/*import { readFile } from "fs/promises";

const serviceAccount = JSON.parse(
    await readFile(new URL("../firebase2.json", import.meta.url))
  );

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

*/

import dotenv from "dotenv";
dotenv.config(); // Cargar variables de entorno desde .env
admin.initializeApp({
  credential: admin.credential.applicationDefault(), // Usa GOOGLE_APPLICATION_CREDENTIALS
});

const db = admin.firestore();

export default db;