const env = {
  APP_NAME: "",
  DEFAULT_PAGE_SIZE: 10,
  API_URL: "http://localhost",
  API_VERSION: 1,
} as ENV;

for (const key in import.meta.env) {
  if (key.indexOf("VITE_") === 0) {
    const newKey = key.replace("VITE_", "") as keyof ENV;
    if (!import.meta.env[newKey]) {
      env[newKey] = import.meta.env[key] as never;
    }
    continue;
  }

  env[key as keyof ENV] = import.meta.env[key] as never;
}

export default env;
