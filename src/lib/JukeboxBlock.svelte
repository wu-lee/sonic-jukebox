<script lang="ts">
  import { baseUrl } from '$lib/app.ts';
  import JukeboxToolbar from "$lib/JukeboxToolbar.svelte";
  import SongBlock from "$lib/SongBlock.svelte";
  import { page } from "$app/stores";
  let { jukebox } = $page.data;
</script>

<div class="jukebox">
  <h1>Playlist: {jukebox.playing? "playing": "stopped"}
    index {jukebox.currentIndex}
    at position {jukebox.position} gain {jukebox.gain}</h1>
  <JukeboxToolbar />
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
</div>
