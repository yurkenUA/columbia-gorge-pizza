import { User } from '@prisma/client';
import { http } from './axios';

export const getMe = async () => {
	const { data } = await http.get<User>('/auth/me');

	return data;
};
