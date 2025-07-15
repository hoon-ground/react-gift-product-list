import axiosInstance from './axiosInstance';
import type { Product } from '@/types/product';

export const fetchProductRanking = async (
  targetType: string,
  rankType: string
): Promise<Product[]> => {
  const res = await axiosInstance.get('/products/ranking', {
    params: {
      targetType,
      rankType,
    },
  });
  return res.data.data;
};
