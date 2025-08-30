export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await fetch('http://localhost:3333/user/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Invalid login');
  return res.json();
}
