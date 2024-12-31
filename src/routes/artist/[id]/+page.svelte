<script lang="ts">
  //  import { PageData } from '$types';
  import DataTable from '$lib/components/ui/data-table.svelte';
  import { baseUrl } from "$lib/app.js";
  import ArtistBlock from "$lib/ArtistBlock.svelte";
  import AlbumBlock from "$lib/AlbumBlock.svelte";
  import { albumColumns } from "$lib/AlbumColumns.ts";
  let { data } = $props();
  let { jukebox, session, artist } = data;
</script>

<ArtistBlock artist={artist} />

<h2>Albums</h2>
<div>
  <DataTable data={artist.album} columns={albumColumns} />
</div>
