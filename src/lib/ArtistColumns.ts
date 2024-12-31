import type { ColumnDef } from '@tanstack/table-core';
import type { Artist } from 'subsonic-api';
import { createRawSnippet } from 'svelte';
import { renderSnippet } from '$lib/components/ui/data-table/index.js';
import { baseUrl } from '$lib/app.js';
import { page } from '$app/state';
import type { SubsonicSession } from './subsonic.svelte';

const imageClass =
  'inline-flex size-10 items-center justify-center rounded-9px bg-background-alt text-foreground/60 transition-all hover:bg-muted active:scale-98 active:bg-dark-10 data-[state=on]:bg-muted data-[state=on]:text-foreground/80 active:data-[state=on]:bg-dark-10';

const artistUrl = (id: string) => `${baseUrl}/artist/${id}`;

const imageCellSnippet = createRawSnippet<[string]>((getId) => {
  const id = getId();
  // Rendering too many of these artist images overloads the server, so we don't
  //const session: SubsonicSession = page.data.session;
  //const url = session?.coverArtURL(id) ?? '';
  const url = artistUrl(id);
  return {
    render: () => `<div><a href="${url}" alt="artist artwork">-</a></div>`
  };
});

const nameCellSnippet = createRawSnippet<[[string, string]]>((getParams) => {
  const [id, name]: [string, string] = getParams();
  const url = artistUrl(id);
  return {
    render: () => `<div><a href="${url}" alt="artist info">${name}</a></div>`
  };
});

export const artistColumns: ColumnDef<Artist>[] = [
  {
    accessorKey: 'id',
    header: 'Image',
    cell: ({ row }) => {
      const id: string = row.getValue('id');
      return renderSnippet(imageCellSnippet, id);
    }
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const params: [string, string] = [row.getValue('id'), row.getValue('name')];
      return renderSnippet(nameCellSnippet, params);
    }
  },
  { accessorKey: 'starred', header: 'Starred' },
  { accessorKey: 'userRating', header: 'Rating' },
  { accessorKey: 'averageRating', header: 'Average Rating' }
];
