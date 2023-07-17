import { TokenManager } from "@moose-desk/core";
import { UploadFileResponse } from "@moose-desk/repo";
import instance from "src/api";

export const postImageApi = (payload: any): Promise<UploadFileResponse> => {
  return new Promise((resolve, reject) => {
    return instance
      .post(
        `/ticket/attachments`,
        {
          file: payload,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${TokenManager.getToken("base_token")}`,
          },
        }
      )
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};
