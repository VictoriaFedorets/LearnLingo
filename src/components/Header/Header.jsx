import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useCallback, useState } from "react";
import BaseModal from "../BaseModal/BaseModal.jsx";
import css from "./Header.module.css";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors.js";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/auth/operations.js";

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  // console.log(user);
  const [baseModalState, setbaseModalState] = useState({
    isOpen: false,
    isLogin: true,
  });

  const getNavLinkClass = ({ isActive }) =>
    clsx(css.link, isActive && css.active);

  const openBaseModal = (isLogin) =>
    setbaseModalState({ isOpen: true, isLogin });

  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
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
