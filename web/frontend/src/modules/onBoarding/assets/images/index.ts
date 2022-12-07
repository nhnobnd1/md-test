const Images = {
  get rin() {
    return new URL("./rin.jpg", import.meta.url).href;
  },
};

export default Images;
