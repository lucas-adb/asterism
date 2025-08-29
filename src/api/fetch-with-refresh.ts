// src/api/fetch-with-refresh.ts
export async function fetchWithRefresh(
  fetchFn: (token: string) => Promise<Response>,
  accessToken: string,
  setToken: (token: string) => void
) {
  let res = await fetchFn(accessToken);
  if (res.status === 401) {
    const refreshRes = await fetch('http://localhost:3333/user/refresh', {
      method: 'POST',
      credentials: 'include',
    });
    if (refreshRes.ok) {
      const { token } = await refreshRes.json();
      setToken(token);
      res = await fetchFn(token);
    }
  }
  return res;
}

// export async function fetchWithRefresh(
//   url: string,
//   options: RequestInit,
//   setToken: (token: string) => void
// ) {
//   let res = await fetch(url, { ...options, credentials: 'include' });
//   if (res.status === 401) {
//     const refreshRes = await fetch('http://localhost:3333/user/refresh', {
//       method: 'POST',
//       credentials: 'include',
//     });
//     if (refreshRes.ok) {
//       const { token } = await refreshRes.json();
//       setToken(token);
//       options.headers = {
//         ...options.headers,
//         Authorization: `Bearer ${token}`,
//       };
//       res = await fetch(url, { ...options, credentials: 'include' });
//     }
//   }
//   return res;
// }
