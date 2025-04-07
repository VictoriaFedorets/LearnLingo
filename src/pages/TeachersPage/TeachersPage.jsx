import { useState } from "react";
import TeachersList from "../../components/TeachersList/TeachersList.jsx";
import Filters from "../../components/Filters/Filters.jsx";

export default function TeachersPage() {
  const [filters, setFilters] = useState({
    language: "",
    level: "",
    price: "",
  });
  return (
    <>
      <Filters onFilterChange={setFilters} />
      <TeachersList filters={filters} />
    </>
  );
}
