import { api } from '../../../lib/subsonic.js';

export async function load({ params }) {
  const result = await api.getAlbum({ id: params.id });
  return result;
}
