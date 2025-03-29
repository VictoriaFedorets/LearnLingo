import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachersFromFirebase } from "../../redux/teachers/operations.js";
import { selectTeachers } from "../../redux/teachers/selectors.js";
import { selectFavorites } from "../../redux/favorites/selectors.js";
import Header from "../../components/Header/Header.jsx";

export default function FavoritesPage() {
  const dispatch = useDispatch();
  const teachers = useSelector(selectTeachers);
  const favorites = useSelector(selectFavorites);
  const loading = useSelector((state) => state.teachers.loading);
  const error = useSelector((state) => state.teachers.error);
  console.log("Favorites state:", favorites);

  useEffect(() => {
    dispatch(fetchTeachersFromFirebase());
  }, [dispatch]);

  const favoriteTeachers = teachers.filter((teacher) =>
    favorites.some((fav) => fav.id === teacher.id)
  );

  if (loading) return <p>Loading teachers...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Header />
      <h2>Favorite Teachers</h2>
      {favoriteTeachers.length === 0 ? (
        <p>No favorite teachers yet</p>
      ) : (
        <ul>
          {favoriteTeachers.map((teacher) => (
            <li key={teacher.id}>{teacher.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
