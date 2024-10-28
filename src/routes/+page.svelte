<script lang="ts">
  export let data;
</script>

<h1>Index</h1>
<div>
  <div>
    <div>
      {#each data.indexes.index as index}
        <div>
          <div>{index.name}</div>
          <div>
            {#each index.artist as artist}
              <div>
                <a href={`./artist/${artist.id}`}>{artist.name}</a>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
