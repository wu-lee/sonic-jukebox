<script lang="ts" module>
  
</script>

<script>
  import JukeboxBlock from "$lib/JukeboxBlock.svelte";  
  import { baseUrl } from '$lib/app.ts';
  let { children, data } = $props();
</script>

<nav><a href={`${baseUrl}/`}>Index</a></nav>

{@render children()}

<JukeboxBlock /> 
