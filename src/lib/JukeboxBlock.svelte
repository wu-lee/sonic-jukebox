<script lang="ts">
  import { baseUrl } from '$lib/app.ts';
  import SongBlock from "$lib/SongBlock.svelte";
  import { page } from "$app/stores";
  let { jukebox } = $page.data;
</script>

<h1>Playlist: {jukebox.playing? "playing": "stopped"}
  index {jukebox.currentIndex}
  at position {jukebox.position} gain {jukebox.gain}</h1>
<div>
  <div class="navigtion">
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
  <ul>
    <li>
      {#each jukebox.entry as entry, index}
        <div class="controls">
          <button on:click={() => jukebox.remove(index)} >
            remove
          </button>
        </div>
        <SongBlock song={entry} />
      {/each}
    </li>
  </ul>
  <div>
  </div>
</div>
