import { Story, StoryItem } from '@prisma/client';
import { http } from './axios';

export type IStory = Story & {
	items: StoryItem[];
};

export const getAll = async () => {
	const { data } = await http.get<IStory[]>('/stories');

	return data;
};
