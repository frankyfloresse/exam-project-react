import { IAddress } from './IAddress.ts';
import { ICompany } from './ICompany.ts';

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    ip: string;
    address: IAddress;
    macAddress: string;
    university: string;
    company: ICompany;
    ein: string;
    ssn: string;
    userAgent: string;
    role: string;
}
