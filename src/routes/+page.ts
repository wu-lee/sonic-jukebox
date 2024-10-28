import { api } from '$lib/subsonic.js';

export async function load({ params }) {
  const result = await api.getIndexes();
  return result;
}
