import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectTeachers } from "../../redux/teachers/selectors.js";
import css from "./Filters.module.css";

const schema = yup.object().shape({
  language: yup.string().required("Select a language"),
  level: yup.string().required("Select a level"),
  price: yup.string().required("Select a price"),
});

const getUniqueValues = (data, key) => {
  return [...new Set(data.flatMap((item) => item[key]))];
};

export default function Filters({ onFilterChange }) {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { language: "", level: "", price: "" },
  });

  const selectedFilters = watch(); // Отримуємо всі значення одразу
  const prevFiltersRef = useRef(selectedFilters);
  const teachers = useSelector(selectTeachers);

  const uniqueLanguages = useMemo(
    () => getUniqueValues(teachers, "languages"),
    [teachers]
  );
  const uniqueLevels = useMemo(
    () => getUniqueValues(teachers, "levels"),
    [teachers]
  );
  // const uniquePrice = useMemo(
  //   () => getUniqueValues(teachers, "price_per_hour").sort((a, b) => a - b),
  //   [teachers]
  // );

  useEffect(() => {
    const { language, level, price } = selectedFilters;
    const prev = prevFiltersRef.current;

    if (
      prev.language !== language ||
      prev.level !== level ||
      prev.price !== price
    ) {
      onFilterChange(selectedFilters);
      prevFiltersRef.current = selectedFilters; // Зберігаємо поточні фільтри для порівняння наступного разу
    }
  }, [selectedFilters, onFilterChange]);

  return (
    <form className={css.filterForm}>
      <label>
        <p className={css.filterCategory}>Languages</p>
        <select className={css.filterSelect} {...register("language")}>
          <option value="">Select language</option>
          {uniqueLanguages.map((lang) => (
            <option key={lang} value={lang.toLowerCase()}>
              {lang}
            </option>
          ))}
        </select>
        {errors.language && <p>{errors.language.message}</p>}
      </label>

      <label>
        <p className={css.filterCategory}>Level of knowledge</p>
        <select className={css.filterSelect} {...register("level")}>
          <option value="">Select level</option>
          {uniqueLevels.map((level) => (
            <option key={level} value={level.toLowerCase()}>
              {level}
            </option>
          ))}
        </select>
        {errors.level && <p>{errors.level.message}</p>}
      </label>

      <label>
        <p className={css.filterCategory}>Price</p>
        <select className={css.filterSelect} {...register("price")}>
          <option value="">Select price</option>
          <option value="10">10 $</option>
          <option value="20">20 $</option>
          <option value="30">30 $</option>
          <option value="40">40 $</option>
        </select>
        {errors.price && <p>{errors.price.message}</p>}
      </label>
    </form>
  );
}
