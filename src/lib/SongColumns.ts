import type { ColumnDef, Row } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/index.js';
import { baseUrl } from '$lib/app.js';
import { page } from '$app/state';
import type { SubsonicSession } from './subsonic.svelte';
import { getValues } from '$lib/components/ui/data-table/data-table.svelte';
import ButtonCell from '$lib/ButtonCell.svelte';
import type { Child } from 'subsonic-api';

const imageClass =
  'inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10';

const artistUrl = (id: string) => `${baseUrl}/artist/${id}`;
const albumUrl = (id: string) => `${baseUrl}/album/${id}`;
const songUrl = (id: string) => `${baseUrl}/song/${id}`;

function mkLinkCellSnippet(
  altLabel: string,
  idParam: string,
  nameParam: string,
  toUrl: (id: string) => string
) {
  return createRawSnippet<[Record<string, unknown>]>((getParams) => {
    const params = getParams();
    const id = params[idParam];
    const name = params[nameParam];
    const url = toUrl(id as string);
    return {
      render: () => `<div><a href="${url}" alt="${altLabel}">${name}</a></div>`
    };
  });
}

function mkLinkCellRenderer<T>(
  altLabel: string,
  idParam: string,
  nameParam: string,
  toUrl: (id: string) => string
) {
  const snippet = mkLinkCellSnippet(altLabel, idParam, nameParam, toUrl);
  return ({ row }: { row: Row<T> }) => renderSnippet(snippet, getValues(row, [idParam, nameParam]));
}

function mkButtonCellRenderer<T>(label: string, idParam: string) {
  return ({ row }: { row: Row<T> }) => {
    const values = getValues(row, [idParam]);

    return renderComponent(ButtonCell, { label, songId: values[idParam] });
  };
}

export const songColumns: ColumnDef<Child>[] = [
  {
    accessorKey: 'id',
    header: 'Image',
    cell: mkButtonCellRenderer('add', 'id')
  },
  { accessorKey: 'artistId', header: 'Artist Id' },
  { accessorKey: 'albumId', header: 'Album Id' },
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
  { accessorKey: 'created', header: 'Created' },
  { accessorKey: 'duration', header: 'Duration' }
];
