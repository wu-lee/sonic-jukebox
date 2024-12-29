<script lang="ts">
  import { type ArtistID3, type ArtistInfoBase } from "subsonic-api";
  interface Props {
    artist: ArtistInfoBase & ArtistID3;
  }
  let { artist }: Props = $props();
</script>

<h1>Artist: {artist.name ?? 'Unknown'}</h1>
<div>
  <img src={artist.smallImageUrl} alt="artist">
</div>
<div>
  {@html artist.biography}
</div>
