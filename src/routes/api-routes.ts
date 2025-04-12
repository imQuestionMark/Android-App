const AUTH = {
  LOGIN: '/user/signin?method=ML',
  SIGNUP: '/user/signup',
  VALIDATE_OTP: '/user/validate-otp',
  REGENERATE_OTP: '/user/regenerate-otp',
} as const;

const ONBOARDING = {
  ADDITIONAL_INFO: '/user/personal-data',
};

const LOCATION = {
  LOCATION: {
    GET: '/location/list',
    POST: '/location/create',
  },
} as const;

const JOB = {
  JOB_ROLES: {
    GET: '/job-roles/getall',
    POST: '/job-roles/add-jobrole',
  },
  JOB: {
    GET: '/job/get-job/',
  },
} as const;

const USER = {
  GET_USER: '/user/fetch-user',
  PERSONAL_DATA: '/user/personal-data-protected',
};

const WALL = {
  BASIC_INFORMATION: '/wall/basic-info/',
};

export const API_ROUTES = {
  ...AUTH,
  ...LOCATION,
  ...JOB,
  ...ONBOARDING,
  ...USER,
  ...WALL,
} as const;
