<script lang="ts">
  import type { PageData } from "./$types";
  import type { Indexes } from "subsonic-api";
  import type { ColumnDef } from '@tanstack/table-core';
  import type { Artist } from 'subsonic-api';
  import DataTable, { type DataTableProps } from "$lib/components/ui/data-table.svelte";
  import { artistColumns } from "$lib/ArtistColumns.js";
  import { baseUrl } from "$lib/app.js";
  interface Props {
    data: {
      indexes: Indexes,
    }
  }
  let { data }: Props = $props();
  let { indexes } = data;
</script>

<div>
  <div>
    {#each indexes.index as index}
      <div>
        <h2>{index.name}</h2>
        <div>
          <DataTable data={index.artist} columns={artistColumns} />
          <!-- -a href={`${baseUrl}/artist/${artist.id}`}>{artist.name}</a -->
        </div>
      </div>
    {/each}
  </div>
</div>
