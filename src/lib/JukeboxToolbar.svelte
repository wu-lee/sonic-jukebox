<script lang="ts">
  import { Separator, Toolbar } from "bits-ui";
  import Shuffle from "virtual:icons/iconoir/shuffle";
  import Play from "virtual:icons/iconoir/play";
  import Pause from "virtual:icons/iconoir/pause";
  import Rewind from "virtual:icons/iconoir/rewind";
  import Forward from "virtual:icons/iconoir/forward";
  import Trash from "virtual:icons/iconoir/trash";
  import { page } from "$app/stores";
  let { jukebox } = $page.data;
  let text: string[] | undefined = ["bold"];
  let align: string | undefined;
  let commonGroupProps = {
    class: "inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10"
  }
</script>


<Toolbar.Root
  class="flex h-12 min-w-max items-center justify-center rounded-10px border border-border bg-background-alt px-[4px] py-1 shadow-mini"
>
  <Toolbar.Group
    bind:value={text}
    type="multiple"
    class="flex items-center gap-x-0.5"
  >
    <Toolbar.GroupItem
      onclick={() => jukebox.clear()}
      aria-label="clear playlist"
      value="clear"
      {...commonGroupProps}
    >
      <Trash class="size-6" />
    </Toolbar.GroupItem>
  </Toolbar.Group>

  <Separator.Root class="-my-1 mx-1 w-[1px] self-stretch bg-dark-10" />

  <Toolbar.Group
    bind:value={align}
    type="single"
    class="flex items-center gap-x-0.5"
  >
    <Toolbar.GroupItem
      onclick={() => jukebox.skipSong(-1)}
      aria-label="skip back a song"
      value="backward"
      {...commonGroupProps}
    >
      <Rewind class="size-6" />
    </Toolbar.GroupItem>
    <Toolbar.GroupItem
      onclick={() => jukebox.start()}
      aria-label="start playing"
      value="play"
      {...commonGroupProps}
      >
      <Play class="size-6" />
    </Toolbar.GroupItem>
    <Toolbar.GroupItem
      onclick={() => jukebox.stop()}
      aria-label="pause playing"
      value="pause"
      {...commonGroupProps}
      >
      <Pause class="size-6" />
    </Toolbar.GroupItem>
    <Toolbar.GroupItem
      onclick={() => jukebox.skipSong()}
      aria-label="skip forward a song"
      value="forward"
      {...commonGroupProps}
    >
      <Forward class="size-6" />
    </Toolbar.GroupItem>
  </Toolbar.Group>

  <Separator.Root class="-my-1 mx-1 w-[1px] self-stretch bg-dark-10" />

  <div class="flex items-center">
    <Toolbar.Button
      onclick={() => jukebox.shuffle()}
      aria-label="shuffle the playlist"
      value="shuffle"
      {...commonGroupProps}
    >
      <Shuffle class="size-6" />
    </Toolbar.Button>
  </div>
</Toolbar.Root>
