<script lang="ts">
  //  import ArtistBlock from "$lib/ArtistBlock.svelte";
  import { baseUrl } from "$lib/app.js";
  import DataTable from '$lib/components/ui/data-table.svelte';
  import AlbumBlock from "$lib/AlbumBlock.svelte";
  import SongBlock from "$lib/SongBlock.svelte";
  import { commonSongColumns, albumSongColumns } from "$lib/SongColumns.ts";

  let { data } = $props();
  let { jukebox, session, album } = data;
</script>

<div>
  <AlbumBlock album={album} coverArtUrl={session.coverArtURL(album.id)} />
  <DataTable data={album.song} columns={albumSongColumns.concat(commonSongColumns)} />
</div>
