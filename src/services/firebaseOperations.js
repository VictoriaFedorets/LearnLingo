import { database, auth } from "../../firebase.js";
import { ref, get, set } from "firebase/database";

export const fetchTeachersFromDB = async () => {
  try {
    const teachersRef = ref(database, "teachers");
    const snapshot = await get(teachersRef);

    if (!snapshot.exists()) {
      return [];
    }

    // Конвертуємо отримані дані у масив
    return Object.entries(snapshot.val()).map(([id, teacher]) => ({
      id,
      ...teacher,
    }));
  } catch {
    return [];
  }
};

// Функція запису вподобань у Firebase
export const saveFavoritesToDatabase = (favorites) => {
  const userId = auth.currentUser?.uid;
  if (userId) {
    const favoritesRef = ref(database, `favorites/${userId}`);
    set(favoritesRef, favorites);
  }
};

// Функція отримання вподобань із Firebase
export const loadFavoritesFromDatabase = async () => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User is not logged in");

    const favoritesRef = ref(database, `favorites/${userId}`);
    const snapshot = await get(favoritesRef);

    return snapshot.exists() ? snapshot.val() : [];
  } catch {
    return [];
  }
};
