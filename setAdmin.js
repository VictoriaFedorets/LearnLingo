import admin from "firebase-admin";
import fs from "fs";

// Завантажуємо приватний ключ
const serviceAccount = JSON.parse(
  fs.readFileSync("serviceAccountKey.json", "utf8")
);

// Ініціалізуємо Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Замініть USER_UID на реальний UID користувача
const userId = "USER_UID";

admin
  .auth()
  .setCustomUserClaims(userId, { admin: true })
  .then(() => {
    // Admin rights granted (успешно)
  })
  .catch((error) => {
    // Ошибка установки прав
  });
