import { SubsonicSession, api } from '$lib/subsonic.svelte.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const session = await SubsonicSession.load();
  const artist = await api.getArtist({ id: params.id });
  const artIds = artist.artist.album?.map((it) => it.id);
  const urls = session.coverArtURLs(artIds ?? []);
  const info = await api.getArtistInfo2({ id: params.id });
  return {
    ...artist,
    info,
    coverArt: urls
  };
};
