<script lang="ts">
  import { config } from '$lib/subsonic.js';
  export let data;
  const username = config.auth.username;
  const token = '';
</script>

<nav><a href="../..">Index</a></nav>
<h1>{data.artist.name ?? 'Unknown'}</h1>
<div>
  <!-- div{JSON.stringify(data.artist)}/div -->
  <ul>
    {#each data.artist.album as album}
      <li>
        <img
          src={`${data.baseURL()}rest/getCoverArt?c=subsonic-api&v=1.16.1&u=${username}&s=${data.salt}&t=${data.token}&id=${album.id}&size=120`}
          alt="album cover art"
        />
        <a href={`../album/${album.id}`}>{album.name}</a>
      </li>
    {/each}
  </ul>
</div>
