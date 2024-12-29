<script lang="ts">
  import { type AlbumID3 } from "subsonic-api";
  import { baseUrl } from "$lib/app.ts"
  interface Props {
    album: AlbumID3;
    coverArtUrl: string;
  }
  let { album, coverArtUrl }: Props = $props();
</script>

<div>
  <h1>Album: <a href={`${baseUrl}/album/${album.id}`}>{album.name ?? 'Unknown'}</a></h1>
  <div>
    <img
      src={coverArtUrl}
      alt="album cover art"
    />
    <!-- img src={album.artistImageUrl ?? ''} /-->
    <!-- FIXME not working
    <div>
      <img src={album.url} alt="album cover art">
    </div>
    -->
  </div>
  <ul>
    <li>Artist: <a href={`../../artist/${album.artistId}`}>{album.artist}</a></li>
    <li>Tracks: {album.songCount}</li>
    <li>User Rating: {album.userRating}</li>
    <li>Year: {album.year}</li>
    <li>Duration: {album.duration}s</li>
    <li>Created: {new Date(album.created).toLocaleString()}</li>
  </ul>
</div>

