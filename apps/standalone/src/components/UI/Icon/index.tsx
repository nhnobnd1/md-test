import React from "react";
import styles from "./style.module.scss";

export interface IconProps extends React.SVGAttributes<SVGAElement> {
  name?: string;
  width?: string | number;
  height?: string | number;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}

type IconType = {
  [key in string]: any;
};

class Icon extends React.Component<IconProps> {
  icons: IconType = {
    ticketCreated: (
      <svg
        width={this.getProperty("width", "40")}
        height={this.getProperty("height", "40")}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width={this.getProperty("width", "40")}
          height={this.getProperty("height", "40")}
          rx="20"
          fill={this.getProperty("fill", "#FFF3E6")}
        />
        <path
          d="M21.4999 28H14.9949C11.1649 28 10.0949 27.08 10.0049 23.5C10.9314 23.4974 11.8191 23.1274 12.4733 22.4713C13.1275 21.8153 13.4949 20.9265 13.4949 20C13.4949 19.0735 13.1275 18.1847 12.4733 17.5287C11.8191 16.8726 10.9314 16.5026 10.0049 16.5C10.0949 12.92 11.1649 12 14.9949 12H24.9949C28.9949 12 29.9949 13 29.9949 17V19.5"
          stroke={this.getProperty("color", "#FA7D00")}
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 24C32 27.3137 29.3137 30 26 30C22.6863 30 20 27.3137 20 24C20 20.6863 22.6863 18 26 18C29.3137 18 32 20.6863 32 24Z"
          stroke={this.getProperty("color", "#FA7D00")}
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23.8 23.8077H28.4154M26.1077 26.1154V23.8077V21.5"
          stroke={this.getProperty("color", "#FA7D00")}
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.9929 12V15.5"
          stroke={this.getProperty("color", "#FA7D00")}
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.9929 24.5V28"
          stroke={this.getProperty("color", "#FA7D00")}
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    ticketReplied: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="20" fill="#E6F7FF" />
        <path
          d="M21.5 28H14.995C11.165 28 10.095 27.08 10.005 23.5C10.9315 23.4974 11.8192 23.1274 12.4734 22.4713C13.1276 21.8153 13.495 20.9265 13.495 20C13.495 19.0735 13.1276 18.1847 12.4734 17.5287C11.8192 16.8726 10.9315 16.5026 10.005 16.5C10.095 12.92 11.165 12 14.995 12H24.995C28.995 12 29.995 13 29.995 17V19.5"
          stroke="#1890FF"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 24C32 27.3137 29.3137 30 26 30C22.6863 30 20 27.3137 20 24C20 20.6863 22.6863 18 26 18C29.3137 18 32 20.6863 32 24Z"
          stroke="#1890FF"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24.625 25.35C24.266 25.35 23.975 25.641 23.975 26C23.975 26.359 24.266 26.65 24.625 26.65V25.35ZM24 23.15H27.25V21.85H24V23.15ZM27.25 25.35H24.625V26.65H27.25V25.35ZM28.35 24.25C28.35 24.8575 27.8575 25.35 27.25 25.35V26.65C28.5755 26.65 29.65 25.5755 29.65 24.25H28.35ZM27.25 23.15C27.8575 23.15 28.35 23.6425 28.35 24.25H29.65C29.65 22.9245 28.5755 21.85 27.25 21.85V23.15Z"
          fill="#1890FF"
        />
        <path
          d="M25.5 21L24.0707 22.4293C24.0317 22.4683 24.0317 22.5317 24.0707 22.5707L25.5 24"
          stroke="#1890FF"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          d="M16.9929 12V15.5"
          stroke="#1890FF"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.9929 24.5V28"
          stroke="#1890FF"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    ticketClosed: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="20" fill="#FFF1F0" />
        <path
          d="M21.5 28H14.995C11.165 28 10.095 27.08 10.005 23.5C10.9315 23.4974 11.8192 23.1274 12.4734 22.4713C13.1276 21.8153 13.495 20.9265 13.495 20C13.495 19.0735 13.1276 18.1847 12.4734 17.5287C11.8192 16.8726 10.9315 16.5026 10.005 16.5C10.095 12.92 11.165 12 14.995 12H24.995C28.995 12 29.995 13 29.995 17V19.5"
          stroke="#F5222D"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 24C32 27.3137 29.3137 30 26 30C22.6863 30 20 27.3137 20 24C20 20.6863 22.6863 18 26 18C29.3137 18 32 20.6863 32 24Z"
          stroke="#F5222D"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23.8 23.8076H28.4154"
          stroke="#F5222D"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.9929 12V15.5"
          stroke="#F5222D"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.9929 24.5V28"
          stroke="#F5222D"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    firstResponseTime: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="20" fill="#E6F7FF" />
        <path
          d="M20 30C18.2694 30 16.5777 29.4868 15.1388 28.5254C13.6998 27.5639 12.5783 26.1973 11.9161 24.5985C11.2538 22.9996 11.0805 21.2403 11.4181 19.543C11.7558 17.8456 12.5891 16.2865 13.8128 15.0628C15.0365 13.8391 16.5956 13.0058 18.293 12.6681C19.9903 12.3305 21.7496 12.5038 23.3485 13.1661C24.9473 13.8283 26.3139 14.9498 27.2754 16.3888C28.2368 17.8277 28.75 19.5194 28.75 21.25"
          stroke="#1890FF"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23.875 29.35C23.516 29.35 23.225 29.641 23.225 30C23.225 30.359 23.516 30.65 23.875 30.65V29.35ZM23 25.65H27.5V24.35H23V25.65ZM27.5 29.35H23.875V30.65H27.5V29.35ZM29.35 27.5C29.35 28.5217 28.5217 29.35 27.5 29.35V30.65C29.2397 30.65 30.65 29.2397 30.65 27.5H29.35ZM27.5 25.65C28.5217 25.65 29.35 26.4783 29.35 27.5H30.65C30.65 25.7603 29.2397 24.35 27.5 24.35V25.65Z"
          fill="#1890FF"
        />
        <path
          d="M25 23L23.0707 24.9293C23.0317 24.9683 23.0317 25.0317 23.0707 25.0707L25 27"
          stroke="#1890FF"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          d="M20 16V21"
          stroke="#1890FF"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 10H23"
          stroke="#1890FF"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    resolutionTime: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="20" fill="#F6FFED" />
        <path
          d="M20 30C18.2694 30 16.5777 29.4868 15.1388 28.5254C13.6998 27.5639 12.5783 26.1973 11.9161 24.5985C11.2538 22.9996 11.0805 21.2403 11.4181 19.543C11.7558 17.8456 12.5891 16.2865 13.8128 15.0628C15.0365 13.8391 16.5956 13.0058 18.293 12.6681C19.9903 12.3305 21.7496 12.5038 23.3485 13.1661C24.9473 13.8283 26.3139 14.9498 27.2754 16.3888C28.2368 17.8277 28.75 19.5194 28.75 21.25"
          stroke="#389E0D"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23 28L25.128 29.9345C25.1681 29.971 25.2299 29.9689 25.2674 29.9298L30 25"
          stroke="#389E0D"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          d="M20 16V21"
          stroke="#389E0D"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 10H23"
          stroke="#389E0D"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    activities: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22 5C22 5.59334 21.8241 6.17336 21.4944 6.66671C21.1648 7.16006 20.6962 7.54458 20.1481 7.77164C19.5999 7.9987 18.9967 8.05811 18.4147 7.94236C17.8328 7.8266 17.2982 7.54088 16.8787 7.12132C16.4591 6.70176 16.1734 6.16721 16.0576 5.58527C15.9419 5.00333 16.0013 4.40013 16.2284 3.85195C16.4554 3.30377 16.8399 2.83524 17.3333 2.50559C17.8266 2.17595 18.4067 2 19 2C19.7957 2 20.5587 2.31607 21.1213 2.87868C21.6839 3.44129 22 4.20435 22 5Z"
          stroke="#595959"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 13H12"
          stroke="#595959"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 17H16"
          stroke="#595959"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V10"
          stroke="#595959"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    todo: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.91 14.692C18.9132 15.3133 19.1621 15.9082 19.6024 16.3466C20.0427 16.7851 20.6386 17.0315 21.26 17.032C21.26 20.782 20.32 21.722 16.57 21.722H7.19C3.44 21.722 2.5 20.782 2.5 17.032V16.572C3.12245 16.5694 3.71865 16.3209 4.15879 15.8808C4.59893 15.4406 4.84737 14.8444 4.85 14.222C4.84737 13.5995 4.59893 13.0033 4.15879 12.5632C3.71865 12.1231 3.12245 11.8746 2.5 11.872L2.5 11.412C2.51 7.66198 3.44 6.72198 7.19 6.72198H16.56C20.31 6.72198 21.25 7.66198 21.25 11.412V12.352C20.9426 12.3516 20.6381 12.4118 20.3541 12.5293C20.07 12.6468 19.8119 12.8191 19.5945 13.0365C19.3771 13.2538 19.2048 13.512 19.0873 13.796C18.9699 14.0801 18.9096 14.3846 18.91 14.692Z"
          stroke="#595959"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.211 6.72198H7.12097L10.051 3.79198C12.441 1.39998 13.641 1.39998 16.031 3.79298L16.631 4.39298C16.3297 4.69071 16.1277 5.07419 16.0525 5.49103C15.9773 5.90788 16.0327 6.33777 16.211 6.72198Z"
          stroke="#595959"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.87903 6.72302V21.723"
          stroke="#595959"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="5 5"
        />
      </svg>
    ),
  };

  getProperty(property: keyof IconProps, value: any): any {
    const existProp = this.props[property];

    return existProp || value;
  }

  showAll() {
    const icons = Object.keys(this.icons).map((name) => {
      return (
        <div key={name} className={styles.icons__item}>
          <Icon name={name} />
          {name}
        </div>
      );
    });
    return <div className={styles.icons}>{icons}</div>;
  }

  render() {
    return this.icons[this.props?.name || ""];
  }
}
export default Icon;
