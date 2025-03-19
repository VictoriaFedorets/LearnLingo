import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Loader from "./components/Loader/Loader.jsx";
// import SharedLayout from "./components/SharedLayout/SharedLayout.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
import "./App.css";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
// const CatalogPage = lazy(() => import("./pages/TeachersPage/TeachersPage.jsx"));

export default function App() {
  return (
    // <SharedLayout>
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/teachers" element={<TeachersPage />} /> */}

          {/* <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/catalog/:id" element={<DetailsPage />}>
            <Route index element={<Navigate to="features" />} />
            <Route path="features" element={<Features />} />
            <Route path="reviews" element={<Reviews />} />
          </Route> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ScrollToTop />
      </Suspense>
    </Router>
    // </SharedLayout>
  );
}
