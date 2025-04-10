import { useEffect } from "react";
import LogInForm from "../LogInForm/LogInForm.jsx";
import RegisterForm from "../RegisterForm/RegisterForm.jsx";
import css from "./BaseModal.module.css";

export default function BaseModal({ isLogin, onClose, children, error }) {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose, error]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button className={css.closeButton} onClick={onClose}>
          <svg className={css.iconClose}>
            <use href="/assets/icons/symbol-defs.svg#icon-x"></use>
          </svg>
        </button>
        {children ? (
          children
        ) : isLogin ? (
          <LogInForm onClose={onClose} />
        ) : (
          <RegisterForm />
        )}
      </div>
    </div>
  );
}
