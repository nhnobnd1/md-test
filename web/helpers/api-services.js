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
      const response = await fetch(url, {
        ...config,
        ...customConfig,
        method: "GET",
      });
      return response;
    },

    post: async (url, customConfig) => {
      const response = await fetch(url, {
        ...config,
        ...customConfig,
        method: "POST",
      });
      return response;
    },
  };
}

export async function registerUser(payload) {
  console.log(payload);
  const response = await api().get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  console.log(response);
}
