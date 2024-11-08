export const APP_CONFIG = () => {
  return {
    APP_PORT: process.env.APP_PORT || 6101,
    JWT_SECRET: process.env.JWT_SECRET || 'your_secret_key',
    JWT_EXPIRE_IN: process.env.JWT_EXPIRE_IN || '1d',
  };
};
