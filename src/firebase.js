import admin from "firebase-admin";
//import fs from "fs";
import "dotenv/config"; // Asegúrate de importar dotenv si usas un archivo .env

//const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const credentialsJSON = process.env.FIREBASE_CREDENTIALS_JSON;

/*if (!serviceAccountPath) {
  throw new Error("La variable de entorno GOOGLE_APPLICATION_CREDENTIALS no está definida.");
}*/

if (!credentialsJSON) {
  throw new Error("La variable de entorno FIREBASE_CREDENTIALS_JSON no está definida.");
}

//console.log("Ruta a credenciales:", serviceAccountPath);
//console.log("¿El archivo existe?", fs.existsSync(serviceAccountPath));
//const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));


/*admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export default db;*/
let db; // Declarar db fuera del bloque try...catch

try {
  const serviceAccount = JSON.parse(credentialsJSON);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  db = admin.firestore();
  
} catch (error) {
  console.error("Error al parsear las credenciales de Firebase:", error);
  throw new Error("Error al configurar Firebase.");
}

export default db;