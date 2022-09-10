export enum ROLE {
  ADMIN = "admin",
  USER = "user",
}

export interface User {
  firstName: string;
  lastName: string;
  role: ROLE;
}
