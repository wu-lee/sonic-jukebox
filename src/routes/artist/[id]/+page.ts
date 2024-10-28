import { api } from '$lib/subsonic.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const artist = await api.getArtist({ id: params.id });
  const session = await api.navidromeSession();
  const art = await api.getCoverArt({ id: params.id });
  return {
    ...artist,
    token: session.subsonicToken,
    salt: session.subsonicSalt,
    baseURL: api.baseURL,
    art
  };
};
