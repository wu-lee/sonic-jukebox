<script lang="ts">
  import { SubsonicSession, JukeboxControl, api } from '$lib/subsonic.svelte.ts';
  //  export let data: PageLoad;
  
  let jukebox = new JukeboxControl(1);
  jukebox.get();
</script>

<h1>Playlist: {jukebox.playing? "playing": "stopped"}
  index {jukebox.currentIndex}
  at position {jukebox.position} gain {jukebox.gain}</h1>
<div>
  {JSON.stringify(jukebox.entry)}
</div>
<div>
  <ul>
    {#each jukebox.entry as entry, index}
      <li>{entry.artist}</li>
      <li>{entry.title}</li>
      <li>{entry.album}</li>
      <li>
        <button on:click={() => jukebox.remove(index)} >
          remove
        </button>
      </li>
    {/each}
  </ul>
  <div>
    <button on:click={() => jukebox.start()} >
      start
    </button>
    <button on:click={() => jukebox.stop()} >
      stop
    </button>
    <button on:click={() => jukebox.skipSong()} >
      skip song
    </button>
    <button on:click={() => jukebox.clear()} >
      clear playlist
    </button>
    <button on:click={() => jukebox.shuffle()} >
      shuffle playlist
    </button>
    <button on:click={() => jukebox.add("7a97f7af162a1962d252b195f737cd9f")} >
      add
    </button>
  </div>
  <div>
  </div>
</div>
