import { getFavorites } from '@/api/favorites';
import { useQuery } from '@tanstack/react-query';

export function Test() {
  const token = localStorage.getItem('token');

  const { data, error, isLoading } = useQuery({
    queryKey: ['testMessage'],
    queryFn: () => getFavorites(token),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <div>
      <h1>Mensagem da API:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
