<script lang="ts">
  import { page } from "$app/state";
  let { label, songId, onclick } = $props();
  let { jukebox } = page.data;
</script>

<div class="navigation">
  <button onclick={onclick} >
    {label}
  </button>
</div>
