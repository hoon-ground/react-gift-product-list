import axiosInstance from './axiosInstance';
import type { Theme } from '@/types/theme';

export const fetchThemes = async (): Promise<Theme[]> => {
  const res = await axiosInstance.get('/themes');
  return res.data.data;
};
