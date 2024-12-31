<script lang="ts">
  import { page } from "$app/state";
  let { label, songId } = $props();
  let { jukebox } = page.data;
</script>

<div class="navigation">
  <button onclick={() => jukebox.add(songId)} >
    {label}
  </button>
</div>
