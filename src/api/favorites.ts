export async function getFavorites(token: string | null) {
  if (!token) {
    throw new Error('No token found');
  }

  const res = await fetch('http://localhost:3333/favorites', {
    headers: {
      Authorization: `Bearer ${token}`,
      credentials: 'include',
    },
  });
  if (!res.ok) throw new Error('Request Error');
  const data = await res.json();
  return data;
}

export async function deleteFavorite(id: string, token: string | null) {
  if (!token) {
    throw new Error('No token found');
  }

  const res = await fetch(`http://localhost:3333/favorite/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      credentials: 'include',
    },
  });
  if (!res.ok) throw new Error('Request Error');

  return;
}
