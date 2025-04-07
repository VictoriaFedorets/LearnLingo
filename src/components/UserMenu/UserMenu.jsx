import css from "./UserMenu.module.css";

export default function UserMenu({
  user,
  openBaseModal,
  handleLogout,
  isLoggedIn,
  onClose,
  isOpen,
}) {
  if (!isOpen) return null;

  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.menu} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={onClose}>
          <svg className={css.iconClose}>
            <use href="/assets/icons/symbol-defs.svg#icon-x"></use>
          </svg>
        </button>

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
                onClick={() => {
                  openBaseModal(true);
                  onClose();
                }}
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
                onClick={() => {
                  openBaseModal(false);
                  onClose();
                }}
              >
                Registration
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
