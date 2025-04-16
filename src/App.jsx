import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "./redux/auth/operations.js";
import { selectIsLoggedIn, selectIsLoading } from "./redux/auth/selectors.js";
import { resetAuthState } from "./redux/auth/slice.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import { selectTheme } from "./redux/themes/selectors.js";

import Loader from "./components/Loader/Loader.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
import PrivateRoute from "./components/Routes/PrivateRoute";
import RestrictedRoute from "./components/Routes/RestrictedRoute.jsx";
import SharedLayout from "./components/SharedLayout/SharedLayout.jsx";
import Themes from "./components/Themes/Themes.jsx";

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
  const theme = useSelector(selectTheme);

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

  useEffect(() => {
    document.body.classList.remove("yellow", "green", "blue", "rose", "peach");
    document.body.classList.add(theme);
  }, [theme]);

  if (isRefreshing) {
    return <Loader />;
  }

  return (
    <SharedLayout>
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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teachers" element={<TeachersPage />} />

          <Route
            path="/login"
            element={
              <RestrictedRoute component={<LoginForm />} redirectTo="/" />
            }
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
        <Themes />
        <ScrollToTop />
      </Suspense>
    </SharedLayout>
  );
}
