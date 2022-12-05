import fetch from "node-fetch";

function api() {
  const config = {
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },

    referrerPolicy: "no-referrer",
  };

  return {
    get: async (url, customConfig) => {
      const response = await fetch(process.env.API_URL + url, {
        ...config,
        ...customConfig,
        method: "GET",
      });
      const data = await response.json();
      return data;
    },

    post: async (url, customConfig) => {
      const response = await fetch(process.env.API_URL + url, {
        ...config,
        ...customConfig,
        method: "POST",
        body: JSON.stringify(customConfig.body),
      });
      const data = await response.json();
      return data;
    },
  };
}

export async function registerUser(payload) {
  const response = await api().post("/v1/account/sign-up", {
    body: payload,
  });
  return response;
}
