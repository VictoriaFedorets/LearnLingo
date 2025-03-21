import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/operations.js";
import { selectIsLoading, selectAuthError } from "../../redux/auth/selectors";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectAuthError);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Log In</h1>
      <p>
        Welcome back! Please enter your credentials to access your account and
        continue your search for an teacher.
      </p>
      <input type="email" placeholder="Email" {...register("email")} />
      <input type="password" placeholder="Password" {...register("password")} />
      <button type="submit" disabled={isLoading}>
        Log In
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}
