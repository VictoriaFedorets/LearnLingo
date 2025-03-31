import css from "./TeacherItem.module.css";

export default function TeacherItem({
  teacher,
  isExpanded,
  toggleExpand,
  openModal,
}) {
  const {
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
  } = teacher;

  return (
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

        {isExpanded && (
          <div className={css.reviewers}>
            <p className={css.reviewersExperience}>{experience}</p>
            <ul className={css.reviewerList}>
              {reviews.map(
                ({ reviewer_name, reviewer_rating, comment }, index) => (
                  <li className={css.reviewerItem} key={index}>
                    <div className={css.reviewerInfo}>
                      <div className={css.reviewerNameLetter}>
                        {reviewer_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className={css.reviewerName}>{reviewer_name}</p>
                        <p className={css.reviewerRating}>
                          <svg className={css.iconStar}>
                            <use href="/assets/icons/symbol-defs.svg#icon-star"></use>
                          </svg>
                          {reviewer_rating}
                        </p>
                      </div>
                    </div>
                    <p className={css.reviewerComment}>{comment}</p>
                  </li>
                )
              )}
            </ul>
          </div>
        )}

        <ul className={css.levelBlock}>
          {levels.map((level, index) => (
            <li className={css.levelItem} key={index}>
              #{level}
            </li>
          ))}
        </ul>

        <button
          className={isExpanded ? css.btnBookLesson : css.btnReadMore}
          onClick={(e) => {
            if (isExpanded) {
              openModal(teacher);
            } else {
              toggleExpand(id);
            }
            e.target.blur();
          }}
        >
          {isExpanded ? "Book trial lesson" : "Read more"}
        </button>
      </div>
    </li>
  );
}
