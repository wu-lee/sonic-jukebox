import type { ColumnDef, Row } from '@tanstack/table-core';
import type { AlbumID3 } from 'subsonic-api';
import { createRawSnippet } from 'svelte';
import { renderSnippet } from '$lib/components/ui/data-table/index.js';
import { baseUrl } from '$lib/app.js';
import { page } from '$app/state';
import type { SubsonicSession } from './subsonic.svelte';
import { getValues } from './components/ui/data-table/data-table.svelte';

const imageClass =
  'inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10';

const artistUrl = (id: string) => `${baseUrl}/artist/${id}`;
const albumUrl = (id: string) => `${baseUrl}/album/${id}`;

const imageCellSnippet = createRawSnippet<[string]>((getId) => {
  const id = getId();
  // Rendering too many of these artist images overloads the server, be careful
  const session: SubsonicSession = page.data.session;
  const url = session?.coverArtURL(id) ?? '';
  return {
    render: () => `<div><img src="${url}" class="${imageClass}" alt="album artwork"></div>`
  };
});

const artistCellSnippet = createRawSnippet<[Record<string, unknown>]>((getParams) => {
  const { artistId, artist } = getParams();
  const url = artistUrl(artistId as string);
  return {
    render: () => `<div><a href="${url}" alt="artist info">${artist}</a></div>`
  };
});

const albumCellSnippet = createRawSnippet<[Record<string, unknown>]>((getParams) => {
  const { id, name } = getParams();
  const url = albumUrl(id as string);
  return {
    render: () => `<div><a href="${url}" alt="album info">${name}</a></div>`
  };
});

export const albumColumns: ColumnDef<AlbumID3>[] = [
  {
    accessorKey: 'id',
    header: 'Image',
    cell: ({ row }) => {
      const id: string = row.getValue('id');
      return renderSnippet(imageCellSnippet, id);
    }
  },
  { accessorKey: 'artistId', header: 'Artist Id' },
  {
    accessorKey: 'artist',
    header: 'Artist',
    cell: ({ row }) => {
      const params = getValues(row, ['artistId', 'artist']);
      return renderSnippet(artistCellSnippet, params);
    }
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const params = getValues(row, ['id', 'name']);
      return renderSnippet(albumCellSnippet, params);
    }
  },
  { accessorKey: 'year', header: 'Year' },
  { accessorKey: 'created', header: 'Created' },
  { accessorKey: 'duration', header: 'Duration' }
];
