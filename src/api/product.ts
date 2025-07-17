import axiosInstance from './axiosInstance';
import type { Product, ProductSummary } from '@/types/product';

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

export const fetchProductSummary = async (productId: number): Promise<ProductSummary> => {
  const res = await axiosInstance.get(`/products/${productId}/summary`);
  return res.data.data;
};
