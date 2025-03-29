import { database } from "../../firebase.js";
import { ref, get } from "firebase/database";

export const fetchTeachersFromDB = async () => {
  try {
    const teachersRef = ref(database, "teachers");
    const snapshot = await get(teachersRef);

    if (!snapshot.exists()) {
      console.warn("No data on teachers");
      return [];
    }

    // Конвертуємо отримані дані у масив
    const teachers = Object.entries(snapshot.val()).map(([id, teacher]) => ({
      id, // Додаємо ідентифікатор кожного викладача
      ...teacher,
    }));

    return teachers;
  } catch (error) {
    console.error("Error when receiving teachers:", error);
    return [];
  }
};
