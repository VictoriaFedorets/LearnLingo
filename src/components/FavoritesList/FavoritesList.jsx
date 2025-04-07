import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { removeFromFavorites } from "../../redux/favorites/slice.js";
import { selectFavorites } from "../../redux/favorites/selectors.js";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import ModalLesson from "../ModalLesson/ModalLesson.jsx";
import TeacherItem from "../TeacherItem/TeacherItem.jsx";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton.jsx";
import css from "./FavoritesList.module.css";

export default function FavoritesList() {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [expandedTeachers, setExpandedTeachers] = useState({});
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [visibleTeachers, setVisibleTeachers] = useState(4);

  const toggleExpand = (id) => {
    setExpandedTeachers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const openModal = (teacher) => {
    setSelectedTeacher(teacher);
  };

  const closeModal = () => {
    setSelectedTeacher(null);
  };

  const handleFavoriteToggle = (teacher) => {
    if (!isLoggedIn) {
      toast.warning("You need to log in to manage favorites!");
      return;
    }

    dispatch(removeFromFavorites(teacher.id));
    toast.info("Removed from favorites!");
  };

  return (
    <>
      <ul className={css.teachersList}>
        {favorites.length > 0 ? (
          favorites
            .slice(0, visibleTeachers)
            .map((teacher) => (
              <TeacherItem
                key={teacher.id}
                teacher={teacher}
                isFavorite={true}
                onFavoriteToggle={() => handleFavoriteToggle(teacher)}
                onOpenModal={() => openModal(teacher)}
                isExpanded={expandedTeachers[teacher.id]}
                toggleExpand={() => toggleExpand(teacher.id)}
                isLoggedIn={isLoggedIn}
              />
            ))
        ) : (
          <p className={css.noResults}>No favorite teachers yet</p>
        )}
      </ul>
      <LoadMoreButton
        teachers={favorites}
        visibleTeachers={visibleTeachers}
        setVisibleTeachers={setVisibleTeachers}
      />
      {selectedTeacher && (
        <ModalLesson teacher={selectedTeacher} onClose={closeModal} />
      )}
    </>
  );
}
