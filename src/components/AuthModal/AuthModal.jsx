import { useEffect } from "react";
import css from "./AuthModal.module.css";
import LogInForm from "../LogInForm/LogInForm.jsx";
import RegisterForm from "../RegisterForm/RegisterForm.jsx";

export default function AuthModal({ isLogin, onClose }) {
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
  }, [onClose]);

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
            <use href="public/assets/icons/symbol-defs.svg#icon-x"></use>
          </svg>
        </button>
        {isLogin ? <LogInForm /> : <RegisterForm />}
      </div>
    </div>
  );
}
