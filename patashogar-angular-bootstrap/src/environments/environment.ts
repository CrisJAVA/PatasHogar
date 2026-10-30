/** Poner false y conectar Spring Boot cuando los endpoints estén implementados. */
export const environment = {
  production: false,
  demoMode: true,
  apiBaseUrl: '/api/v1'
} as const;
