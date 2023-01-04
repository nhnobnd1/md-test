const Logo = {
  LogoMooseDesk: new URL("./logo/logoBase.png", import.meta.url).href,
  LogoIcon: new URL("./logo/logoIcon.png", import.meta.url).href,
};

const Images = {
  Logo,
  NotFound: new URL("./404.svg", import.meta.url).href,
};

export default Images;
