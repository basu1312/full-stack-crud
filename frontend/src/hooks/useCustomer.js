import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { customerAPI } from '../services/customerAPI';

const CUSTOMERS_QUERY_KEY = ['customers'];

export const useCustomers = () => {
  return useQuery({
    queryKey: CUSTOMERS_QUERY_KEY,
    queryFn: () => customerAPI.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCustomer = (id) => {
  return useQuery({
    queryKey: [...CUSTOMERS_QUERY_KEY, id],
    queryFn: () => customerAPI.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customer) => customerAPI.create(customer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMERS_QUERY_KEY });
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, customer }) => customerAPI.update(id, customer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMERS_QUERY_KEY });
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => customerAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMERS_QUERY_KEY });
    },
  });
};
