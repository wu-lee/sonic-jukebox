import { SubsonicAPI } from 'subsonic-api';

export const config = {
  url: import.meta.env.VITE_SERVER_URL,
  auth: {
    username: import.meta.env.VITE_USERNAME,
    password: import.meta.env.VITE_PASSWORD
  }
};

export async function getCoverArt(
  api: SubsonicAPI,
  artistId: string
): Promise<Record<string, string>> {
  const session = await api.navidromeSession();
  const token = session.subsonicToken;
  const salt = session.subsonicSalt;
  const baseURL = api.baseURL();
  const username = import.meta.env.VITE_USERNAME;
  const artist = await api.getArtist({ id: artistId });
  const urls = artist.artist.album?.map((it: any) => [
    it.id,
    `${baseURL}rest/getCoverArt?c=subsonic-api&v=1.16.1&u=${username}` +
      `&s=${salt}&t=${token}&id=${it.id}&size=120`
  ]);
  return Object.fromEntries(urls);
}

export const api = new SubsonicAPI(config);
