<script lang="ts">
  import { page } from "$app/state";
  import Button from "$lib/components/ui/button/button.svelte"
  let { label, songId, onclick } = $props();
  let { jukebox } = page.data;
</script>

<div class="navigation">
  <Button onclick={onclick} >
    {label}
  </Button>
</div>
