import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { loginUser } from "../../redux/auth/operations.js";
import { selectIsLoading, selectAuthError } from "../../redux/auth/selectors";
import css from "./LogInForm.module.css";

const schema = yup.object().shape({
  email: yup.string().email("Incorrect email").required("Required field"),
  password: yup.string().required("Required field"),
});

export default function LoginForm({ onClose }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectAuthError);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData,
  });

  useEffect(() => {
    if (error) {
      setValue("email", formData.email);
      setValue("password", formData.password);
    }
  }, [error, formData, setValue]);

  const onSubmit = async (data) => {
    try {
      setFormData(data);
      const resultAction = await dispatch(loginUser(data));

      if (loginUser.fulfilled.match(resultAction)) {
        onClose();
      } else {
        toast.error("Email or password failed");
      }
    } catch (error) {
      toast.error("Unexpected error occurred");
    }
  };

  return (
    <form className={css.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={css.loginTitle}>Log In</h1>
      <p className={css.loginDescription}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for a teacher.
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
          type="password"
          placeholder="Password"
          autoComplete="password"
          {...register("password")}
        />
      </div>
      <p className={css.loginError}>{errors.password?.message}</p>

      <button className={css.loginBtn} type="submit" disabled={isLoading}>
        Log In
      </button>
      {/* {error && <p className={css.loginError}>{error}</p>} */}
    </form>
  );
}
