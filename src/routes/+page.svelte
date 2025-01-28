<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import type { PageData } from "./$types";
  import type { Indexes, MusicFolders } from "subsonic-api";
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

<!-- this div is also needed to ensure the scroll area behaves and doesn't overflow -->
<div class="h-full flex flex-col">
  <Tabs.Root>
    <Tabs.List>
      {#each indexes.index as index}
        <Tabs.Trigger value={index.name}>
          {index.name}
        </Tabs.Trigger>
      {/each}
    </Tabs.List>
    {#each indexes.index as index}
      <Tabs.Content value={index.name}>
        <ScrollArea >
          <DataTable data={index.artist} columns={artistColumns} />
          <!-- -a href={`${baseUrl}/artist/${artist.id}`}>{artist.name}</a -->
        </ScrollArea>
      </Tabs.Content>
    {/each}
  </Tabs.Root>
</div>
