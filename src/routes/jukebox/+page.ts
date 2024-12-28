import { api, SubsonicSession } from '$lib/subsonic.svelte.js';
import type { JukeboxStatus, SubsonicAPI } from 'subsonic-api';
import type { PageLoad } from './$types.js';

export const load: PageLoad = async ({ params }) => {
  const session = await SubsonicSession.load();
  return {};
};
