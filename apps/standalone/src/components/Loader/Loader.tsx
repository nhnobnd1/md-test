import icon from "src/assets/images/logo/logo.png";
import "./loader.scss";
export const Loader = () => {
  return (
    <div className="container-loader">
      <div className="centerBlock">
        <img src={icon} alt="icon" />
        <div className="loading loadingText">
          <span>M</span>
          <span>O</span>
          <span>O</span>
          <span>S</span>
          <span>E</span>
          <span>D</span>
          <span>E</span>
          <span>S</span>
          <span>K</span>
        </div>
      </div>
      {/* <div className="custom-loader"></div> */}
    </div>
  );
};
