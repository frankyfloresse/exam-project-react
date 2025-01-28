import { IUser } from './IUser.ts';

export interface IUsersPaginated {
    users: IUser[];
    total: number;
    skip: number;
    limit: number;
}
