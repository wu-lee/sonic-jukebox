<script lang="ts">
  export let data;
</script>

<h1>Album: {data.album.name ?? 'Unknown'}</h1>
<div>
  <div>
    <img src={data.album.artistImageUrl ?? ''} />
  </div>
  <ul>
    <li>Artist: <a href={`../../artist/${data.album.artistId}`}>{data.album.artist}</a></li>
    <li>Tracks: {data.album.songCount}</li>
    <li>User Rating: {data.album.userRating}</li>
    <li>Year: {data.album.year}</li>
    <li>Duration: {data.album.duration}s</li>
    <li>Created: {new Date(data.album.created).toLocaleString()}</li>
  </ul>
  <div>
    <img src={data.url} alt="album cover art">
  </div>
  <ul>
    {#each data.album.song as song}
      <li>
        <ul>
          <li><a href={`../../song/${song.id}`}>{song.title}</a></li>
          <li>Duration: {song.duration}s</li>
          <li>Year: {song.year}</li>
          <li>BPM: {song.bpm}</li>
          <li>Bit Rate: {song.bitRate}</li>
          <li>Path: {song.path}</li>
          {#if song.genres.length > 0 }
            <li>Genres: <ul>
              {#each song.genres as genre}
                <li>{genre.name}</li>
              {/each}
            </ul></li>
          {/if}
          <li>Track: {song.track}</li>
          <li>Created: {new Date(song.created).toLocaleString()}</li>
        </ul>
      </li>
      
    {/each}
  </ul>
</div>
