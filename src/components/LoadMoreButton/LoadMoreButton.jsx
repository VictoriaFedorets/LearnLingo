import React from "react";
import css from "./LoadMoreButton.module.css";

export default function LoadMoreButton() {
  const loadMoreTeachers = () => {
    // Логика для загрузки дополнительных преподавателей
    console.log("Load more teachers");
  };

  return (
    <button className={css.teachersListBtn} onClick={loadMoreTeachers}>
      Load more
    </button>
  );
}
