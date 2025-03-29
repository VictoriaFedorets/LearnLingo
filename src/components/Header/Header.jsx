import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useState } from "react";
import BaseModal from "../BaseModal/BaseModal.jsx";
import css from "./Header.module.css";

export default function Header() {
  const [baseModalState, setbaseModalState] = useState({
    isOpen: false,
    isLogin: true,
  });

  const getNavLinkClass = ({ isActive }) =>
    clsx(css.link, isActive && css.active);

  const openBaseModal = (isLogin) =>
    setbaseModalState({ isOpen: true, isLogin });

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
          <NavLink to="/favorites" className={getNavLinkClass}>
            Favorites
          </NavLink>
        </nav>

        <div className={css.headerAuthorization}>
          <button
            className={css.headerLogIn}
            onClick={() => openBaseModal(true)}
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
            onClick={() => openBaseModal(false)}
          >
            Registration
          </button>
        </div>
      </header>

      {baseModalState.isOpen && (
        <BaseModal
          isLogin={baseModalState.isLogin}
          onClose={() =>
            setbaseModalState({ ...baseModalState, isOpen: false })
          }
        />
      )}
    </>
  );
}
