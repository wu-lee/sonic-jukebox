<script lang="ts">
  import { baseUrl } from "$lib/app.js";
  import SongBlock from "$lib/SongBlock.svelte";
  let { data } = $props();
  let { jukebox, session, song } = data;
</script>

<h1>Song: {song.title ?? 'Unknown'}</h1>
<div>
  <SongBlock song={song} />
  <div>
    <img src={session.coverArtURL(song.albumId)} alt="song cover image" />
  </div>
</div>
