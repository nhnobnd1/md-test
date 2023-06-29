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
