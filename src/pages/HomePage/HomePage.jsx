import { Link } from "react-router-dom";
import blockImage from "/assets/images/block.png";
import Statistics from "../../components/Statistics/Statistics";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <section>
      <div className={css.homePageHero}>
        <article className={css.home}>
          <h1 className={css.homeTitle}>
            Unlock your potential with the best{" "}
            <span className={css.homeLanguage}>language</span> tutors
          </h1>
          <p className={css.homeDescription}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>

          <button className={css.homeBtn}>
            <Link to="./teachers">Get started</Link>
          </button>
        </article>
        <img className={css.homeImg} src={blockImage} alt="children" />
      </div>
      <Statistics />
    </section>
  );
}
