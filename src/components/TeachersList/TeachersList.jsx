import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchTeachersFromFirebase } from "../../redux/teachers/operations.js";
import { selectTeachers } from "../../redux/teachers/selectors.js";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/favorites/slice.js";
import { selectFavorites } from "../../redux/favorites/selectors.js";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import ModalLesson from "../ModalLesson/ModalLesson.jsx";
import TeacherItem from "../TeacherItem/TeacherItem.jsx";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton.jsx";
import css from "./TeachersList.module.css";

export default function TeachersList({ filters }) {
  const dispatch = useDispatch();
  const teachers = useSelector(selectTeachers);
  const favorites = useSelector(selectFavorites);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [expandedTeachers, setExpandedTeachers] = useState({});
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [visibleTeachers, setVisibleTeachers] = useState(4);

  useEffect(() => {
    dispatch(fetchTeachersFromFirebase());
  }, [dispatch]);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const { language, level, price } = filters;
      const teacherPrice = teacher.price_per_hour.toString(); // Приведення до рядка ціни
      const teacherLanguages = teacher.languages.map((lang) =>
        lang.toLowerCase()
      ); // Приведення мов до нижнього регістру

      const priceRanges = {
        10: [10, 19],
        20: [20, 29],
        30: [30, 39],
        40: [40, 100],
      };

      return (
        (!language || teacherLanguages.includes(language.toLowerCase())) &&
        (!level ||
          teacher.levels.some((lvl) =>
            lvl.toLowerCase().includes(level.toLowerCase())
          )) && // Перевірка рівнів з урахуванням регістру
        (!price ||
          (teacherPrice >= priceRanges[price][0] &&
            teacherPrice <= priceRanges[price][1]))
      );
    });
  }, [teachers, filters]);

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
      toast.warning("You need to log in to add favorites!");
      return;
    }

    if (favorites.some((favorite) => favorite.id === teacher.id)) {
      dispatch(removeFromFavorites(teacher.id));
      toast.info("Removed from favorites!");
    } else {
      dispatch(addToFavorites(teacher));
      toast.success("Added to favorites!");
    }
  };

  return (
    <>
      <ul className={css.teachersList}>
        {filteredTeachers.length > 0 ? (
          filteredTeachers
            .slice(0, visibleTeachers)
            .map((teacher) => (
              <TeacherItem
                key={teacher.id}
                teacher={teacher}
                isFavorite={favorites.some((fav) => fav.id === teacher.id)}
                onFavoriteToggle={() => handleFavoriteToggle(teacher)}
                onOpenModal={() => openModal(teacher)}
                isExpanded={expandedTeachers[teacher.id]}
                toggleExpand={() => toggleExpand(teacher.id)}
                isLoggedIn={isLoggedIn}
                selectedLevel={filters.level}
              />
            ))
        ) : (
          <p className={css.noResults}>No teachers found</p>
        )}
      </ul>
      <LoadMoreButton
        teachers={filteredTeachers}
        visibleTeachers={visibleTeachers}
        setVisibleTeachers={setVisibleTeachers}
      />

      {selectedTeacher && (
        <ModalLesson teacher={selectedTeacher} onClose={closeModal} />
      )}
    </>
  );
}
