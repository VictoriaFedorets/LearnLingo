import { Link } from "react-router-dom";
import yellow1x from "/assets/images/yellow/yellow-theme@1x.png";
import greenImg1x from "/assets/images/green/green-theme@1x.png";
import blueImg1x from "/assets/images/blue/blue-theme@1x.png";
import roseImg1x from "/assets/images/rose/rose-theme@1x.png";
import peachImg1x from "/assets/images/peach/peach-theme@1x.png";
import Statistics from "../../components/Statistics/Statistics";
import css from "./HomePage.module.css";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/themes/selectors";

export default function HomePage() {
  const themeImages = {
    yellow: {
      src: yellow1x,
      srcSet: `
      /assets/images/yellow/yellow-theme@1x.png 1x,
      /assets/images/yellow/yellow-theme@2x.png 2x,
      /assets/images/yellow/yellow-theme@3x.png 3x,
      /assets/images/yellow/yellow-theme@4x.png 4x
    `,
    },
    green: {
      src: greenImg1x,
      srcSet: `
      /assets/images/green/green-theme@1x.png 1x,
      /assets/images/green/green-theme@2x.png 2x,
      /assets/images/green/green-theme@3x.png 3x,
      /assets/images/green/green-theme@4x.png 4x
    `,
    },
    blue: {
      src: blueImg1x,
      srcSet: `
      /assets/images/blue/blue-theme@1x.png 1x,
      /assets/images/blue/blue-theme@2x.png 2x,
      /assets/images/blue/blue-theme@3x.png 3x,
      /assets/images/blue/blue-theme@4x.png 4x
    `,
    },
    rose: {
      src: roseImg1x,
      srcSet: `
      /assets/images/rose/rose-theme@1x.png 1x,
      /assets/images/rose/rose-theme@2x.png 2x,
      /assets/images/rose/rose-theme@3x.png 3x,
      /assets/images/rose/rose-theme@4x.png 4x
    `,
    },
    peach: {
      src: peachImg1x,
      srcSet: `
      /assets/images/peach/peach-theme@1x.png 1x,
      /assets/images/peach/peach-theme@2x.png 2x,
      /assets/images/peach/peach-theme@3x.png 3x,
      /assets/images/peach/peach-theme@4x.png 4x
    `,
    },
  };

  const currentTheme = useSelector(selectTheme);

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

          <Link className={css.homeBtn} to="/teachers">
            Get started
          </Link>
        </article>
        <img
          className={css.homeImg}
          src={themeImages[currentTheme].src}
          srcSet={themeImages[currentTheme].srcSet}
          alt="children"
        />
      </div>
      <Statistics />
    </section>
  );
}
