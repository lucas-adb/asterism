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

export async function sign({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) {
  const response = await api.post('/user', { username, email, password });
  return response.data;
}
