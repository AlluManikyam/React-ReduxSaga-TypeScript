export enum ROLE {
  ADMIN = "admin",
  USER = "user",
}

export interface User {
  first_name: string;
  last_name: string;
  role: ROLE;
}
