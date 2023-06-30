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
    search: (
      <svg
        width={19}
        height={18}
        viewBox="0 0 19 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_180039_37110)">
          <rect
            width={18}
            height={18}
            transform="translate(0.00170898 0.000488281)"
            fill="white"
            fillOpacity={0.01}
          />
          <path
            d="M15.7517 8.62549C15.7517 10.0347 15.3338 11.4122 14.5509 12.5839C13.768 13.7556 12.6553 14.6689 11.3533 15.2081C10.0514 15.7474 8.61881 15.8885 7.23669 15.6136C5.85458 15.3387 4.58503 14.6601 3.58858 13.6636C2.59213 12.6672 1.91354 11.3976 1.63862 10.0155C1.3637 8.63339 1.5048 7.20079 2.04407 5.89887C2.58334 4.59695 3.49657 3.48417 4.66827 2.70127C5.83997 1.91836 7.21752 1.50049 8.62671 1.50049C10.5164 1.50049 12.3287 2.25116 13.6648 3.58735C15.001 4.92355 15.7517 6.73582 15.7517 8.62549V8.62549Z"
            stroke="#595959"
            strokeWidth={1.3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.5017 16.5005L15.0017 15.0005"
            stroke="#595959"
            strokeWidth={1.3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_180039_37110">
            <rect
              width={18}
              height={18}
              fill="white"
              transform="translate(0.00170898 0.000488281)"
            />
          </clipPath>
        </defs>
      </svg>
    ),
    add: (
      <svg
        width={18}
        height={18}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.5 9H13.5"
          stroke="white"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 13.5V4.5"
          stroke="white"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    edit: (
      <svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.05 2.99987L4.20833 10.2415C3.92083 10.5829 3.72827 10.9939 3.65 11.4332L3.34167 14.134C3.30124 14.344 3.3144 14.5608 3.37991 14.7644C3.44542 14.968 3.56117 15.1517 3.71648 15.2987C3.87179 15.4457 4.06164 15.5512 4.2685 15.6055C4.47535 15.6597 4.69254 15.6609 4.9 15.609L7.58333 15.1507C8.02028 15.0548 8.42158 14.8382 8.74166 14.5257L15.5833 7.28404C16.7667 6.03404 17.3 4.60904 15.4583 2.86737C13.625 1.14154 12.2333 1.74987 11.05 2.99987Z"
          stroke="#1890FF"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.90833 4.2085C10.083 5.32587 10.6238 6.35361 11.4458 7.13037C12.2678 7.90713 13.3245 8.38894 14.45 8.50016"
          stroke="#1890FF"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.5 18.3335H17.5"
          stroke="#1890FF"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    delete: (
      <svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.5 4.98356C14.725 4.70856 11.9333 4.56689 9.15 4.56689C7.49685 4.56705 5.84475 4.65049 4.2 4.81689L2.5 4.98356"
          stroke="#FF4D4F"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.08331 4.1415L7.26665 3.04984C7.39998 2.25817 7.49998 1.6665 8.90831 1.6665H11.0916C12.5 1.6665 12.6083 2.2915 12.7333 3.05817L12.9166 4.1415"
          stroke="#FF4D4F"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.7084 7.6167L15.1667 16.0084C15.075 17.3167 15 18.3334 12.675 18.3334H7.32502C5.00002 18.3334 4.92502 17.3167 4.83335 16.0084L4.29169 7.6167"
          stroke="#FF4D4F"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.60834 13.75H11.3833"
          stroke="#FF4D4F"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.91669 10.4165H12.0834"
          stroke="#FF4D4F"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    close: (
      <svg
        width={24}
        height={25}
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.7071 5.6928C19.0976 6.08332 19.0976 6.71648 18.7071 7.10701L6.70711 19.107C6.31658 19.4975 5.68342 19.4975 5.29289 19.107C4.90237 18.7165 4.90237 18.0833 5.29289 17.6928L17.2929 5.6928C17.6834 5.30227 18.3166 5.30227 18.7071 5.6928Z"
          fill="#BFBFBF"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.29289 5.6928C5.68342 5.30227 6.31658 5.30227 6.70711 5.6928L18.7071 17.6928C19.0976 18.0833 19.0976 18.7165 18.7071 19.107C18.3166 19.4975 17.6834 19.4975 17.2929 19.107L5.29289 7.10701C4.90237 6.71648 4.90237 6.08332 5.29289 5.6928Z"
          fill="#BFBFBF"
        />
      </svg>
    ),
    filter: (
      <svg
        width={20}
        height={20}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_180043_10518)">
          <path
            d="M3.60001 1.40039H12.4C12.7533 1.40145 13.0918 1.54226 13.3417 1.79208C13.5915 2.0419 13.7323 2.38043 13.7333 2.73372V4.20039C13.6946 4.77309 13.4591 5.31479 13.0667 5.73372L10.2 8.26706C9.99301 8.46585 9.8275 8.70374 9.71307 8.96694C9.59864 9.23014 9.53755 9.51342 9.53334 9.80039V12.6671C9.5244 12.8888 9.46585 13.1057 9.36202 13.3018C9.25818 13.498 9.1117 13.6683 8.93334 13.8004L8.00001 14.4004C7.79594 14.525 7.56258 14.5936 7.32352 14.5992C7.08445 14.6048 6.84814 14.5472 6.63847 14.4322C6.4288 14.3172 6.25318 14.149 6.12937 13.9444C6.00556 13.7398 5.93794 13.5061 5.93335 13.2671V9.73372C5.89815 9.22453 5.71253 8.73727 5.40001 8.33372L2.86668 5.66706C2.52119 5.30356 2.30961 4.83337 2.26668 4.33372V2.80039C2.26045 2.62045 2.29019 2.44108 2.35416 2.27278C2.41813 2.10448 2.51503 1.95063 2.6392 1.82025C2.76337 1.68988 2.91231 1.58558 3.07729 1.51349C3.24227 1.44139 3.41998 1.40294 3.60001 1.40039V1.40039Z"
            stroke="#595959"
            strokeWidth={1.3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.28667 1.40039L4 6.66706"
            stroke="#595959"
            strokeWidth={1.3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_180043_10518">
            <rect width={16} height={16} fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    back: (
      <svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.97501 4.94141L2.91667 9.99974L7.97501 15.0581"
          stroke="#595959"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.0833 10H3.05832"
          stroke="#595959"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    calendar: (
      <svg
        width={18}
        height={18}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 1.5V3.75"
          stroke="#BFBFBF"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 1.5V3.75"
          stroke="#BFBFBF"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.625 6.81738H15.375"
          stroke="#BFBFBF"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.75 6.375V12.75C15.75 15 14.625 16.5 12 16.5H6C3.375 16.5 2.25 15 2.25 12.75V6.375C2.25 4.125 3.375 2.625 6 2.625H12C14.625 2.625 15.75 4.125 15.75 6.375Z"
          stroke="#BFBFBF"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.00082 10.2749H8.99707H12.75"
          stroke="#BFBFBF"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.00082 12.75H8.99707H12.75"
          stroke="#BFBFBF"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.22119 10.2749H6.22494"
          stroke="#BFBFBF"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.22119 12.75H6.22494"
          stroke="#BFBFBF"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    email: (
      <svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.167 2.91663H5.83366C3.33366 2.91663 1.66699 4.16663 1.66699 7.08329V12.9166C1.66699 15.8333 3.33366 17.0833 5.83366 17.0833H14.167C16.667 17.0833 18.3337 15.8333 18.3337 12.9166V7.08329C18.3337 4.16663 16.667 2.91663 14.167 2.91663ZM14.5587 7.99163L11.9503 10.075C11.3899 10.502 10.7049 10.7332 10.0003 10.7332C9.29579 10.7332 8.61073 10.502 8.05033 10.075L5.44199 7.99163C5.31431 7.88591 5.23257 7.73483 5.21392 7.57012C5.19528 7.40541 5.24118 7.23988 5.34199 7.10829C5.44486 6.97913 5.59476 6.89606 5.75881 6.87732C5.92286 6.85857 6.08764 6.90567 6.21699 7.00829L8.82533 9.09163C9.16543 9.33941 9.57537 9.47291 9.99616 9.47291C10.417 9.47291 10.8269 9.33941 11.167 9.09163L13.7753 7.00829C13.8389 6.95641 13.9123 6.91779 13.991 6.89469C14.0698 6.87159 14.1524 6.8645 14.2339 6.87382C14.3155 6.88314 14.3943 6.90868 14.4658 6.94895C14.5373 6.98922 14.6001 7.0434 14.6503 7.10829C14.7542 7.23805 14.8027 7.40346 14.7856 7.56875C14.7684 7.73405 14.6869 7.88595 14.5587 7.99163Z"
          fill="black"
          fillOpacity={0.45}
        />
      </svg>
    ),
    phone: (
      <svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.20875 12.4583L7.66708 14C7.51205 14.1563 7.30146 14.2449 7.0813 14.2465C6.86115 14.248 6.64932 14.1624 6.49208 14.0083C6.40042 13.9166 6.30875 13.8333 6.21708 13.7416C5.37439 12.8933 4.59717 11.9824 3.89208 11.0166C3.2445 10.1326 2.69672 9.17953 2.25875 8.17497C1.88472 7.31423 1.68368 6.38832 1.66708 5.44997C1.6635 4.89963 1.76533 4.35368 1.96708 3.84164C2.17904 3.31224 2.50644 2.8368 2.92542 2.44997C3.14723 2.21007 3.41493 2.01713 3.71267 1.88258C4.0104 1.74802 4.33212 1.67459 4.65875 1.66664C4.89212 1.66571 5.12274 1.71696 5.33375 1.81664C5.55884 1.91852 5.75188 2.07987 5.89208 2.2833L7.82542 5.00831C7.95913 5.18894 8.07101 5.38474 8.15875 5.59164C8.23112 5.75162 8.27079 5.92445 8.27542 6.09997C8.27306 6.3096 8.21247 6.51445 8.10042 6.69164C7.9719 6.90876 7.81496 7.10774 7.63375 7.2833L7.00042 7.94164C6.9563 7.98492 6.92167 8.03691 6.89872 8.09429C6.87576 8.15167 6.86499 8.2132 6.86708 8.27497C6.86719 8.33967 6.87559 8.40408 6.89208 8.46664C6.91708 8.5333 6.94208 8.5833 6.95875 8.6333C7.18253 9.01273 7.44204 9.36991 7.73375 9.69997C8.10875 10.1333 8.50875 10.575 8.94208 11.0166C9.02542 11.1 9.11708 11.1833 9.20042 11.2666C9.28033 11.3437 9.34405 11.4359 9.38782 11.538C9.4316 11.64 9.45455 11.7497 9.45532 11.8607C9.4561 11.9717 9.43469 12.0818 9.39234 12.1844C9.35 12.287 9.28758 12.3801 9.20875 12.4583Z"
          fill="black"
          fillOpacity={0.45}
        />
        <path
          d="M18.3083 15.275C18.3074 15.5165 18.2651 15.756 18.1833 15.9833C18.1591 16.0514 18.1313 16.1181 18.1 16.1833C17.9545 16.4933 17.7635 16.7797 17.5333 17.0333C17.158 17.4602 16.6908 17.7965 16.1667 18.0166C16.1583 18.0166 16.15 18.025 16.1417 18.025C15.6335 18.2309 15.09 18.3357 14.5417 18.3333C13.6043 18.3159 12.6802 18.109 11.825 17.725C10.8102 17.285 9.84848 16.7315 8.95833 16.075C8.63333 15.8333 8.30833 15.5916 8 15.3333L10.725 12.6083C10.9198 12.7576 11.1259 12.8913 11.3417 13.0083C11.3833 13.025 11.4333 13.05 11.4917 13.075C11.5585 13.0988 11.6291 13.1101 11.7 13.1083C11.7637 13.1097 11.8269 13.0978 11.8858 13.0734C11.9446 13.0491 11.9977 13.0127 12.0417 12.9666L12.675 12.3416C12.8506 12.157 13.0529 11.9997 13.275 11.875C13.4517 11.7619 13.6569 11.7012 13.8667 11.7C14.0416 11.7024 14.2143 11.7392 14.375 11.8083C14.5802 11.8961 14.7757 12.005 14.9583 12.1333L17.7167 14.0916C17.9168 14.2225 18.0757 14.4074 18.175 14.625C18.2615 14.8308 18.3068 15.0517 18.3083 15.275Z"
          fill="black"
          fillOpacity={0.45}
        />
      </svg>
    ),
    findOrder: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 5H20"
          stroke="#595959"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 8H17"
          stroke="#595959"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 11.5C21 13.3789 20.4428 15.2156 19.399 16.7779C18.3551 18.3402 16.8714 19.5578 15.1355 20.2769C13.3996 20.9959 11.4895 21.184 9.64665 20.8175C7.80383 20.4509 6.11109 19.5461 4.78249 18.2175C3.45389 16.8889 2.5491 15.1962 2.18254 13.3534C1.81598 11.5105 2.00412 9.60041 2.72315 7.86451C3.44218 6.12861 4.65982 4.64491 6.22209 3.60104C7.78435 2.55717 9.62108 2 11.5 2"
          stroke="#595959"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 22L20 20"
          stroke="#595959"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    menu: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 6H21"
          stroke="#8C8C8C"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <path
          d="M3 12H21"
          stroke="#8C8C8C"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <path
          d="M3 18H21"
          stroke="#8C8C8C"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </svg>
    ),
    logout: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.44 14.62L20 12.06L17.44 9.5"
          stroke="#595959"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.76001 12.06H19.93"
          stroke="#595959"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.76 20C10.6962 20.0497 9.63378 19.8768 8.64066 19.4924C7.64753 19.108 6.7456 18.5204 5.99257 17.7674C5.23955 17.0144 4.65202 16.1125 4.26758 15.1193C3.88314 14.1262 3.71026 13.0638 3.76 12C3.71026 10.9362 3.88314 9.87377 4.26758 8.88065C4.65202 7.88752 5.23955 6.98559 5.99257 6.23256C6.7456 5.47954 7.64753 4.89201 8.64066 4.50757C9.63378 4.12313 10.6962 3.95025 11.76 3.99999"
          stroke="#595959"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    home: (
      <svg
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.71339 1.87999L2.0934 5.57999C1.82282 5.82035 1.61426 6.12247 1.48543 6.46068C1.3566 6.79889 1.3113 7.1632 1.35339 7.52266L2.24006 12.8293C2.33359 13.3024 2.58511 13.7296 2.95335 14.0409C3.3216 14.3522 3.78471 14.5291 4.26673 14.5427H11.7314C12.2128 14.5269 12.6747 14.3492 13.0425 14.0382C13.4103 13.7273 13.6624 13.3013 13.7581 12.8293L14.6447 7.52266C14.6833 7.16383 14.6363 6.80098 14.5077 6.46379C14.3791 6.12661 14.1725 5.82466 13.9047 5.58266L9.28673 1.88666C8.91589 1.60815 8.46494 1.45702 8.00117 1.45582C7.5374 1.45462 7.08567 1.60341 6.71339 1.87999V1.87999Z"
          stroke="black"
          strokeOpacity={0.85}
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.58667 9.58742C6.76908 9.39622 6.98838 9.24402 7.23131 9.14003C7.47424 9.03604 7.73575 8.98242 8 8.98242C8.26426 8.98242 8.52576 9.03604 8.76869 9.14003C9.01162 9.24402 9.23093 9.39622 9.41334 9.58742"
          stroke="black"
          strokeOpacity={0.85}
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.8267 8.17336C10.4832 7.83581 10.0869 7.55658 9.65342 7.34669C9.13698 7.09652 8.57059 6.96655 7.99675 6.96655C7.42291 6.96655 6.85652 7.09652 6.34008 7.34669C5.90755 7.55819 5.51148 7.83724 5.16675 8.17336"
          stroke="black"
          strokeOpacity={0.85}
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    ticket: (
      <svg
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.6067 9.79478C12.6088 10.209 12.7747 10.6056 13.0683 10.8979C13.3618 11.1902 13.7591 11.3544 14.1734 11.3548C14.1734 13.8548 13.5467 14.4814 11.0467 14.4814H4.79335C2.29335 14.4814 1.66669 13.8548 1.66669 11.3548V11.0481C2.08165 11.0464 2.47912 10.8807 2.77255 10.5873C3.06598 10.2939 3.2316 9.89641 3.23335 9.48145C3.2316 9.06648 3.06598 8.66901 2.77255 8.37558C2.47912 8.08216 2.08165 7.91653 1.66669 7.91478L1.66669 7.60811C1.67335 5.10811 2.29335 4.48145 4.79335 4.48145H11.04C13.54 4.48145 14.1667 5.10811 14.1667 7.60811V8.23478C13.9618 8.23452 13.7588 8.27469 13.5694 8.35299C13.38 8.43129 13.2079 8.54619 13.063 8.69111C12.9181 8.83602 12.8032 9.00809 12.7249 9.19748C12.6466 9.38687 12.6064 9.58984 12.6067 9.79478Z"
          stroke="black"
          strokeOpacity={0.85}
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.8073 4.48128H4.74731L6.70065 2.52795C8.29398 0.933281 9.09398 0.933281 10.6873 2.52861L11.0873 2.92861C10.8865 3.1271 10.7518 3.38275 10.7017 3.66065C10.6516 3.93855 10.6884 4.22514 10.8073 4.48128Z"
          stroke="black"
          strokeOpacity={0.85}
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.586 4.48193V14.4819"
          stroke="black"
          strokeOpacity={0.85}
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="5 5"
        />
      </svg>
    ),
    customer: (
      <svg
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.10666 7.24665C6.03348 7.23998 5.95984 7.23998 5.88666 7.24665C5.1108 7.21783 4.37723 6.88566 3.84374 6.32159C3.31024 5.75752 3.01942 5.00661 3.03384 4.23034C3.04825 3.45408 3.36674 2.71448 3.92081 2.1706C4.47487 1.62673 5.22026 1.32202 5.99666 1.32202C6.77306 1.32202 7.51844 1.62673 8.07251 2.1706C8.62658 2.71448 8.94507 3.45408 8.95948 4.23034C8.97389 5.00661 8.68308 5.75752 8.14958 6.32159C7.61608 6.88566 6.88252 7.21783 6.10666 7.24665Z"
          stroke="black"
          strokeOpacity={0.85}
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.94 2.66663C11.5588 2.66663 12.1523 2.91246 12.5899 3.35004C13.0275 3.78763 13.2733 4.38112 13.2733 4.99996C13.2737 5.60407 13.0398 6.1848 12.6208 6.61997C12.2018 7.05515 11.6304 7.31085 11.0267 7.33329C10.9691 7.32662 10.9109 7.32662 10.8533 7.33329M12.2267 13.3333C12.7001 13.2402 13.1467 13.042 13.5333 12.7533C13.7724 12.6006 13.9692 12.3902 14.1055 12.1415C14.2419 11.8927 14.3133 11.6136 14.3133 11.33C14.3133 11.0463 14.2419 10.7672 14.1055 10.5184C13.9692 10.2697 13.7724 10.0593 13.5333 9.90663C13.1505 9.62556 12.7117 9.43003 12.2467 9.33329"
          stroke="black"
          strokeOpacity={0.85}
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.77335 9.70735C1.16002 10.7874 1.16002 12.5474 2.77335 13.6207C3.7822 14.2228 4.93516 14.5407 6.11002 14.5407C7.28488 14.5407 8.43785 14.2228 9.44669 13.6207C11.06 12.5407 11.06 10.7807 9.44669 9.70735C8.43675 9.10841 7.28421 8.79236 6.11002 8.79236C4.93584 8.79236 3.7833 9.10841 2.77335 9.70735V9.70735Z"
          stroke="black"
          strokeOpacity={0.85}
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    reporting: (
      <svg
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.4133 3.90002L11.1067 4.26002C9.40463 6.24723 7.12567 7.65469 4.58667 8.28669M4.58667 12.1V10.72M8 12.1V9.34003M11.4133 12.1V7.95335"
          stroke="black"
          strokeWidth={1.3}
          strokeLinecap="round"
        />
        <path
          d="M9.33331 4H11.2866V5.94667"
          stroke="black"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.99998 14.6667H9.99998C13.3333 14.6667 14.6666 13.3334 14.6666 10V6.00004C14.6666 2.66671 13.3333 1.33337 9.99998 1.33337H5.99998C2.66665 1.33337 1.33331 2.66671 1.33331 6.00004V10C1.33331 13.3334 2.66665 14.6667 5.99998 14.6667Z"
          stroke="black"
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    settings: (
      <svg
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.99998 14.6667H9.99998C13.3333 14.6667 14.6666 13.3334 14.6666 10V6.00004C14.6666 2.66671 13.3333 1.33337 9.99998 1.33337H5.99998C2.66665 1.33337 1.33331 2.66671 1.33331 6.00004V10C1.33331 13.3334 2.66665 14.6667 5.99998 14.6667Z"
          stroke="black"
          strokeOpacity={0.85}
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.38 12.3334V9.7334"
          stroke="black"
          strokeOpacity={0.85}
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.38 4.96663V3.66663M5.62 12.3333V11.0333M5.62 6.26663V3.66663M12.1133 6.69997C12.1133 7.04279 12.0117 7.37791 11.8212 7.66296C11.6308 7.948 11.36 8.17017 11.0433 8.30136C10.7266 8.43255 10.3781 8.46688 10.0418 8.4C9.70561 8.33311 9.39676 8.16803 9.15435 7.92562C8.91194 7.68321 8.74686 7.37436 8.67997 7.03812C8.61309 6.70189 8.64742 6.35337 8.77861 6.03665C8.9098 5.71992 9.13197 5.44921 9.41701 5.25875C9.70206 5.06829 10.0372 4.96663 10.38 4.96663C10.8397 4.96663 11.2806 5.14925 11.6057 5.47432C11.9307 5.79938 12.1133 6.24026 12.1133 6.69997ZM7.35333 9.29996C7.35333 9.64278 7.25167 9.97791 7.06121 10.263C6.87074 10.548 6.60004 10.7702 6.28331 10.9014C5.96658 11.0325 5.61807 11.0669 5.28184 11C4.9456 10.9331 4.63675 10.768 4.39434 10.5256C4.15193 10.2832 3.98685 9.97435 3.91996 9.63812C3.85308 9.30189 3.88741 8.95337 4.0186 8.63665C4.14979 8.31992 4.37196 8.04921 4.657 7.85875C4.94205 7.66829 5.27717 7.56663 5.61999 7.56663C6.0797 7.56663 6.52058 7.74925 6.84564 8.07431C7.17071 8.39937 7.35333 8.84026 7.35333 9.29996Z"
          stroke="black"
          strokeOpacity={0.85}
          strokeWidth={1.3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    statusTicket: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_180095_13558)">
          <path
            d="M3.29996 11.6443L6.69746 15.0418C7.36947 15.7119 8.27973 16.0881 9.22871 16.0881C10.1777 16.0881 11.0879 15.7119 11.76 15.0418L15.0525 11.7493C15.7225 11.0773 16.0988 10.1671 16.0988 9.21809C16.0988 8.26911 15.7225 7.35885 15.0525 6.68684L11.6512 3.29984C11.2991 2.94685 10.8769 2.67168 10.4118 2.4921C9.94674 2.31253 9.44914 2.23255 8.95121 2.25734L5.20121 2.43734C4.47995 2.46897 3.79646 2.76868 3.28457 3.2778C2.77269 3.78691 2.46926 4.46875 2.43371 5.18984L2.25371 8.93984C2.23105 9.43854 2.31237 9.9365 2.49248 10.4021C2.6726 10.8677 2.94758 11.2907 3.29996 11.6443V11.6443Z"
            stroke="#595959"
            strokeWidth={1.3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.17627 7.29443C9.17627 7.66527 9.0663 8.02779 8.86028 8.33613C8.65425 8.64447 8.36141 8.88479 8.0188 9.02671C7.67619 9.16862 7.29919 9.20575 6.93548 9.13341C6.57176 9.06106 6.23767 8.88248 5.97545 8.62026C5.71322 8.35804 5.53465 8.02394 5.4623 7.66023C5.38995 7.29651 5.42708 6.91951 5.569 6.5769C5.71091 6.23429 5.95123 5.94146 6.25958 5.73543C6.56792 5.5294 6.93043 5.41943 7.30127 5.41943C7.79855 5.41943 8.27546 5.61698 8.6271 5.96861C8.97873 6.32024 9.17627 6.79715 9.17627 7.29443Z"
            stroke="#595959"
            strokeWidth={1.3}
            strokeLinecap="round"
          />
          <path
            d="M9.92627 12.9194L12.9263 9.91943"
            stroke="#595959"
            strokeWidth={1.3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_180095_13558">
            <rect width={18} height={18} fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    replyTicket: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.6526 13.7324H6.65259C5.65803 13.7324 4.7042 13.3373 4.00094 12.6341C3.29768 11.9308 2.90259 10.977 2.90259 9.98242C2.90259 8.98786 3.29768 8.03403 4.00094 7.33077C4.7042 6.62751 5.65803 6.23242 6.65259 6.23242L14.9026 6.23242"
          stroke="#595959"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.1775 8.10758L15.0975 6.18758L13.1775 4.26758"
          stroke="#595959"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    emptyChartData: (
      <svg
        width={180}
        height={151}
        viewBox="0 0 180 151"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          y={16.458}
          width={143.011}
          height={119.092}
          rx={4}
          transform="rotate(-1.81869 0 16.458)"
          fill="#F5F5F5"
        />
        <rect
          x={13.3296}
          y={0.5}
          width={145.325}
          height={119.877}
          rx={3.5}
          fill="white"
          stroke="#D9D9D9"
        />
        <line
          x1={31.916}
          y1={15.6548}
          x2={140.069}
          y2={15.6548}
          stroke="#F5F5F5"
          strokeWidth={0.5}
        />
        <line
          x1={31.916}
          y1={41.103}
          x2={140.069}
          y2={41.103}
          stroke="#F5F5F5"
          strokeWidth={0.5}
        />
        <line
          x1={31.916}
          y1={63.3696}
          x2={140.069}
          y2={63.3696}
          stroke="#F5F5F5"
          strokeWidth={0.5}
        />
        <line
          x1={31.916}
          y1={82.4556}
          x2={140.069}
          y2={82.4556}
          stroke="#F5F5F5"
          strokeWidth={0.5}
        />
        <line
          x1={31.916}
          y1={104.723}
          x2={140.069}
          y2={104.723}
          stroke="#F5F5F5"
          strokeWidth={0.5}
        />
        <rect
          x={31.916}
          y={25.9727}
          width={26.3336}
          height={79}
          fill="#F0F0F0"
        />
        <rect
          x={60.2495}
          y={54.9727}
          width={26.3336}
          height={50}
          fill="#F0F0F0"
        />
        <rect
          x={88.583}
          y={36.9727}
          width={26.3336}
          height={68}
          fill="#F0F0F0"
        />
        <rect
          x={116.917}
          y={54.9727}
          width={26.3336}
          height={50}
          fill="#F0F0F0"
        />
        <path
          d="M32 65.9932H44.4675L74.0779 87L102.545 55L132.26 64.4694L144 59.898"
          stroke="#D9D9D9"
        />
        <path
          opacity={0.05}
          d="M129.986 139.406C129.276 139.668 128.528 139.929 127.968 140.451C127.408 140.937 126.997 141.72 127.071 142.467C127.221 143.549 128.342 144.221 129.388 144.557C134.357 146.162 140.185 143.885 144.781 146.386C146.126 147.095 147.247 148.177 148.592 148.887C150.684 149.969 153.15 150.081 155.504 149.969C158.007 149.82 160.697 149.334 162.491 147.543C162.752 147.282 162.976 146.983 163.088 146.647C163.201 146.237 163.088 145.789 162.976 145.378C161.93 142.168 158.456 138.548 155.056 137.801C150.049 136.682 144.445 136.756 139.401 137.353C136.188 137.689 133.012 138.361 129.986 139.406Z"
          fill="#838383"
        />
        <path
          d="M109.553 67.2115C109.539 67.2376 109.521 67.2654 109.505 67.29C109.497 67.3017 109.49 67.3126 109.483 67.3224C109.46 67.3592 109.449 67.3859 109.449 67.4078C109.449 67.4379 109.457 67.4776 109.473 67.5135C109.489 67.5499 109.511 67.5756 109.533 67.587L109.596 67.6181L109.546 67.6671C109.395 67.818 109.295 67.9199 109.261 68.0895C109.226 68.2634 109.262 68.4255 109.388 68.5221C109.525 68.5889 109.698 68.5895 109.735 68.5895H109.772L109.783 68.6251C109.834 68.7953 109.972 68.9344 110.143 69.0089C110.314 69.0833 110.513 69.091 110.684 69.0054L110.72 68.9877L110.745 69.0181C110.92 69.2282 111.204 69.336 111.491 69.336C111.753 69.336 111.986 69.2773 112.249 69.2107C112.279 69.2033 112.308 69.1957 112.339 69.1882L112.339 69.188C112.568 69.1352 112.798 69.0399 113.037 68.9409L113.065 68.9293C113.312 68.8268 113.568 68.7224 113.835 68.6653L113.838 68.6646L113.838 68.6647C114.092 68.6285 114.338 68.5286 114.579 68.4038C114.745 68.3178 114.905 68.2212 115.063 68.1264C115.135 68.0832 115.206 68.0404 115.277 67.9991L115.277 67.999C116.243 67.4424 117.098 66.6997 117.843 65.8447L117.843 65.8444C117.859 65.8257 117.876 65.8067 117.893 65.7876C118.16 65.4844 118.462 65.1424 118.789 64.8334C119.137 64.5053 119.515 64.2116 119.915 64.0402C120.128 63.9435 120.499 63.8706 120.943 63.8153C121.389 63.7597 121.915 63.7211 122.441 63.6954C123.492 63.6441 124.549 63.644 124.981 63.6627C128.307 63.7374 131.701 63.8117 134.982 63.1412L134.983 63.141L135.029 63.1324C135.615 63.0228 136.221 62.9095 136.721 62.5882L136.722 62.5874L136.722 62.5874C137.456 62.1474 137.937 61.4123 138.271 60.5964C139.016 58.6614 139.351 56.6511 139.65 54.6358C139.8 53.5908 139.949 52.5364 140.099 51.482C140.248 50.4276 140.397 49.3732 140.547 48.3281L140.547 48.3275C140.557 48.2628 140.567 48.1983 140.577 48.1339C140.716 47.2322 140.851 46.3609 140.92 45.4573L140.92 45.4553L140.92 45.4553C140.931 45.3615 140.948 45.2498 140.966 45.1259C141.011 44.824 141.066 44.4499 141.079 44.0877C141.088 43.8331 141.076 43.5887 141.027 43.384C140.977 43.1789 140.89 43.0199 140.755 42.927L140.754 42.9265L140.754 42.9265C140.634 42.8405 140.452 42.7881 140.232 42.761C140.013 42.7341 139.761 42.7328 139.506 42.7445C139.25 42.756 138.992 42.7804 138.76 42.8043C138.711 42.8094 138.662 42.8145 138.615 42.8195C138.443 42.8376 138.29 42.8536 138.171 42.861M109.553 67.2115L138.168 42.8111M109.553 67.2115C110.072 66.5837 110.702 66.0652 111.371 65.5822L111.371 65.5822L111.373 65.5807C111.55 65.4394 111.731 65.3023 111.912 65.1649L111.941 65.1429C112.132 64.9983 112.323 64.8532 112.508 64.7034C112.879 64.4037 113.228 64.0834 113.511 63.7054L113.512 63.7055L113.513 63.7031C113.553 63.644 113.594 63.5632 113.609 63.4846C113.625 63.4084 113.618 63.3177 113.54 63.2632C113.511 63.2361 113.473 63.2252 113.442 63.2202C113.411 63.2149 113.38 63.2148 113.361 63.2148C113.329 63.2125 113.297 63.2102 113.264 63.2079C112.779 63.1731 112.32 63.1402 111.828 63.1402C111.648 63.1402 111.467 63.1043 111.286 63.0318C111.122 62.9665 111.022 62.7668 111.055 62.6028C111.07 62.524 111.118 62.4584 111.183 62.4022C111.248 62.3457 111.328 62.3013 111.402 62.2645C111.806 62.0622 112.226 61.9299 112.656 61.7945C112.856 61.7312 113.059 61.6672 113.264 61.5951L113.264 61.5951L113.265 61.5945C113.603 61.4634 113.931 61.3136 114.258 61.1645L114.258 61.1642C114.585 61.0148 114.911 60.8662 115.245 60.7362C115.837 60.5144 116.468 60.403 117.139 60.3286L117.139 60.3285C117.432 60.2919 117.727 60.3101 118.02 60.338C118.082 60.3439 118.144 60.3502 118.205 60.3565C118.436 60.38 118.666 60.4035 118.889 60.4035H118.89C119.487 60.4035 120.087 60.4035 120.688 60.3285C123.643 59.9923 126.522 59.3946 129.399 58.7227M109.553 67.2115L131.378 58.275M138.171 42.861C138.171 42.861 138.171 42.861 138.171 42.861L138.168 42.8111M138.171 42.861C138.171 42.861 138.171 42.861 138.172 42.861L138.168 42.8111M138.171 42.861C137.165 42.9355 136.159 43.0844 135.19 43.3078L135.187 43.3084L135.187 43.3084C134.966 43.3451 134.755 43.4175 134.616 43.5557C134.448 43.7238 134.409 43.9582 134.372 44.1804L134.369 44.1996L134.32 44.1921M138.168 42.8111C137.159 42.8858 136.15 43.0351 135.179 43.259C134.955 43.2964 134.731 43.371 134.581 43.5203C134.401 43.7001 134.36 43.9491 134.324 44.1673C134.322 44.1756 134.321 44.1839 134.32 44.1921M134.32 44.1921L134.369 44.2004L134.369 44.2L134.32 44.1921ZM129.399 58.7227C129.399 58.7227 129.399 58.7227 129.399 58.7228L129.388 58.6739L129.399 58.7226C129.399 58.7227 129.399 58.7227 129.399 58.7227ZM129.399 58.7227C130.071 58.5735 130.743 58.4243 131.378 58.275M131.378 58.275C131.378 58.2751 131.377 58.2752 131.377 58.2753L131.368 58.2261L131.379 58.2747C131.379 58.2748 131.379 58.2749 131.378 58.275ZM133.846 50.1293C133.846 50.1292 133.846 50.1291 133.846 50.1289L133.797 50.1267L133.846 50.1295C133.846 50.1295 133.846 50.1294 133.846 50.1293Z"
          fill="#FFE7D8"
          stroke="#D9D9D9"
          strokeWidth={0.1}
        />
        <path
          d="M114.368 63.2275C114.891 63.5261 115.489 63.7128 116.087 63.6754"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M112.5 65.5415C112.948 66.1387 113.434 66.6986 113.994 67.1464"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M112.687 65.8774C111.753 66.6613 110.669 67.3331 109.548 67.8183"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M113.247 66.4746C112.276 67.2957 111.155 68.0049 109.959 68.5274"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M113.845 67.1094C112.948 67.8185 111.977 68.4157 110.968 68.9009"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M134.992 38.7802C134.656 39.3401 134.431 40.0119 134.282 40.6464C133.834 42.5499 133.759 44.4908 133.46 46.3943C133.236 47.626 132.9 48.8577 132.451 50.0521C132.414 50.1641 132.377 50.2387 132.414 50.3507C132.451 50.4254 132.489 50.4627 132.563 50.5C134.618 51.881 137.234 52.1049 139.662 51.7317C139.812 51.6944 139.998 51.6571 140.111 51.5451C140.185 51.4704 140.223 51.3211 140.26 51.2092C140.97 49.007 141.119 46.6929 141.231 44.3788C141.343 41.6542 141.381 38.8548 140.671 36.2421C140.596 36.0182 138.99 36.2048 138.803 36.2421C138.317 36.3168 137.869 36.3914 137.458 36.6154C136.486 37.1379 135.552 37.8471 134.992 38.7802Z"
          fill="#D9D9D9"
        />
        <path
          d="M152.702 132.837C152.739 132.651 152.776 132.502 152.888 132.352C153 132.24 153.15 132.166 153.299 132.091C154.495 131.643 155.803 131.456 157.073 131.531C157.297 131.531 157.559 131.568 157.783 131.68C158.754 132.203 158.493 134.816 158.53 135.749C158.605 137.578 158.754 139.444 159.128 141.273C159.128 141.347 159.165 141.422 159.165 141.459C159.091 141.534 158.978 141.609 158.866 141.646C158.306 141.87 157.745 141.497 157.185 141.273C156.139 140.788 154.906 140.788 153.86 141.235C153.561 141.347 153.262 141.534 152.926 141.609C152.589 141.683 152.216 141.683 151.992 141.459C152.066 140.9 152.179 140.377 152.216 139.817C152.552 137.503 152.253 135.114 152.702 132.837Z"
          fill="#B2B2B2"
        />
        <path
          d="M153.001 141.646C153.337 141.571 153.636 141.384 153.935 141.272C154.981 140.824 156.214 140.824 157.26 141.31C157.783 141.534 158.381 141.907 158.941 141.683C159.053 141.646 159.165 141.571 159.24 141.496C159.464 142.541 159.726 143.661 159.352 144.669C159.053 145.49 158.344 146.162 157.522 146.498C156.7 146.834 155.766 146.871 154.906 146.722C154.196 146.572 153.486 146.311 152.963 145.789C152.216 145.042 151.955 143.96 151.955 142.915C151.955 142.429 152.029 141.944 152.067 141.459C152.291 141.683 152.664 141.72 153.001 141.646Z"
          fill="white"
        />
        <path
          d="M134.88 139.668C134.32 139.406 133.871 139.07 133.311 138.772C132.564 138.361 131.779 138.175 130.957 138.1C132.041 137.391 133.049 136.607 133.983 135.711C135.553 134.218 136.898 132.277 137.309 130.113C137.458 129.329 137.607 128.358 138.355 128.097C138.654 127.985 138.99 128.022 139.289 128.06C139.924 128.134 140.559 128.284 141.194 128.47C141.456 128.545 141.68 128.657 141.867 128.844C142.128 129.142 142.128 129.59 142.091 130.001C141.942 132.389 141.867 134.741 141.942 137.13C140.484 137.839 138.99 138.585 137.533 139.294C136.599 139.817 135.926 140.153 134.88 139.668Z"
          fill="#B2B2B2"
        />
        <path
          d="M130.135 138.66C130.396 138.473 130.695 138.287 130.957 138.1C131.779 138.175 132.601 138.399 133.311 138.772C133.834 139.071 134.319 139.406 134.88 139.668C135.926 140.153 136.599 139.78 137.533 139.332C138.99 138.623 140.484 137.876 141.941 137.167C141.941 137.54 141.941 137.951 141.755 138.287C141.344 139.22 140.148 139.369 139.214 139.78C137.719 140.414 136.673 141.944 135.141 142.467C133.983 142.878 132.713 142.728 131.555 142.43C130.471 142.168 129.163 141.982 128.902 140.713C128.752 139.668 129.35 139.145 130.135 138.66Z"
          fill="white"
        />
        <path
          d="M158.53 93.2737C158.792 95.2146 159.128 97.1555 159.165 99.0963C159.203 100.664 158.455 102.605 159.091 104.135C159.315 104.658 159.726 105.18 159.576 105.74C159.464 106.225 158.904 106.598 159.016 107.084C159.053 107.308 159.277 107.494 159.389 107.718C159.726 108.203 159.688 108.875 159.651 109.472C159.651 110.294 159.987 111.04 160.099 111.861C160.323 113.168 160.286 114.511 160.249 115.818C160.211 118.654 160.174 121.454 159.987 124.29C159.912 125.746 159.651 127.239 159.688 128.694C159.688 129.03 159.726 129.366 159.651 129.702C159.576 130.075 159.352 130.411 159.165 130.747C158.68 131.792 159.987 132.39 159.651 133.099C159.464 133.472 158.754 133.547 158.829 133.994C158.866 134.181 159.091 134.33 159.091 134.517C159.128 134.741 158.904 134.89 158.717 135.002C157.447 135.749 155.765 136.047 154.308 135.599C153.075 135.226 153.038 134.368 152.328 133.435C152.179 133.248 151.992 133.061 151.954 132.837C151.88 132.502 152.179 132.203 152.365 131.904C153.187 130.673 152.589 128.806 152.552 127.425C152.515 125.559 152.44 123.656 152.365 121.789C152.291 119.811 152.179 117.796 152.066 115.818C151.954 114.063 151.618 112.346 151.618 110.592C151.618 109.211 151.132 108.315 150.908 107.009C150.759 106.151 150.684 105.329 150.535 104.471C149.488 98.835 148.255 93.2364 146.91 87.6378C146.761 87.0406 146.088 86.2941 145.715 86.7793C144.893 87.899 144.669 90.1385 144.332 91.4448C143.921 93.0871 143.585 94.7667 143.361 96.409C142.875 99.7308 143.025 103.053 142.576 106.375C142.539 106.636 142.502 106.934 142.539 107.196C142.576 107.457 142.651 107.718 142.689 107.979C143.66 111.675 142.502 115.482 142.203 119.177C142.053 120.968 142.278 122.723 142.278 124.514C142.278 125.373 141.979 126.343 142.053 127.164C142.128 128.023 142.801 128.694 142.352 129.59C142.24 129.814 142.128 130.001 142.091 130.225C141.979 131.195 142.539 131.718 141.642 132.539C141.045 133.099 140.073 133.36 139.251 133.285C138.616 133.211 136.972 133.211 136.486 132.725C136.15 132.427 135.851 131.083 135.851 130.598C135.851 130.038 136.15 129.516 136.187 128.993C136.187 128.62 136.038 128.247 135.963 127.873C135.291 125.485 135.552 122.723 135.515 120.259C135.478 117.497 135.366 114.735 135.216 111.973C134.88 106.524 134.357 101.074 133.834 95.6252C133.535 92.3779 133.199 89.1681 133.273 85.9209C133.348 81.106 134.245 76.3285 135.366 71.6257C135.44 71.2524 135.552 70.8045 135.851 70.5433C136.15 70.282 136.524 70.2073 136.897 70.1327C142.614 69.1623 148.442 68.8637 154.233 69.1996C154.495 69.1996 154.794 69.2369 155.018 69.3862C155.317 69.5728 155.466 69.9087 155.578 70.2073C156.251 71.8869 156.886 73.6785 157.334 75.4327C157.708 77.075 157.484 78.8666 157.521 80.5462C157.745 84.8011 158.007 89.0561 158.53 93.2737Z"
          fill="#A5A5A5"
        />
        <path
          d="M146.612 86.7417C145.678 86.1072 144.557 85.8833 143.436 85.7713C142.315 85.6593 141.194 85.6967 140.111 85.5474"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M145.267 86.9284C144.37 86.6298 143.361 86.7045 142.427 86.8911C141.493 87.0777 140.559 87.339 139.588 87.4136"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M144.557 87.4136C143.586 87.5255 142.614 87.6375 141.68 87.7495"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M145.715 86.182C145.416 83.1215 145.565 80.0609 146.126 77.0376"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M143.66 85.7713C142.838 82.8974 142.988 79.8368 143.137 76.8882"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M149.825 81.7402C148.181 82.1135 146.612 82.7107 144.968 83.0466C143.324 83.3825 141.568 83.4945 140.036 82.8226"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M145.304 86.0327C145.042 86.2193 144.818 86.4433 144.557 86.6299C144.744 86.7419 144.706 87.0031 144.557 87.1898C144.407 87.3391 144.221 87.451 144.071 87.6003C143.959 87.7496 143.922 87.8989 143.884 88.0855C142.689 92.6018 141.904 97.23 141.53 101.896C141.418 103.426 141.344 104.919 141.493 106.449C141.643 108.091 142.016 109.696 142.091 111.339C142.203 114.81 140.858 118.244 140.97 121.715C141.007 123.133 141.269 124.551 141.269 125.97C141.269 126.418 141.119 126.977 141.194 127.425C141.269 127.873 141.605 128.246 141.643 128.732C141.68 129.478 141.269 130.15 141.194 130.859C141.082 131.606 141.082 132.352 140.97 133.099"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M141.381 127.239C140.746 128.097 139.775 128.732 138.728 128.956C138.093 129.068 137.383 129.03 136.935 128.582"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M141.344 129.851C140.783 130.411 140.223 131.008 139.513 131.344C138.803 131.68 137.906 131.755 137.234 131.307"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M139.737 103.239C139.214 105.255 138.168 107.121 136.748 108.651"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M157.148 109.771C156.849 110.219 156.513 110.667 156.102 111.077C155.691 111.451 155.205 111.749 154.682 111.861C153.935 111.973 153.187 111.675 152.627 111.189"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M157.671 133.696C157.073 134.106 156.438 134.48 155.691 134.517C154.981 134.554 154.196 134.256 153.86 133.621"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M157.708 131.792C156.251 132.128 154.607 131.344 154.009 130"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M157.484 83.6066C156.064 82.5615 155.167 80.9565 154.719 79.2769C154.271 77.5973 154.196 75.8431 154.159 74.0889"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M151.88 35.6074C153.001 35.8314 154.047 36.2046 155.13 36.4286C156.102 36.6152 157.073 36.8765 158.007 37.2497C158.418 37.399 158.867 37.5483 159.24 37.8096C159.726 38.1455 160.286 38.5561 160.585 39.1159C160.735 39.4145 160.735 39.5638 160.697 39.8997C160.623 40.2357 160.585 40.5716 160.51 40.9448C160.398 41.6167 160.249 42.3258 160.137 43.035C159.913 44.416 159.651 45.797 159.427 47.178C159.165 48.7083 158.904 50.2386 158.605 51.7688C158.231 53.859 157.82 55.9118 157.372 57.9647C157.036 59.4203 156.027 61.6971 156.438 63.1527C156.55 63.526 156.774 63.7873 156.886 64.1605C157.185 65.0563 156.027 65.1683 156.625 66.176C157.26 67.3331 156.513 68.826 156.662 70.1324C156.812 71.1775 157.372 72.1106 157.559 73.1183C157.895 75.3205 155.616 77.7465 154.047 78.9782C150.086 82.0388 144.557 82.8973 139.849 81.2177C137.57 80.3965 135.702 78.9409 134.656 76.7388C134.469 76.3282 134.282 75.9176 134.282 75.4697C134.282 74.4247 135.067 73.0437 135.328 71.9986C135.665 70.6549 136.188 69.3859 135.739 68.0049C135.553 67.445 135.328 66.7732 135.702 66.3626C135.814 66.2507 136.001 66.176 136.113 66.0267C136.636 65.4668 136.15 63.1901 136.113 62.4809C135.964 60.3908 136.076 58.2633 136.038 56.1731C136.001 54.3815 135.702 52.6273 135.665 50.8357C135.627 48.5963 135.702 46.3942 135.627 44.1547C135.59 43.035 135.553 41.9526 135.403 40.8328C135.291 39.9744 134.917 39.3025 135.44 38.4814C135.702 38.0335 136.113 37.6603 136.487 37.3244C137.309 36.6152 137.794 36.4286 138.803 36.2046C139.849 35.9807 140.895 35.7567 141.979 35.6074C143.81 35.3089 145.752 35.0849 147.583 35.1222C148.891 35.1596 150.236 35.2715 151.506 35.5328C151.693 35.5701 151.805 35.5701 151.88 35.6074Z"
          fill="#D9D9D9"
        />
        <path
          d="M135.926 51.3957C135.627 49.1189 135.665 46.7675 135.963 44.4907"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M135.515 41.5794C135.328 40.6837 135.216 39.7879 135.254 38.8921"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M139.812 78.2321C144.034 79.7997 149.115 78.568 152.142 75.3208"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M139.326 75.7685C142.539 77.4481 146.612 77.2988 149.675 75.3579"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M155.616 65.8774C152.59 68.4528 149.377 71.1402 145.454 71.924"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M163.275 51.9927C163.29 51.4776 163.308 50.9626 163.326 50.4475C163.398 48.3872 163.47 46.3269 163.35 44.2666C163.35 44.0426 163.313 43.7814 163.163 43.5948C163.028 43.4257 162.831 43.3485 162.657 43.28C162.638 43.2729 162.62 43.2658 162.603 43.2588M163.275 51.9927L163.225 51.9909C163.225 51.991 163.225 51.991 163.225 51.9911M163.275 51.9927L163.225 51.9913C163.225 51.9912 163.225 51.9911 163.225 51.9911M163.275 51.9927C163.262 52.3804 163.235 52.7925 163.207 53.2189C163.086 55.0918 162.946 57.2422 163.799 58.823C164.276 59.687 165.086 60.4321 165.85 61.1342C166.043 61.3117 166.233 61.4864 166.414 61.6597M163.225 51.9911C163.24 51.4754 163.258 50.96 163.276 50.4447C163.348 48.3846 163.42 46.3272 163.3 44.2695L163.3 44.2666H163.3C163.3 44.0458 163.263 43.799 163.124 43.626C162.998 43.4679 162.814 43.3956 162.637 43.3262C162.62 43.3194 162.603 43.3126 162.585 43.3057M163.225 51.9911C163.212 52.3757 163.185 52.7864 163.158 53.2123C163.111 53.9371 163.061 54.7058 163.067 55.4642C163.076 56.6706 163.226 57.8655 163.755 58.8468L163.755 58.8472C164.057 59.3945 164.49 59.8929 164.959 60.3607C165.238 60.6392 165.531 60.9093 165.818 61.1725C166.01 61.3498 166.2 61.5241 166.379 61.6956M162.585 43.3057C162.586 43.3058 162.586 43.306 162.587 43.3061L162.603 43.2588M162.585 43.3057C161.618 42.9711 160.649 42.7478 159.642 42.5615L159.642 42.5615C159.553 42.5449 159.447 42.5228 159.328 42.4981C159.041 42.4386 158.682 42.3639 158.323 42.3146C158.07 42.2798 157.819 42.258 157.598 42.2632C157.376 42.2683 157.189 42.3007 157.059 42.3699L157.059 42.3699L157.059 42.3699C156.916 42.4456 156.815 42.5931 156.745 42.7914C156.676 42.9893 156.64 43.2313 156.624 43.486C156.602 43.8297 156.615 44.1865 156.627 44.4821C156.633 44.6269 156.638 44.757 156.638 44.8638C156.638 45.7985 156.672 46.6987 156.708 47.6322C156.71 47.6666 156.711 47.701 156.712 47.7355M162.585 43.3057C162.585 43.3056 162.585 43.3054 162.584 43.3053L162.603 43.2588M162.603 43.2588L156.712 47.7355M156.712 47.7355C156.712 47.7354 156.712 47.7353 156.712 47.7352L156.662 47.7377L156.712 47.7358C156.712 47.7357 156.712 47.7356 156.712 47.7355ZM166.379 61.6956C166.379 61.6955 166.379 61.6955 166.379 61.6954L166.414 61.6597M166.379 61.6956C166.379 61.6957 166.379 61.6957 166.379 61.6958L166.414 61.6597M166.379 61.6956L172.99 67.5569M166.414 61.6597C168.506 63.7125 170.636 65.728 172.99 67.5569M172.958 67.5959C172.958 67.5957 172.958 67.5955 172.958 67.5953L172.99 67.5569M172.958 67.5959C172.958 67.5961 172.959 67.5962 172.959 67.5964L172.99 67.5569M172.958 67.5959C173.409 67.9707 173.896 68.3079 174.421 68.6077M172.958 67.5959L157.459 58.5549C157.682 60.1166 158.128 61.4104 159.237 62.4819C161.644 64.7382 164.567 66.4443 167.425 68.1132L167.485 68.1483L167.486 68.1485C167.86 68.3727 168.767 68.9237 169.641 69.5123C170.078 69.8065 170.508 70.1106 170.859 70.3882C171.208 70.6641 171.485 70.918 171.611 71.1123C172.098 71.8237 172.288 72.8643 172.436 73.678L172.441 73.7065L172.441 73.7072C172.627 74.8226 172.962 75.8996 173.482 76.8643L173.483 76.8656C173.708 77.315 173.965 77.8286 174.368 78.1945C174.559 78.3665 174.721 78.5854 174.88 78.8042C174.889 78.8166 174.897 78.829 174.906 78.8413C175.057 79.0492 175.206 79.2551 175.379 79.428L175.382 79.4312L175.382 79.4313C175.565 79.6505 175.784 79.8334 176.041 79.9798C176.295 80.1248 176.58 80.1947 176.863 80.124L176.897 80.1155L176.917 80.1448C177.02 80.2991 177.193 80.3953 177.377 80.4216C177.562 80.4479 177.752 80.4036 177.889 80.2842L177.95 80.2304L177.97 80.3097C178.001 80.4333 178.127 80.5331 178.295 80.5331C178.371 80.5331 178.443 80.4949 178.503 80.4357C178.562 80.3768 178.603 80.3013 178.62 80.2361C178.656 80.0555 178.655 79.8771 178.62 79.7368L178.605 79.6746H178.669C178.692 79.6746 178.729 79.6618 178.767 79.6363C178.805 79.6113 178.835 79.5799 178.848 79.5529C178.863 79.524 178.871 79.4853 178.871 79.4447C178.871 79.4041 178.863 79.3654 178.848 79.3364L178.844 79.329L178.843 79.3208C178.744 78.5936 178.497 77.8957 178.259 77.2218C178.23 77.1409 178.202 77.0603 178.173 76.98C178.122 76.8493 178.069 76.7174 178.016 76.5842C177.719 75.8474 177.407 75.0723 177.311 74.2437L177.311 74.238H177.311C177.311 74.1603 177.321 74.07 177.347 73.9972C177.371 73.9281 177.42 73.852 177.51 73.852C177.527 73.852 177.544 73.8559 177.557 73.8596C177.572 73.8635 177.587 73.8685 177.6 73.873L177.601 73.8733C177.615 73.878 177.628 73.8822 177.639 73.8853C177.651 73.8885 177.657 73.8894 177.66 73.8894H177.672L177.682 73.8946C177.907 74.007 178.132 74.1286 178.356 74.2498L178.356 74.25C178.58 74.371 178.803 74.4916 179.025 74.6029C179.073 74.6221 179.118 74.6434 179.161 74.6642C179.17 74.6684 179.178 74.6726 179.187 74.6767C179.221 74.6935 179.254 74.7095 179.287 74.7241C179.368 74.7603 179.445 74.7851 179.528 74.7851C179.616 74.7851 179.71 74.7675 179.786 74.7298C179.861 74.6923 179.913 74.6376 179.927 74.5641L179.929 74.555L179.93 74.5553C179.961 74.4767 179.955 74.3966 179.925 74.3159C179.895 74.2343 179.842 74.155 179.787 74.0814L179.784 74.0772L179.784 74.0771C179.618 73.801 179.415 73.5517 179.201 73.305C179.142 73.2372 179.082 73.1696 179.022 73.1016C178.864 72.923 178.704 72.7422 178.555 72.5521C178.329 72.2704 178.132 71.9702 177.936 71.6723L177.936 71.6714C177.739 71.3725 177.544 71.0758 177.322 70.7981L177.322 70.7977C176.914 70.2799 176.433 69.8724 175.947 69.4615C175.727 69.2789 175.47 69.1412 175.205 69.0108C175.147 68.9827 175.09 68.9549 175.032 68.9271C174.823 68.8267 174.613 68.7257 174.421 68.6077M174.421 68.6077C174.421 68.6075 174.421 68.6074 174.421 68.6073L174.447 68.5647L174.422 68.6081C174.422 68.608 174.421 68.6078 174.421 68.6077Z"
          fill="#FFE7D8"
          stroke="#D9D9D9"
          strokeWidth={0.1}
        />
        <path
          d="M176.8 73.4169C176.203 73.4169 175.605 73.2302 175.119 72.9316"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M177.174 76.3657C176.502 76.6643 175.792 76.8509 175.044 76.9629"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M176.875 76.5522C177.249 77.7093 177.809 78.829 178.519 79.8368"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M176.053 76.7388C176.464 77.9705 177.025 79.1275 177.772 80.2099"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M175.231 77C175.605 78.0451 176.128 79.0902 176.725 80.0233"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M163.2 43.595C163.387 44.7147 163.462 45.9091 163.499 47.0661C163.574 49.119 163.724 51.0972 164.06 53.15C162.752 53.8218 161.519 54.0831 160.025 53.9711C158.493 53.8218 157.036 53.3366 155.653 52.7021C155.504 52.6275 155.354 52.5528 155.242 52.4035C155.13 52.2542 155.093 52.0303 155.093 51.8063C154.943 48.7831 155.055 45.7225 155.429 42.7365C155.616 41.2062 155.915 39.6386 156.176 38.1083C156.438 36.6154 158.343 37.2499 159.315 37.6978C160.735 38.3696 161.818 39.6759 162.416 41.0569C162.827 41.8781 163.051 42.7365 163.2 43.595Z"
          fill="#D9D9D9"
        />
        <path
          d="M159.464 38.5938C157.82 39.8628 156.737 41.841 156.513 43.9311"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M156.476 52.8514C156.214 51.7316 156.102 50.6119 156.139 49.4922"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M150.049 15.4898C151.581 16.0123 153.001 16.9827 154.009 18.3264C155.317 20.0433 155.765 22.3201 155.504 24.4849C155.317 25.9405 154.831 27.3215 154.196 28.5906C153.897 29.1504 153.598 29.7476 153.225 30.2328C152.627 31.0166 151.88 31.7258 151.469 32.6216C150.983 33.6293 151.02 35.0103 151.245 36.0927C151.319 36.466 151.431 36.8392 151.319 37.2125C151.207 37.5111 150.946 37.735 150.647 37.9216C149.339 38.7801 147.695 39.1533 146.126 38.9667C145.229 38.8547 143.473 38.2202 143.399 37.1378C143.361 36.6153 143.735 36.1674 143.772 35.6449C143.81 35.1596 143.735 34.5998 143.697 34.1146C143.66 33.7786 143.623 33.48 143.473 33.1815C143.324 32.8829 143.062 32.6216 142.801 32.3976C142.054 31.7258 141.306 30.9793 140.895 30.0462C140.522 29.1878 140.447 28.2173 140.372 27.2469C140.26 25.0448 140.223 22.8053 140.858 20.7152C141.493 18.625 142.838 16.6468 144.818 15.7137C146.5 14.9672 148.368 14.9299 150.049 15.4898Z"
          fill="#FFE7D8"
        />
        <path
          opacity={0.7}
          d="M146.499 32.9951C147.434 32.8085 148.33 32.4726 149.19 32.062C148.891 32.7712 148.629 33.5177 148.106 34.1148C147.583 34.712 146.798 35.1599 145.976 35.0853C145.341 35.0106 144.781 34.6747 144.37 34.2268C143.959 33.7789 143.623 33.2564 143.398 32.7338C143.884 32.8458 144.258 33.0698 144.781 33.1071C145.379 33.1444 145.939 33.1071 146.499 32.9951Z"
          fill="black"
          fillOpacity={0.1}
        />
        <path
          d="M142.203 25.3806C142.166 25.7538 142.352 26.0897 142.577 26.127C142.801 26.127 143.025 25.8284 143.062 25.4552C143.1 25.082 142.913 24.746 142.689 24.7087C142.465 24.6714 142.24 24.97 142.203 25.3806Z"
          fill="#615C5A"
        />
        <path
          d="M145.752 25.4553C145.715 25.8285 145.902 26.1644 146.126 26.2017C146.35 26.2017 146.574 25.9032 146.612 25.5299C146.649 25.1567 146.462 24.8207 146.238 24.7834C145.977 24.7461 145.752 25.0447 145.752 25.4553Z"
          fill="#615C5A"
        />
        <path
          d="M143.772 24.8955C143.735 25.4554 143.66 26.0152 143.436 26.5005C143.324 26.7244 143.175 26.911 143.1 27.0976C142.988 27.3216 142.95 27.5455 143.025 27.7695C143.137 28.0681 143.399 28.2547 143.698 28.404"
          stroke="#C0A789"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M144.108 29.6356C144.781 29.0011 145.827 28.8145 146.686 29.1504"
          stroke="#C0A789"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M144.968 23.4401C145.304 22.9548 145.902 22.6936 146.5 22.6562C147.097 22.6562 147.658 22.8802 148.144 23.2161"
          stroke="#473C35"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M143.399 24.597C143.137 24.3358 142.95 23.9625 142.726 23.7013C142.278 23.1787 141.605 22.8055 140.896 22.8801"
          stroke="#473C35"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M145.117 29.7102C145.379 29.5236 145.715 29.4489 146.014 29.5609"
          stroke="#C0A789"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M141.157 16.6841C141.792 16.0869 142.502 15.6017 143.249 15.3777C143.698 15.2284 144.109 14.8925 144.52 14.7059C145.005 14.5193 145.454 14.4073 145.939 14.2953C146.873 14.1087 147.845 14.1087 148.816 14.1834C149.451 14.258 150.124 14.37 150.722 14.6312C151.88 15.1165 152.777 16.0869 153.449 17.132C153.561 17.2813 153.673 17.4306 153.785 17.5425C154.01 17.7292 154.309 17.7665 154.607 17.8785C156.027 18.3263 156.887 19.8193 156.961 21.2376C157.036 22.0961 157.223 22.9172 157.111 23.7757C156.961 24.8954 156.55 26.0151 156.139 27.0602C155.728 28.1426 155.205 29.1877 154.458 30.0835C154.458 30.3074 153.748 30.83 153.599 31.0166C153.337 31.3525 153.076 31.6884 152.814 31.987C152.59 32.2483 152.366 32.5096 152.067 32.6962C151.843 32.8082 151.506 32.8455 151.32 32.6589C151.245 32.5842 151.17 32.4722 151.133 32.3976C150.946 31.9124 150.946 31.3525 151.058 30.83C151.245 29.7849 151.32 28.7398 151.506 27.6947C151.693 26.8363 151.693 26.1644 151.17 25.3806C150.722 24.7834 150.161 24.2982 149.676 23.7384C148.816 22.7679 148.256 21.4989 148.144 20.2299C147.509 20.6778 146.724 20.9017 145.939 20.939C145.416 20.9764 144.893 20.9017 144.37 20.9764C143.66 21.051 143.025 21.4243 142.427 21.8348C141.867 22.2827 141.381 22.8053 140.896 23.3278C140.709 23.5144 140.485 23.7384 140.223 23.7757C139.476 23.925 139.364 22.3574 139.326 21.8722C139.214 20.9764 139.289 20.0806 139.55 19.2221C139.812 18.289 140.41 17.3932 141.157 16.6841Z"
          fill="#9C9C9C"
        />
        <path
          d="M152.851 17.8413C152.216 17.8786 151.581 18.0653 150.983 18.3265"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M151.656 17.1693C151.282 16.6094 150.759 16.1242 150.124 15.751"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M151.095 17.132C150.647 16.8334 150.124 16.5721 149.638 16.3481"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M153.188 18.5879C153.598 18.7372 153.972 18.9611 154.308 19.2597"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M152.665 18.8491C152.963 19.1104 153.15 19.4463 153.188 19.8569"
          stroke="#838383"
          strokeWidth={0.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M152.515 24.8583C153.001 24.597 153.636 24.6717 153.935 25.1196C154.122 25.4182 154.159 25.8287 154.084 26.2393C154.009 26.6499 153.86 27.0231 153.711 27.3963C153.412 28.0308 153.038 28.6654 152.515 29.0759C151.992 29.4865 151.357 29.6731 150.834 29.4492C150.535 29.2999 151.058 26.9484 151.133 26.6499C151.357 25.866 151.88 25.1569 152.515 24.8583Z"
          fill="#FFE7D8"
        />
        <path
          opacity={0.7}
          d="M152.777 25.8658C152.104 26.3137 151.581 27.0602 151.357 27.9186C151.282 28.1799 151.245 28.4785 151.357 28.7397C151.469 28.5531 151.581 28.4038 151.693 28.2172C151.88 27.9559 152.067 27.6573 152.328 27.508C152.478 27.4334 152.627 27.3961 152.739 27.3214C152.889 27.2468 153.038 27.1721 153.188 27.0602C153.449 26.8362 153.785 26.3137 153.673 25.9031C153.524 25.4552 153.001 25.6792 152.777 25.8658Z"
          fill="black"
          fillOpacity={0.1}
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
