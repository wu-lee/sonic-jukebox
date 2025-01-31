<script lang="ts">
  import { baseUrl } from '$lib/app.ts';
  import DataTable from '$lib/components/ui/data-table.svelte';
  import JukeboxToolbar from "$lib/JukeboxToolbar.svelte";
  import SongBlock from "$lib/SongBlock.svelte";
  import { commonSongColumns, jukeboxSongColumns } from "$lib/SongColumns.ts";
  import { page } from "$app/state";
  let { jukebox } = page.data;

  let rowSelection = $derived({ [jukebox.currentIndex]: true });
</script>

<div class="jukebox">
  <JukeboxToolbar />
  <DataTable data={jukebox.entry} rowSelection={rowSelection} columns={jukeboxSongColumns.concat(commonSongColumns)} />
</div>
