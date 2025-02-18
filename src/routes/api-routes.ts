const AUTH_ROUTES = {
  LOGIN: '/user/signin?method=ML',
  SIGNUP: '/user/signup',
  VALIDATE_OTP: '/user/validate-otp',
  REGENERATE_OTP: '/user/regenerate-otp',
} as const;

export const API_ROUTES = { ...AUTH_ROUTES } as const;
