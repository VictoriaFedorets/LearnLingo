import * as yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/auth/operations.js";
import {
  selectIsLoading,
  selectAuthError,
} from "../../redux/auth/selectors.js";
import css from "./RegisterForm.module.css";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .required("Required field"),
  email: yup.string().email("Incorrect email").required("Required field"),
  password: yup
    .string()
    .min(6, "The password must contain at least 6 characters.")
    .required("Required field"),
});

export default function RegisterForm() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectAuthError);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className={css.registerForm} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={css.registerTitle}>Registration</h1>
      <p className={css.registerDescription}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information
      </p>

      <input
        className={css.registerInput}
        type="text"
        placeholder="Name"
        autoComplete="name"
        {...register("name")}
        aria-describedby="name-error"
      />
      <p className={css.registerError} id="name-error">
        {errors.name?.message}
      </p>

      <input
        className={css.registerInput}
        type="email"
        placeholder="Email"
        autoComplete="email"
        {...register("email")}
        aria-describedby="email-error"
      />
      <p className={css.registerError} id="email-error">
        {errors.email?.message}
      </p>

      <div className={css.inputEmail}>
        <input
          className={css.registerInput}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          autoComplete="password"
          {...register("password")}
          aria-describedby="password-error"
        />
        <svg
          className={css.icon}
          onClick={(e) => {
            e.preventDefault();
            togglePasswordVisibility();
          }}
        >
          <use
            href={`./assets/icons/symbol-defs.svg#${
              showPassword ? "icon-eye-on" : "icon-eye-off"
            }`}
          />
        </svg>
      </div>
      <p className={css.registerError} id="password-error">
        {errors.password?.message}
      </p>

      <button className={css.registerBtn} type="submit" disabled={isLoading}>
        {isLoading ? "Registration..." : "Sign Up"}
      </button>

      {/* {error && <p className={css.registerError}>{error}</p>} */}
    </form>
  );
}
