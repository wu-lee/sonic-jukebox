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
        <ul>
          <li>
            <div class="controls">
              <button on:click={() => jukebox.remove(index)} >
                remove
              </button>
            </div>
          </li>
          <li>Title: <a href={`../song/${entry.id}`}>{entry.title ?? 'Unknown'}</a></li>
          <li>By: <a href={`../artist/${entry.artistId}`}>{entry.artist}</a></li>
          <li>Album: <a href={`../album/${entry.parent}`}>{entry.album}</a> disk {entry.diskNumber}</li>
          <li>Duration: {entry.duration}s</li>
          <li>Year: {entry.year}</li>
          <li>BPM: {entry.bpm}</li>
          <li>Bit Rate: {entry.bitRate}</li>
          <li>Path: {entry.path}</li>
          {#if entry.genres.length > 0 }
            <li><ul>
              {#each entry.genres as genre}
                <li>{genre}</li>
              {/each}
            </ul></li>
          {/if}
          <li>Track: {entry.track}</li>
          <li>Created: {new Date(entry.created).toLocaleString()}</li>
        </ul>
      {/each}
    </li>
  </ul>
  <div>
  </div>
</div>
