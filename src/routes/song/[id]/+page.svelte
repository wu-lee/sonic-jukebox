<script lang="ts">
  export let data;
</script>

<h1>Song: {data.song.title ?? 'Unknown'}</h1>
<div>
  <div>
    By: <a href={data.song.artistId}>{data.song.artist}</a>
  </div>
  <div>
    <img src={data.song.coverArt ?? ''} />
  </div>
</div>
