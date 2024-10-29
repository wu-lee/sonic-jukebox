import { api, getCoverArt } from '$lib/subsonic.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const artist = await api.getArtist({ id: params.id });
  const urls = await getCoverArt(api, artist.artist.id);
  return {
    ...artist,
    coverArt: urls
  };
};
