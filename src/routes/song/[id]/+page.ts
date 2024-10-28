import { api } from '../../../lib/subsonic.js';

export async function load({ params }) {
  const result = await api.getSong({ id: params.id });
  return result;
}
