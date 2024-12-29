<script lang="ts">
  //  import { PageData } from '$types';
  import { baseUrl } from "$lib/app.js";
  import ArtistBlock from "$lib/ArtistBlock.svelte";
  import AlbumBlock from "$lib/AlbumBlock.svelte";
  let { data } = $props();
  let { jukebox, session, artist } = data;
</script>

<nav><a href={`${baseUrl}/`}>Index</a></nav>
<ArtistBlock artist={artist} />

<h2>Albums</h2>
<div>
  <ul>
    {#each artist.album as album}
      <li>{album.name}
        <AlbumBlock album={album} coverArtUrl={session.coverArtURL(album.id)} />
      </li>
    {/each}
  </ul>
</div>
