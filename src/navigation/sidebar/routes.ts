export enum ROUTES_TYPE {
  management = '/management',
  cms = '/cms',
  auth = '/auth',
  questions = '/questions',
  quizes = '/quizes',
  dashboard = '/dashboard',
  profile = '/profile',
  settings = '/settings',
}
export const ROUTES = {
  dashboard: `${ROUTES_TYPE.dashboard}/analytics`,
  profile: `${ROUTES_TYPE.dashboard}/profile-settings`,
  users: `${ROUTES_TYPE.dashboard}/users`,
  project: `${ROUTES_TYPE.dashboard}/project`,
  projectList: `${ROUTES_TYPE.dashboard}/project/list`,
  user: {
    provider: {
      list: `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.management}/user/provider/list`,
      edit: (id: string) =>
        `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.management}/user/provider/edit/${id}`,
      view: (id: string) =>
        `${ROUTES_TYPE.dashboard}${ROUTES_TYPE.management}/user/provider/view/${id}`,
    },
    customer: {
      list: `${ROUTES_TYPE.dashboard}/users/customer/list`,
      add: `${ROUTES_TYPE.dashboard}/users/customer/add`,
      edit: (id: string) => `${ROUTES_TYPE.dashboard}/users/customer/edit/${id}`,
      resetPassword: (id: string) => `${ROUTES_TYPE.dashboard}/users/customer/reset-password/${id}`,
    },
  },
  projectManagement: {
    project: {},
    folder: {
      list: `${ROUTES_TYPE.dashboard}/project/folder/list`,
      details: `${ROUTES_TYPE.dashboard}/project/folder/details`,
    },
  },

  auth: {
    login: `${ROUTES_TYPE.auth}/login`,
    signup: `${ROUTES_TYPE.auth}/sign-up`,
    forgetPassword: `${ROUTES_TYPE.auth}/forget-password`,
    resetPassword: (token: string) => `${ROUTES_TYPE.auth}/reset-password/${token}`,
  },
};
