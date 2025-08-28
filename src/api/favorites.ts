import type { CreateFavoriteBody } from '@/types/favorite';

export async function getFavorites(token: string) {
  const res = await fetch('http://localhost:3333/favorites', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Request Error');
  const data = await res.json();
  return data;
}

export async function deleteFavorite(id: string, token: string) {
  const res = await fetch(`http://localhost:3333/favorite/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Request Error');

  return;
}

export async function createFavorite(data: CreateFavoriteBody, token: string) {
  const res = await fetch('http://localhost:3333/favorite', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Request Error');

  return;
}

export async function editFavorite(
  id: string,
  data: CreateFavoriteBody,
  token: string
) {
  const res = await fetch(`http://localhost:3333/favorite/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Request Error');

  return;
}
