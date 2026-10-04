export const environment = {
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
  appName: 'LoanFlow',
  appVersion: '1.0.0',
};
