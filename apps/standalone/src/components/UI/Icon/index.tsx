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
