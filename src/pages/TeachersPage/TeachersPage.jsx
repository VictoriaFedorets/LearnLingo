import Header from "../../components/Header/Header.jsx";
import TeachersList from "../../components/TeachersList/TeachersList.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import css from "./TeachersPage.module.css";
import { useState } from "react";

export default function TeachersPage() {
  const [filters, setFilters] = useState({
    language: "",
    level: "",
    price: "",
  });
  return (
    <div className={css.teachersPage}>
      <Header />
      <section className={css.teachersSection}>
        <Filters onFilterChange={setFilters} />
        <TeachersList filters={filters} />
      </section>
    </div>
  );
}
