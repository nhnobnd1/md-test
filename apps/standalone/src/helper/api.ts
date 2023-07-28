import { MerchantRating, MerchantRepository } from "@moose-desk/repo";
import { lastValueFrom } from "rxjs";

export const getMerchantRatingApi = (): Promise<MerchantRating> => {
  return new Promise((resolve, reject) => {
    lastValueFrom(MerchantRepository().getMerchantRating())
      .then(({ data }) => resolve(data.data))
      .catch((error) => reject(error));
  });
};

export const postMerchantRatingApi = (
  params: MerchantRating
): Promise<MerchantRating> => {
  return new Promise((resolve, reject) => {
    lastValueFrom(MerchantRepository().postMerchantRating(params))
      .then(({ data }) => resolve(data.data))
      .catch((error) => reject(error));
  });
};
