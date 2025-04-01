import { useState } from "react";
import css from "./LoadMoreButton.module.css";

export default function LoadMoreButton({
  teachers,
  visibleTeachers,
  setVisibleTeachers,
}) {
  const [loading, setLoading] = useState(false);

  const loadMoreTeachers = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleTeachers((prev) => prev + 4);
      setLoading(false);
    }, 1000);
  };

  const isLoadMoreHidden = teachers.length <= visibleTeachers;

  return (
    <>
      {!isLoadMoreHidden && (
        <button
          className={css.teachersListBtn}
          onClick={loadMoreTeachers}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
    </>
  );
}
