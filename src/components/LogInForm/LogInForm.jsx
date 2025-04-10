import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { auth } from "../../../firebase.js";
import { selectIsLoading, selectAuthError } from "../../redux/auth/selectors";
import css from "./LogInForm.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";

const schema = yup.object().shape({
  email: yup.string().email("Incorrect email").required("Required field"),
  password: yup.string().required("Required field"),
});

export default function LoginForm({ onClose }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectAuthError);
  const [showPassword, setShowPassword] = useState(false);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      onClose();
    } catch (error) {
      let errorMessage = "An unknown error occurred";

      if (error.code === "auth/invalid-credential") {
        errorMessage = "Invalid email or password";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "No user found with this email.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password";
      }

      toast.error(errorMessage);
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
      {/* {error && <p className={css.loginError}>{error}</p>} */}
    </form>
  );
}
