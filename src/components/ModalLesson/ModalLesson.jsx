import BaseModal from "../BaseModal/BaseModal.jsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  selectIsLoading,
  selectAuthError,
} from "../../redux/auth/selectors.js";
import css from "./ModalLesson.module.css";
import { useSelector } from "react-redux";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .required("Required field"),
  email: yup.string().email("Incorrect email").required("Required field"),
  phone: yup.number().min(12).required("Phone number is required"),
  reason: yup.string().required("Please select a reason"), // Add validation for reason
});

export default function ModalLesson({ teacher, onClose }) {
  const error = useSelector(selectAuthError);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <BaseModal onClose={onClose}>
      <div className={css.modalContent}>
        <h1 className={css.modalTitle}>Book Trial Lesson</h1>
        <p className={css.modalDescription}>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>

        <div className={css.modalTeacher}>
          <img
            src={teacher.avatar_url}
            alt={`${teacher.name} ${teacher.surname}`}
            className={css.teacherAvatar}
          />
          <p className={css.modalTeacherName}>
            Your teacher
            <h3 className={css.youTeacher}>
              {teacher.name} {teacher.surname}
            </h3>
          </p>
        </div>

        <h2 className={css.modalTitle2}>
          What is your main reason for learning English?
        </h2>

        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <div className={css.radioGroup}>
            <label>
              <input
                type="radio"
                name="reason"
                value="career"
                {...control.register("reason")}
              />
              Career and business
            </label>

            <label>
              <input
                type="radio"
                name="reason"
                value="lesson"
                {...control.register("reason")}
              />
              Lesson for kids
            </label>

            <label>
              <input
                type="radio"
                name="reason"
                value="livingAbroad"
                {...control.register("reason")}
              />
              Living abroad
            </label>

            <label>
              <input
                type="radio"
                name="reason"
                value="exams"
                {...control.register("reason")}
              />
              Exams and coursework
            </label>

            <label>
              <input
                type="radio"
                name="reason"
                value="culture"
                {...control.register("reason")}
              />
              Culture, travel or hobby
            </label>
          </div>

          {errors.reason && (
            <p className={css.errorMessage}>{errors.reason.message}</p>
          )}

          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              autoComplete="name"
              className={css.input}
            ></input>
            {errors.name && <p className={css.error}>{errors.name}</p>}
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              className={css.input}
            ></input>
            {errors.email && <p className={css.error}>{errors.email}</p>}
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              autoComplete="email"
              className={css.input}
            ></input>
            {errors.phone && <p className={css.error}>{errors.phone}</p>}
          </div>

          <button type="submit" className={css.btnBook}>
            Book
          </button>
        </form>
      </div>
    </BaseModal>
  );
}
