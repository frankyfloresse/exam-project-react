// import { ITokens } from '../../types/ITokens.ts';
import { IUserWithTokens } from '../../types/IUserWithTokens.ts';
import { axiosInstance } from '../axiosInstance.ts';

interface ILoginRequest {
    username: string;
    password: string;
    expiresInMins: number;
}

// const saveTokens = (tokens: ITokens) => {
//     localStorage.setItem('access_token', tokens.accessToken);
//     localStorage.setItem('refresh_token', tokens.refreshToken);
// };

export const login = async (request: ILoginRequest): Promise<IUserWithTokens> => {
    const { data } = await axiosInstance.post<IUserWithTokens>('/auth/login', request);
    // saveTokens(data);
    return data;
};
