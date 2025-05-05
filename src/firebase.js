import admin from "firebase-admin";
import fs from "fs";
import "dotenv/config"; // Asegúrate de importar dotenv si usas un archivo .env

let db;

try {
  let serviceAccount;
  if (process.env.NODE_ENV === "production") {
    serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS_JSON);
  } else {
    const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  db = admin.firestore();

} catch (error) {
  console.error("Error al configurar Firebase:", error);
  throw new Error("Error al configurar Firebase.");
}

export default db;
