export interface User {
  id: string;
  firstName: string;
  secondName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  role: UserRoles;
}

export enum UserRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
