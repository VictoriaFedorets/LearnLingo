import { useLocation } from "react-router-dom";
import Header from "../Header/Header.jsx";
import css from "./SharedLayout.module.css";

export default function SharedLayout({ children }) {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const containerClass = isHomePage
    ? `${css.container} ${css.homeBackground}`
    : css.container;

  return (
    <div className={containerClass}>
      <Header />
      <main className={css.section}>{children}</main>
    </div>
  );
}
