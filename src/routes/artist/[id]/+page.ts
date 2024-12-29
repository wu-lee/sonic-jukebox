import { api } from '$lib/subsonic.svelte.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const artist = await api.getArtist({ id: params.id });
  const info = await api.getArtistInfo2({ id: params.id });
  return {
    artist: {
      ...artist.artist,
      ...info.artistInfo2
    }
    //    coverArt: urls
  };
};
