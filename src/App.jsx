import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "./redux/auth/operations.js";
import { selectIsLoggedIn, selectIsLoading } from "./redux/auth/selectors.js";
import { resetAuthState } from "./redux/auth/slice.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";

import Loader from "./components/Loader/Loader.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
import PrivateRoute from "./components/Routes/PrivateRoute";
import RestrictedRoute from "./components/Routes/RestrictedRoute.jsx";
import { ToastContainer } from "react-toastify";

import Header from "./components/Header/Header.jsx";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const TeachersPage = lazy(() =>
  import("./pages/TeachersPage/TeachersPage.jsx")
);
const FavoritesPage = lazy(() =>
  import("./pages/FavoritesPage/FavoritesPage.jsx")
);
const LoginForm = lazy(() => import("./components/LogInForm/LogInForm.jsx"));
const RegisterForm = lazy(() =>
  import("./components/RegisterForm/RegisterForm.jsx")
);

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsLoading);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(refreshUser());
      } else {
        dispatch(resetAuthState());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (isRefreshing) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={3}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
      />
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teachers" element={<TeachersPage />} />

        <Route
          path="/login"
          element={<RestrictedRoute component={<LoginForm />} redirectTo="/" />}
        />
        <Route
          path="/register"
          element={
            <RestrictedRoute component={<RegisterForm />} redirectTo="/" />
          }
        />

        <Route
          path="/favorites"
          element={
            <PrivateRoute redirectTo="/" component={<FavoritesPage />} />
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ScrollToTop />
    </Suspense>
  );
}
