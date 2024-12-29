<script lang="ts">
  //  import ArtistBlock from "$lib/ArtistBlock.svelte";
  import { baseUrl } from "$lib/app.js";
  import AlbumBlock from "$lib/AlbumBlock.svelte";
  import SongBlock from "$lib/SongBlock.svelte";

  let { data } = $props();
  let { jukebox, session, album } = data;
</script>

<nav><a href={`${baseUrl}/`}>Index</a></nav>
<div>
  <AlbumBlock album={album} coverArtUrl={session.coverArtURL(album.id)} />

  <ul>
    {#each album.song as song}
      <li>
        <SongBlock song={song} />
      </li>
      
    {/each}
  </ul>
</div>
