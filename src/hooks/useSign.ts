import { sign } from '@/api/auth.api';
import { useMutation } from '@tanstack/react-query';

export function useSign() {
  return useMutation({
    mutationFn: async ({
      username,
      email,
      password,
    }: {
      username: string;
      email: string;
      password: string;
    }) => sign({ username, email, password }),
  });
}
