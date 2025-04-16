import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/themes/slice.js";
import { selectTheme } from "../../redux/themes/selectors.js";
import { PaintbrushVertical } from "lucide-react";
import css from "./Themes.module.css";

const themesList = ["yellow", "green", "blue", "rose", "peach"];

export default function Themes() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);

  const handleThemeClick = (theme) => {
    dispatch(setTheme(theme));
    setIsOpen(false);
  };

  return (
    <div className={css.container}>
      <button onClick={() => setIsOpen((prev) => !prev)} className={css.themes}>
        <PaintbrushVertical size={24} />
      </button>

      {isOpen && (
        <div className={css.panel}>
          {themesList.map((theme) => (
            <div
              key={theme}
              className={`${css.circle} ${css[theme]} ${
                currentTheme === theme ? css.active : ""
              }`}
              onClick={() => handleThemeClick(theme)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
