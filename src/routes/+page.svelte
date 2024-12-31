<script lang="ts">
  import type { PageData } from "./$types";
  import type { Indexes } from "subsonic-api";
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
        <div>{index.name}</div>
        <div>
          {#each index.artist as artist}
            <div>
              <a href={`${baseUrl}/artist/${artist.id}`}>{artist.name}</a>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>
