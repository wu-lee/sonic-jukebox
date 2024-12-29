<script lang="ts">
  import { baseUrl } from "$lib/app.js";
  import { JukeboxControl } from "$lib/subsonic.svelte.js";
  import SongBlock from "$lib/SongBlock.svelte";
  let { data } = $props();
  let { jukebox, session, song } = data;
</script>

<h1>Song: {song.title ?? 'Unknown'}</h1>
<div>
  <div class="navigation">
    <button on:click={() => jukebox.add(song.id)} >
      add
    </button>
  </div>
  <SongBlock song={song} />
  <div>
    <img src={session.coverArtURL(song.albumId)} alt="song cover image" />
  </div>
</div>
