const Logo = {
  LogoMooseDesk: new URL("./logo/logoBase.png", import.meta.url).href,
  LogoIcon: new URL("./logo/logoIcon.png", import.meta.url).href,
  LogoBaseInside: new URL("./logo/logo-base-inside.jpg", import.meta.url).href,
  ButtonGoogle: new URL("./logo/btn_google_signin_2.png", import.meta.url).href,
  SenderFailure: new URL("./logo/sender-failure.svg", import.meta.url).href,
  SenderSuccessful: new URL("./logo/sender-successful.svg", import.meta.url)
    .href,
  NotFound: new URL("./logo/notfound.svg", import.meta.url).href,
  ReportError: new URL("./logo/report-error.svg", import.meta.url).href,
};

const Images = {
  Logo,
  NotFound: new URL("./404.svg", import.meta.url).href,
};

export default Images;
