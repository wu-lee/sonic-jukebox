import {
  createColumnHelper,
  type CellContext,
  type ColumnDef,
  type Row
} from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/index.js';
import { baseUrl } from '$lib/app.js';
import { page } from '$app/state';
import type { SubsonicSession } from './subsonic.svelte';
import ButtonCell from '$lib/ButtonCell.svelte';
import type { Child } from 'subsonic-api';

const imageClass =
  'inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10';

const artistUrl = (id: string) => `${baseUrl}/artist/${id}`;
const albumUrl = (id: string) => `${baseUrl}/album/${id}`;
const songUrl = (id: string) => `${baseUrl}/song/${id}`;

function mkLinkCellRenderer<T>(
  altLabel: string,
  idParam: keyof T,
  nameParam: keyof T,
  toUrl: (id: string) => string
) {
  const snippet = createRawSnippet<[T]>((getParams) => {
    const params = getParams();
    const id = params[idParam];
    const name = params[nameParam];
    const url = toUrl(String(id));
    return {
      render: () => `<div><a href="${url}" alt="${altLabel}">${name}</a></div>`
    };
  });
  return ({ row }: { row: Row<T> }) => renderSnippet(snippet, row.original);
}

function mkButtonCellRenderer<T, U>(
  label: string,
  idParam: keyof T,
  clickHandler: (cc: CellContext<T, U>) => void
) {
  return (context: CellContext<T, U>) => {
    const row = context.row;
    const onclick = () => {
      clickHandler(context);
    };
    return renderComponent(ButtonCell, { label, songId: row.original[idParam], onclick });
  };
}

const ch = createColumnHelper<Child>();

export const commonSongColumns: ColumnDef<Child>[] = [
  {
    accessorKey: 'artist',
    header: 'Artist',
    cell: mkLinkCellRenderer('artist info', 'artistId', 'artist', artistUrl)
  },
  {
    accessorKey: 'album',
    header: 'Album',
    cell: mkLinkCellRenderer('album info', 'albumId', 'album', albumUrl)
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: mkLinkCellRenderer('song info', 'id', 'title', songUrl)
  },
  { accessorKey: 'year', header: 'Year' },
  {
    accessorKey: 'created',
    header: 'Created',
    cell: (props) => {
      const created = props.row.original.created;
      return created === undefined ? '-' : new Date(created).toLocaleString();
    }
  },
  { accessorKey: 'duration', header: 'Duration' }
];

export const albumSongColumns: ColumnDef<Child>[] = [
  {
    accessorKey: 'id',
    header: 'Nav',
    cell: mkButtonCellRenderer('add', 'id', (context) =>
      page.data.jukebox.add(context.row.getValue('id'))
    )
  }
];

export const jukeboxSongColumns: ColumnDef<Child>[] = [
  {
    accessorKey: 'id',
    header: 'Nav',
    cell: mkButtonCellRenderer('remove', 'id', (context) =>
      page.data.jukebox.remove(context.row.index)
    )
  }
];
