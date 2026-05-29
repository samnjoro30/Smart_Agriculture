import { cookies } from 'next/headers';

const BASE_URL = 'https://smart-agriculture-zkky.onrender.com';

async function request(method: string, url: string, body?: any) {
  const cookieStore = await cookies();

  const res = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      // Now .toString() will work because cookieStore is resolved
      Cookie: cookieStore.toString(),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || 'Request failed');
  }

  return data;
}

export const serverAPI = {
  get: (url: string) => request('GET', url),
  post: (url: string, body?: any) => request('POST', url, body),
  patch: (url: string, body?: any) => request('PATCH', url, body),
  delete: (url: string) => request('DELETE', url),
};
