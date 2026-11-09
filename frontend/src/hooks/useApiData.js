import { useQuery, useMutation } from '@tanstack/react-query';

export const useApiData = (key, queryFn, options = {}) => useQuery({
  queryKey: Array.isArray(key) ? key : [key],
  queryFn,
  ...options,
});

export const useApiMutation = (mutationFn, options = {}) => useMutation({
  mutationFn,
  ...options,
});
