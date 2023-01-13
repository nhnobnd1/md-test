import country from "./country.json";

const countryList = { country };

export default countryList;

export type Country = {
  name: string;
  code: string;
  continent: string;
  phoneNumberPrefix: number;
};
