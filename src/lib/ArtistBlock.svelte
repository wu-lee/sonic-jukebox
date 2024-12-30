<script lang="ts">
  import { type ArtistID3, type ArtistInfoBase } from "subsonic-api";
  interface Props {
    artist: ArtistInfoBase & ArtistID3;
  }
  let { artist }: Props = $props();
</script>

<div class="artist">
  <h1>Artist: {artist.name ?? 'Unknown'}</h1>
  <div class="image">
    <img src={artist.smallImageUrl} alt="artist">
  </div>
  <div>
    {@html artist.biography}
  </div>
</div>
