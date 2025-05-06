import { UsersAttributes } from '../../infrastructure/models/users.model';

export interface UsersInputDTO {
  email: string;
  name: string;
  username: string;
  password: string;
  role_pkid: number;
}

export interface UsersResultDTO extends UsersAttributes {}
