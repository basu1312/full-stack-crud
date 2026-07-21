import axios from 'axios';
import { CustomerSchema } from '../schemas/customerSchema';

const API_BASE_URL = '/api/customers';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const customerAPI = {
  getAll: async () => {
    const response = await apiClient.get('/');
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/${id}`);
    return response.data;
  },

  create: async (customer) => {
    const validated = CustomerSchema.omit({ id: true }).parse(customer);
    const response = await apiClient.post('/', validated);
    return response.data;
  },

  update: async (id, customer) => {
    const validated = CustomerSchema.omit({ id: true }).parse(customer);
    const response = await apiClient.put(`/${id}`, validated);
    return response.data;
  },

  delete: async (id) => {
    await apiClient.delete(`/${id}`);
  },
};

export default apiClient;
