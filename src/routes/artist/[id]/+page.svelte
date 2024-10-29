<script lang="ts">
  import { config } from '$lib/subsonic.js';
  export let data;
</script>

<nav><a href="../..">Index</a></nav>
<h1>{data.artist.name ?? 'Unknown'}</h1>
<div>
  <!-- div{JSON.stringify(data.artist)}/div -->
  <ul>
    {#each data.artist.album as album}
      <li>
        <img
          src={data.coverArt[album.id]}
          alt="album cover art"
        />
        <a href={`../album/${album.id}`}>{album.name}</a>
      </li>
    {/each}
  </ul>
</div>
