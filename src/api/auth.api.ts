import { api } from './client';

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await api.post('/user/auth', { email, password });
  return response.data;
}
