<script lang="ts">
  export let data;
</script>

<h1>Album: {data.album.name ?? 'Unknown'}</h1>
<div>
  <div>
    <img src={data.album.artistImageUrl ?? ''} />
  </div>
  <div>
    Artist: <a href={`../../artist/${data.album.artistId}`}>{data.album.artist}</a>
    <ul>
      {#each data.album.song as song}
        <li>
          <a href={`../../song/${song.id}`}>{song.title}</a>
        </li>
      {/each}
    </ul>
  </div>
</div>
