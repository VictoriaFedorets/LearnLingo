import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors.js";
import { logoutUser } from "../../redux/auth/operations.js";
import BaseModal from "../BaseModal/BaseModal.jsx";
import MobileMenu from "../MobileMenu/MobileMenu.jsx";
import UserMenu from "../UserMenu/UserMenu.jsx";
import css from "./Header.module.css";

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  
  const [baseModalState, setbaseModalState] = useState({
    isOpen: false,
    isLogin: true,
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const getNavLinkClass = ({ isActive }) =>
    clsx(css.link, isActive && css.active);

  const openBaseModal = (isLogin) =>
    setbaseModalState({ isOpen: true, isLogin });

  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
    setIsUserMenuOpen(false);
  }, [dispatch]);

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
          {isLoggedIn && (
            <NavLink to="/favorites" className={getNavLinkClass}>
              Favorites
            </NavLink>
          )}
        </nav>

        <div className={css.headerAuthorization}>
          {isLoggedIn ? (
            <>
              <p className={css.headerUser}>Hello, {user?.name || "User"}!</p>
              <button className={css.headerRegistration} onClick={handleLogout}>
                Log out
                <svg className={css.iconLogo}>
                  <use
                    className={css.iconLogIn}
                    href="/assets/icons/symbol-defs.svg#icon-log-in-01"
                  ></use>
                </svg>
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>

        <div className={css.mobMenu}>
          <button
            className={css.burgerBtn}
            onClick={() => setIsUserMenuOpen(true)}
          >
            <svg className={css.iconBurger}>
              <use href="/assets/icons/symbol-defs.svg#icon-user"></use>
            </svg>
          </button>

          <button
            className={clsx(css.burgerBtn, css.menuBtn)}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg className={css.iconBurger}>
              <use href="/assets/icons/symbol-defs.svg#icon-menu"></use>
            </svg>
          </button>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        getNavLinkClass={getNavLinkClass}
        onClose={() => setIsMobileMenuOpen(false)}
        isLoggedIn={isLoggedIn}
      />

      <UserMenu
        user={user}
        openBaseModal={openBaseModal}
        handleLogout={handleLogout}
        isOpen={isUserMenuOpen}
        onClose={() => setIsUserMenuOpen(false)}
        isLoggedIn={isLoggedIn}
      />

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
