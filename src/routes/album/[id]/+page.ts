import { api, SubsonicSession } from '$lib/subsonic.js';
import type { PageLoad } from './$types.js';

export const load: PageLoad = async ({ params }) => {
  const session = await SubsonicSession.load();
  const album = await api.getAlbum({ id: params.id });
  const url = session.coverArtURL(params.id);
  return { ...album, url };
};
