import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/auth/operations.js";
import {
  selectIsLoading,
  selectAuthError,
} from "../../redux/auth/selectors.js";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Registration</h1>

      <input type="name" placeholder="Name" {...register("password")} />
      <p>{errors.name?.message}</p>

      <input type="email" placeholder="Email" {...register("email")} />
      <p>{errors.email?.message}</p>

      <input type="password" placeholder="Password" {...register("password")} />
      <p>{errors.password?.message}</p>

      <button type="submit" disabled={isLoading}>
        Sign Up
      </button>

      {error && <p>{error}</p>}
    </form>
  );
}
