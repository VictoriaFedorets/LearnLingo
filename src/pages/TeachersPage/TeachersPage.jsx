import Header from "../../components/Header/Header.jsx";
import TeachersList from "../../components/TeachersList/TeachersList.jsx";
import css from "./TeachersPage.module.css";

export default function TeachersPage() {
  return (
    <div className={css.teachersPage}>
      <Header />
      <section className={css.teachersSection}>
        {/* <Filters /> */}
        <TeachersList />
      </section>
    </div>
  );
}
