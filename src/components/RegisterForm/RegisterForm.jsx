import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/auth/operations.js";
import {
  selectIsLoading,
  selectAuthError,
} from "../../redux/auth/selectors.js";
import css from "./RegisterForm.module.css";

const schema = yup.object().shape({
  name: yup.string().required("Required field"),
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

  return (
    <form className={css.registerForm} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={css.registerTitle}>Registration</h1>
      <p className={css.registerDescription}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information
      </p>

      <input
        className={css.registerInput}
        type="name"
        placeholder="Name"
        {...register("password")}
      />
      <p className={css.registerError}>{errors.name?.message}</p>

      <input
        className={css.registerInput}
        type="email"
        placeholder="Email"
        {...register("email")}
      />
      <p className={css.registerError}>{errors.email?.message}</p>

      <input
        className={css.registerInput}
        type="password"
        placeholder="Password"
        {...register("password")}
      />
      <p className={css.registerError}>{errors.password?.message}</p>

      <button className={css.registerBtn} type="submit" disabled={isLoading}>
        Sign Up
      </button>

      {error && <p className={css.registerError}>{error}</p>}
    </form>
  );
}
