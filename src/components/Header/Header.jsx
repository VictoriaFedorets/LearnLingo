import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useState } from "react";
import LogInForm from "../LogInForm/LogInForm.jsx";
import css from "./Header.module.css";

export default function Header() {
  const [authModal, setAuthModal] = useState({ isOpen: false, isLogin: true });

  const getNavLinkClass = ({ isActive }) =>
    clsx(css.link, isActive && css.active);

  const openAuthModal = (isLogin) => setAuthModal({ isOpen: true, isLogin });

  return (
    <>
      <header className={css.header}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            clsx(css.headerLogo, isActive && css.active)
          }
        >
          <svg className={css.iconLogo}>
            <use href="/assets/icons/symbol-defs.svg#icon-ukraine"></use>
          </svg>
          <p>LearnLingo</p>
        </NavLink>

        <nav className={css.headerNav}>
          <NavLink to="/" className={getNavLinkClass}>
            Home
          </NavLink>
          <NavLink to="/teachers" className={getNavLinkClass}>
            Teachers
          </NavLink>
        </nav>

        <div className={css.headerAuthorization}>
          <button
            className={css.headerLogIn}
            onClick={() => openAuthModal(true)}
          >
            <svg className={css.iconLogo}>
              <use
                className={css.iconLogIn}
                href="/assets/icons/symbol-defs.svg#icon-log-in-01"
              ></use>
            </svg>
            <p>Log in</p>
          </button>
          <button
            className={css.headerRegistration}
            onClick={() => openAuthModal(false)}
          >
            Registration
          </button>
        </div>
      </header>

      {authModal.isOpen && (
        <LogInForm
          isLogin={authModal.isLogin}
          onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        />
      )}
    </>
  );
}
