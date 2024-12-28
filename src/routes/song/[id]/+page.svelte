<script lang="ts">
  import { JukeboxControl } from "$lib/subsonic.svelte.js";
  export let data;
  const jukebox = new JukeboxControl();
</script>

<h1>Song: {data.song.title ?? 'Unknown'}</h1>
<div>
  <div class="navigation">
    <button on:click={() => jukebox.add(data.song.id)} >
      add
    </button>
  </div>
  <ul>
    <li>By: <a href={`../artist/${data.song.artistId}`}>{data.song.artist}</a></li>
    <li>Album: <a href={`../album/${data.song.parent}`}>{data.song.album}</a> disk {data.song.diskNumber}</li>
    <li>Duration: {data.song.duration}s</li>
    <li>Year: {data.song.year}</li>
    <li>BPM: {data.song.bpm}</li>
    <li>Bit Rate: {data.song.bitRate}</li>
    <li>Path: {data.song.path}</li>
    {#if data.song.genres.length > 0 }
      <li><ul>
        {#each data.song.genres as genre}
          <li>{genre}</li>
        {/each}
      </ul></li>
    {/if}
    <li>Track: {data.song.track}</li>
    <li>Created: {new Date(data.song.created).toLocaleString()}</li>
  </ul>
  <div>
    <img src={data.url} alt="song cover image" />
  </div>
</div>
