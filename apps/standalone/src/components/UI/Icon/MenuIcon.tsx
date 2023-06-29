import "./menuIcon.scss";
interface IProps {
  visible: boolean;
}
export const MenuIcon = ({ visible }: IProps) => {
  return (
    <div id="nav-md-icon" className={visible ? "open-menu" : ""}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
