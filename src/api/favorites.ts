import type { CreateFavoriteBody, FavoritesFilters } from '@/types/favorite';

// export async function getFavorites(token: string, filters: FavoritesFilters) {
//   const params = new URLSearchParams();
//   if (filters.page) params.set('page', filters.page.toString());
//   if (filters.limit) params.set('limit', filters.limit.toString());
//   if (filters.sortOrder) params.set('sortOrder', filters.sortOrder.toString());

//   if (filters.type && filters.type !== 'ALL')
//     params.set('type', filters.type.toString());

//   if (filters.search) {
//     params.set('search', filters.search?.toString());
//   }

//   const res = await fetch(
//     `http://localhost:3333/favorites?${params.toString()}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       credentials: 'include',
//     }
//   );
//   if (!res.ok) {
//     if (res.status === 401) {
//       throw new Error('Unauthorized');
//     }

//     throw new Error('Request Error');
//   }

//   const data = await res.json();
//   return data;
// }

export async function getFavorites(token: string, filters: FavoritesFilters) {
  const params = new URLSearchParams();
  if (filters.page) params.set('page', filters.page.toString());
  if (filters.limit) params.set('limit', filters.limit.toString());
  if (filters.sortOrder) params.set('sortOrder', filters.sortOrder.toString());

  if (filters.type && filters.type !== 'ALL')
    params.set('type', filters.type.toString());

  if (filters.search) {
    params.set('search', filters.search?.toString());
  }

  return fetch(`http://localhost:3333/favorites?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });
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
