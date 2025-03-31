import FavoritesList from "../../components/FavoritesList/FavoritesList.jsx";
import Header from "../../components/Header/Header.jsx";
import css from "./FavoritesPage.module.css";

export default function FavoritesPage() {
  return (
    <div className={css.teachersPage}>
      <Header />
      <section className={css.teachersSection}>
        <FavoritesList />
      </section>
    </div>
  );
}
