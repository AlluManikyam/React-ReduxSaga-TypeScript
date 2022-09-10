type Config = {
  baseUrl: string;
  serverName: string;
};

const config: Config = {
  baseUrl: `${process.env.REACT_APP_API_BASE_URL}`,
  serverName: `My App`,
};

const apiEndPoints = {
  users: {
    login: `/users/login`,
    users: (limit: number) => `/user?limit=${limit}`,
    addUser: `/users/signup`,
    userById: (id: string) => `/users/${id}`,
  },
};

export { config, apiEndPoints };
