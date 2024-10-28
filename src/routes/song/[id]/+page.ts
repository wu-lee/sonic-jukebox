import { api } from '$lib/subsonic.js';
import type { PageLoad } from './$types.js';

export const load: PageLoad = async ({ params }) => {
  const result = await api.getSong({ id: params.id });
  return result;
};
