<script lang="ts">
  import { type Child } from 'subsonic-api';
  import { baseUrl } from '$lib/app.ts';
  import { page } from '$app/stores';
  interface Props {
    song: Child;
    data: any;
  }
  let { song }: Props = $props();
  let { jukebox } = $page.data;
</script>

<div class="song-block">
  <div class="navigation">
    <button on:click={() => jukebox.add(song.id)} >
      add
    </button>
  </div>
  <ul class="song-attributes">
    <li><a href={`../../song/${song.id}`}>{song.title}</a></li>
    <li>By: <a href={`${baseUrl}/artist/${song.artistId}`}>{song.artist}</a></li>
    <li>Album: <a href={`${baseUrl}/album/${song.parent}`}>{song.album}</a>
      {#if song.diskNumber }
        disk {song.diskNumber}
      {/if}
    </li>
    <li>Duration: {song.duration}s</li>
    <li>Year: {song.year}</li>
    <li>BPM: {song.bpm}</li>
    <li>Bit Rate: {song.bitRate}</li>
    <li>Path: {song.path}</li>
    {#if song.genres.length > 0 }
      <li>Genres:
        <ul>
          {#each song.genres as genre}
            <li>{genre.name}</li>
          {/each}
        </ul>
      </li>
    {/if}
    <li>Track: {song.track}</li>
    <li>Created: {new Date(song.created).toLocaleString()}</li>
  </ul>
</div>

<style>
</style>
