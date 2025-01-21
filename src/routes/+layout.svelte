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

<div class="w-full flex flex-col h-screen">
  <Tabs.Root value="directory" class="h-full flex flex-col flex-1">
    <!-- height: auto required here to prevent headers ballooning -->
    <Tabs.List class="w-full h-auto justify-stretch" >
      <Tabs.Trigger value="directory">Directory</Tabs.Trigger>
      <Tabs.Trigger value="jukebox">Jukebox</Tabs.Trigger>
    </Tabs.List>
    <!-- min-height 0 required here to prevent overflow -->
    <Tabs.Content value="directory"  class="min-h-0">
      <!-- this div is also needed to ensure the scroll area behaves and doesn't overflow -->
      <div class="h-full flex flex-col">
        <nav class=""><a href={`${baseUrl}/`}>Index</a></nav>
        <ScrollArea >
          {@render children()}
        </ScrollArea>
      </div>
    </Tabs.Content>
    <!-- min-height 0 required here to prevent overflow -->
    <Tabs.Content value="jukebox" class="min-h-0">
      <div class="h-full flex flex-col">
        <!-- this div is needed to ensure the scroll area behaves and doesn't overflow -->
        <ScrollArea class="h-full">
          <JukeboxBlock class="h-full" />
        </ScrollArea>
      </div>
    </Tabs.Content>
  </Tabs.Root>
</div>
