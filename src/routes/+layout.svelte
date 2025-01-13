<script lang="ts" module>
</script>

<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import '../app.css';
  import JukeboxBlock from '$lib/JukeboxBlock.svelte';
  import { baseUrl } from '$lib/app.ts';
  let { children, data } = $props();
</script>

<div class="top">
  <Tabs.Root value="directory" class="w-[100%]">
    <Tabs.List class="w-[100%] justify-stretch" >
      <Tabs.Trigger value="directory">Directory</Tabs.Trigger>
      <Tabs.Trigger value="jukebox">Jukebox</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="directory">
      <ScrollArea class="h-[100vh] w-[100vw]">
        <nav><a href={`${baseUrl}/`}>Index</a></nav>
        <div class="children">
          {@render children()}
        </div>
      </ScrollArea>
    </Tabs.Content>
    <Tabs.Content value="jukebox">
      <JukeboxBlock />
    </Tabs.Content>
  </Tabs.Root>
</div>
