<script lang="ts">
  import { baseUrl } from "$lib/app.js";
  import JukeboxBlock from "$lib/JukeboxBlock.svelte";
  let { data } = $props();
  let { jukebox } = data;
</script>

<JukeboxBlock jukebox={jukebox} /> 
