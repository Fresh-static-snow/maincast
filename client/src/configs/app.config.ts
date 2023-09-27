export interface IAppConfig {
  baseUrl: string;
}

const getAppConfig = () => {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL ?? 'http://localhost:5001';

  if (!baseUrl) {
    throw new Error("Base url not defined");
  }
  const config: IAppConfig = {
    baseUrl,
  };

  return config;
};

export const appConfig: IAppConfig = getAppConfig();
