import { toast } from "react-toastify";
import BaseModal from "../BaseModal/BaseModal.jsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import css from "./ModalLesson.module.css";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .required("Required field"),
  email: yup.string().email("Incorrect email").required("Required field"),
  phone: yup
    .string()
    .matches(/^\d{10,15}$/, "Invalid phone number")
    .required("Phone number is required"),
  reason: yup.string().required("Please select a reason"),
});

export default function ModalLesson({ teacher, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);

    toast.success("Your request has been sent successfully!");

    reset();
    onClose();
  };

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
            alt={`${teacher?.name || "Unknown"} ${teacher?.surname || ""}`}
            className={css.teacherAvatar}
          />
          <div>
            <p className={css.modalTeacherName}>Your teacher</p>
            <h3 className={css.youTeacher}>
              {teacher.name} {teacher.surname}
            </h3>
          </div>
        </div>

        <h2 className={css.modalTitle2}>
          What is your main reason for learning English?
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={css.radioGroup}>
            <label>
              <input type="radio" value="career" {...register("reason")} />
              Career and business
            </label>
            <label>
              <input type="radio" value="lesson" {...register("reason")} />
              Lesson for kids
            </label>
            <label>
              <input
                type="radio"
                value="livingAbroad"
                {...register("reason")}
              />
              Living abroad
            </label>
            <label>
              <input type="radio" value="exams" {...register("reason")} />
              Exams and coursework
            </label>
            <label>
              <input type="radio" value="culture" {...register("reason")} />
              Culture, travel or hobby
            </label>
            {errors.reason && (
              <p className={css.errorMessage}>{errors.reason.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Full Name"
              autoComplete="name"
              className={css.input}
              {...register("name")}
            />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}

            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              className={css.input}
              {...register("email")}
            />
            {errors.email && (
              <p className={css.error}>{errors.email.message}</p>
            )}

            <input
              type="tel"
              placeholder="Phone number"
              autoComplete="tel"
              className={css.input}
              {...register("phone")}
            />
            {errors.phone && (
              <p className={css.error}>{errors.phone.message}</p>
            )}
          </div>

          <button type="submit" className={css.btnBook}>
            Book
          </button>
        </form>
      </div>
    </BaseModal>
  );
}
