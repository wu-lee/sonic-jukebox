import { api } from '../../../lib/subsonic.js';

export async function load({ params }) {
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
}
