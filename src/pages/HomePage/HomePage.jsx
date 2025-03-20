import { Link } from "react-router-dom";
import css from "./HomePage.module.css";
import Header from "../../components/Header/Header";
import blockImage from "/assets/images/block.png";
import Statistics from "../../components/Statistics/Statistics";

export default function HomePage() {
  return (
    <section className={css.hero}>
      <Header />
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
          <Link to="./teachers" className={css.homeBtn}>
            Get started
          </Link>
        </article>
        <img className={css.homeImg} src={blockImage} alt="children" />
      </div>
      <Statistics />
    </section>
  );
}
