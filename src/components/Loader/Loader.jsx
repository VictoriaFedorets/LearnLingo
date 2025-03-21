import { RotatingLines } from "react-loader-spinner";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.loaderContainer}>
      <div className={css.loader}>
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          strokeColor="#f4c550"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    </div>
  );
}
