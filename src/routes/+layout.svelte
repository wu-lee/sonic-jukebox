<script lang="ts" module>
  
</script>

<script>
  let { children } = $props();
  import { baseUrl } from '$lib/app.ts';
</script>

<nav><a href={`${baseUrl}/`}>Index</a></nav>

{@render children()}
