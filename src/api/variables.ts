type Config = {
  baseUrl: string;
  serverName: string;
  appUrl: string;
};

const config: Config = {
  baseUrl: `${process.env.API_BASE_URL}`,
  serverName: `My App`,
  appUrl: `${process.env.REACT_APP_URL}`,
};

const apiEndPoints = {
  users: {
    login: `/users/login`,
    addUser: `/users/signup`,
    addUserWithRole: `/users/assign-role`,
    userById: (id: string) => `/users/${id}`,
    updateProfile: (userId: string) => `/users/${userId}/update`,
  },
};

export { config, apiEndPoints };
