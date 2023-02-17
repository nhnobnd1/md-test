import country from "./country.json";

const countryList = { country };

export default countryList;

export type Country = {
  name: string;
  code: string;
  continent: string;
  phoneNumberPrefix: number;
};
export const regexPhoneValidate = /^(?:[0-9]{1,4})+-(?:[0-9]{4,11})$/;
