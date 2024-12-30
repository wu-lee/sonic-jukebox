<script lang="ts" module>
</script>

<script>
  import '../app.css';
  import JukeboxBlock from '$lib/JukeboxBlock.svelte';
  import { baseUrl } from '$lib/app.ts';
  let { children, data } = $props();
</script>

<div class="top">
  <nav><a href={`${baseUrl}/`}>Index</a></nav>
  <div class="children">
    {@render children()}
  </div>
  <JukeboxBlock />
</div>
