import { useQuery } from '@tanstack/react-query';

import axiosInstance from '../../API/axiosInstance';

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    queryFn: async () => {
      try {
        const res = await axiosInstance.get('/farm/username', {
          withCredentials: true,
        });
        return res.data;
      } catch (err: any) {
        if (err.response?.status === 401) {
          console.warn('Unauthorized access - user not logged in');
          return null; // treat as no user
        }
        console.error('Error fetching user data', err);
        throw err; // rethrow for react-query to handle
      }
    },
    retry: false, // prevent infinite retry on 401
  });
};
