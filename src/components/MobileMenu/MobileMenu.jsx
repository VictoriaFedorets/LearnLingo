import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./MobileMenu.module.css";

export default function MobileMenu({ isOpen, onClose, isLoggedIn }) {
  if (!isOpen) return null;

  const getNavLinkClass = ({ isActive }) =>
    clsx(css.link, isActive && css.active);

  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.menu} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={onClose}>
          <svg className={css.iconClose}>
            <use href="/assets/icons/symbol-defs.svg#icon-x"></use>
          </svg>
        </button>

        <nav className={css.headerNav}>
          <NavLink to="/" className={getNavLinkClass} onClick={onClose}>
            Home
          </NavLink>
          <NavLink to="/teachers" className={getNavLinkClass} onClick={onClose}>
            Teachers
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to="/favorites"
              className={getNavLinkClass}
              onClick={onClose}
            >
              Favorites
            </NavLink>
          )}
        </nav>
      </div>
    </div>
  );
}
