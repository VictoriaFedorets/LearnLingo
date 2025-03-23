import { useEffect, useState } from "react";
import { fetchTeachers } from "../../redux/teachers/operations.js";
import css from "./TeachersList.module.css";

const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const loadTeachers = async () => {
      const data = await fetchTeachers();
      setTeachers(data);
    };

    loadTeachers();
  }, []);

  return (
    <>
      <ul className={css.teachersList}>
        {teachers.map(
          ({
            id,
            name,
            surname,
            languages,
            levels,
            rating,
            reviews,
            price_per_hour,
            lessons_done,
            avatar_url,
            lesson_info,
            conditions,
            experience,
          }) => (
            <li className={css.teachersItem} key={id}>
              <div className={css.avatarBlock}>
                <img
                  src={avatar_url}
                  alt={`${name} ${surname}`}
                  className={css.teacherAvatar}
                />
                <svg className={css.iconPoint}>
                  <use href="/assets/icons/symbol-defs.svg#icon-point-avatar"></use>
                </svg>
              </div>

              <div className={css.teacherHeader}>
                <div className={css.teacherLessons}>
                  <h3>Languages</h3>
                  <ul className={css.lessonsList}>
                    <li className={css.lessonsItem}>
                      <svg className={css.iconBook}>
                        <use href="/assets/icons/symbol-defs.svg#icon-book-open"></use>
                      </svg>
                      <span>Lessons online</span>
                    </li>
                    <li>Lessons done: {lessons_done}</li>
                    <li>
                      <svg className={css.iconStar}>
                        <use href="/assets/icons/symbol-defs.svg#icon-star"></use>
                      </svg>
                      Rating: {rating}
                    </li>
                    <li>
                      Price / 1 hour:&nbsp;
                      <span className={css.price}>{price_per_hour}$</span>
                    </li>
                  </ul>
                  <svg className={css.iconHeart}>
                    <use href="/assets/icons/symbol-defs.svg#icon-heart"></use>
                  </svg>

                  <p>{/* <strong>Reviews:</strong> {reviews} */}</p>
                </div>

                <div className={css.teacherInfo}>
                  <h3>
                    {name} {surname}
                  </h3>
                  <p>
                    Speaks: <span>{languages.join(", ")}</span>
                  </p>
                  <p>
                    Lesson Info: <span>{lesson_info}</span>
                  </p>
                  <p>
                    Conditions: <span>{conditions}</span>
                  </p>
                </div>

                <button className={css.btnReadMore}>Read more</button>

                <ul className={css.levelBlock}>
                  {levels.map((level, index) => (
                    <li className={css.levelItem} key={index}>
                      #{level}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          )
        )}
      </ul>
      <button className={css.teachersListBtn}>Load more</button>
    </>
  );
};

export default TeachersList;
