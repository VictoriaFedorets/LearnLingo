import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/operations.js";
import { selectIsLoading, selectAuthError } from "../../redux/auth/selectors";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import css from "./LogInForm.module.css";

const schema = yup.object().shape({
  email: yup.string().email("Incorrect email").required("Required field"),
  password: yup.string().required("Required field"),
});

export default function LoginForm() {
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
    dispatch(loginUser(data));
  };

  return (
    <form className={css.registerForm} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={css.registerTitle}>Log In</h1>
      <p className={css.registerDescription}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for an teacher.
      </p>

      <input
        className={css.registerInput}
        type="email"
        placeholder="Email"
        {...register("email")}
      />
      <p className={css.registerError}>{errors.name?.message}</p>

      <input
        className={css.registerInput}
        type="password"
        placeholder="Password"
        {...register("password")}
      />
      <p className={css.registerError}>{errors.name?.message}</p>

      <button className={css.registerBtn} type="submit" disabled={isLoading}>
        Log In
      </button>
      {error && <p className={css.registerError}>{error}</p>}
    </form>
  );
}
