import { URL } from './constants';

const cache: any = new Map();

export async function fetchRequest(url: string, method: string) {
  const key = getQueryString(url);

  if (cache.has(key)) {
    return cache.get(key);
  }

  try {
    const result = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json());
    cache.set(key, result);
    return result;
  } catch (err) {
    console.error(err);
  }
}

function getQueryString(url: string) {
  return new URLSearchParams(url).get(URL + '?value') || "";
}
