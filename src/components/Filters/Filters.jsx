import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useRef } from "react";
import css from "./Filters.module.css";

const schema = yup.object().shape({
  language: yup.string().required("Select a language"),
  level: yup.string().required("Select a level"),
  price: yup.string().required("Select a price"),
});

export default function Filters({ onFilterChange }) {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { language: "", level: "", price: "" },
  });

  const selectedFilters = watch(); // Получаем все значения сразу
  const prevFiltersRef = useRef(selectedFilters);

  useEffect(() => {
    if (
      prevFiltersRef.current.language !== selectedFilters.language ||
      prevFiltersRef.current.level !== selectedFilters.level ||
      prevFiltersRef.current.price !== selectedFilters.price
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
          <option value="french">French</option>
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
          <option value="german">German</option>
          <option value="mandarin">Mandarin Chinese</option>
        </select>
        {errors.language && <p>{errors.language.message}</p>}
      </label>

      <label>
        <p className={css.filterCategory}>Level of knowledge</p>
        <select className={css.filterSelect} {...register("level")}>
          <option value="">Select level</option>
          <option value="beginner">A1 Beginner</option>
          <option value="elementary">A2 Elementary</option>
          <option value="intermediate">B1 Intermediate</option>
          <option value="upperInterm">B2 Upper-Intermediate</option>
          <option value="advanced">C1 Advanced</option>
          <option value="proficient">C2 Proficient</option>
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
