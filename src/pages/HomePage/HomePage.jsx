import { Link } from "react-router-dom";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <section className={css.homePage}>
      {/* <Header/> */}
      <div className={css.home}>
        <h1 className={css.homeTitle}>
          Unlock your potential with the best{" "}
          <span className={css.homeLanguage}>language</span> tutors
        </h1>
        <p className={css.homeDescription}>
          Embark on an Exciting Language Journey with Expert Language Tutors:
          Elevate your language proficiency to new heights by connecting with
          highly qualified and experienced tutors.
        </p>
        <Link to="./teachers" className={css.homeBtn}>
          Get started
        </Link>
      </div>
      <img
        className={css.homeImg}
        src="../../../public/images/block.png"
        alt="children"
      />
    </section>
  );
}
