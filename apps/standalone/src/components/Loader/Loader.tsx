import icon from "src/assets/images/logo/logoBase.svg";
import "./loader.scss";
export const Loader = () => {
  return (
    <div className="container-loader">
      <img src={icon} alt="icon" />
      <div className="custom-loader"></div>
    </div>
  );
};
