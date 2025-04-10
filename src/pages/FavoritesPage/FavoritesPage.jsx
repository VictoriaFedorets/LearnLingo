import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import { loadFavorites } from "../../redux/favorites/slice.js";
import FavoritesList from "../../components/FavoritesList/FavoritesList.jsx";

export default function FavoritesPage() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadFavorites());
    }
  }, [isLoggedIn, dispatch]);

  return <FavoritesList />;
}
