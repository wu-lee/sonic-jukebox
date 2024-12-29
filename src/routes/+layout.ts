import { JukeboxControl, SubsonicSession } from '$lib/subsonic.svelte.js';
import { browser } from '$app/environment';
import type { LayoutLoad } from './$types.js';

export const load: LayoutLoad = async () => {
  const session = await SubsonicSession.load();
  const jukebox = new JukeboxControl();

  if (browser) jukebox.autoRefresh(true); // don't want this on the server!

  return {
    jukebox,
    session
  };
};
