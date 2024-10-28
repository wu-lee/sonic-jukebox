import { api } from '$lib/subsonic.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const result = await api.getIndexes();
  return result;
};
