export const APP_CONFIG = {
  name: 'SpoolKeeper',
  version: '1.0.0',
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
    timeout: 10000,
  },
  pagination: {
    defaultPageSize: 25,
    pageSizeOptions: [10, 25, 50, 100],
  },
  theme: {
    drawerWidth: 280,
  },
} as const; 