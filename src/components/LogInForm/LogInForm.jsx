import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { loginUser } from "../../redux/auth/operations.js";
import { selectIsLoading, selectAuthError } from "../../redux/auth/selectors";
import css from "./LogInForm.module.css";

const schema = yup.object().shape({
  email: yup.string().email("Incorrect email").required("Required field"),
  password: yup.string().required("Required field"),
});

export default function LoginForm() {
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
    dispatch(loginUser(data));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className={css.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={css.loginTitle}>Log In</h1>
      <p className={css.loginDescription}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for an teacher.
      </p>

      <input
        className={css.loginInput}
        type="email"
        placeholder="Email"
        autoComplete="email"
        {...register("email")}
      />
      <p className={css.loginError}>{errors.email?.message}</p>

      <div className={css.inputEmail}>
        <input
          className={css.loginInput}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          autoComplete="password"
          {...register("password")}
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
      <p className={css.loginError}>{errors.password?.message}</p>

      <button className={css.loginBtn} type="submit" disabled={isLoading}>
        Log In
      </button>
      {error && <p className={css.loginError}>{error}</p>}
    </form>
  );
}
