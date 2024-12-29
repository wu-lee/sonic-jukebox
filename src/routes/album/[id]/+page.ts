import { api } from '$lib/subsonic.svelte.js';
import type { PageLoad } from './$types.js';

export const load: PageLoad = async ({ params }) => {
  const album = await api.getAlbum({ id: params.id });
  return { album: album.album };
};
