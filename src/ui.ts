import van, { State } from 'vanjs-core';
import { AlbumWithSongsID3, SubsonicAPI } from 'subsonic-api';

const config = {
  url: import.meta.env.VITE_SERVER_URL,
  auth: {
    username: import.meta.env.VITE_USERNAME,
    password: import.meta.env.VITE_PASSWORD
  }
};
const api = new SubsonicAPI(config);
console.log(config);
const entityTypes = ['index', 'artist', 'album', 'song', 'track'] as const;

function acc<T>(type: string, updater: (id: string) => Promise<T>) {
  const state = van.state<T | undefined>();
  return {
    state,
    updater: (targetType: string, targetId: string) => {
      console.log('>> updater for ' + type, targetType, targetId);
      if (type === targetType)
        updater(targetId).then((it) =>
          console.log('setting state', targetType, targetId, (state.val = it))
        );
    }
  };
}

const entity = {
  index: acc('index', (id) => api.getIndexes({ musicFolderId: id })),
  album: acc('album', (id) => api.getAlbum({ id })),
  artist: acc('artist', (id) => api.getArtist({ id })),
  song: acc('song', (id) => api.getSong({ id }))
} as const;

type EntityType = keyof typeof entity; //typeof entityTypes[number];

export const ui = {
  async start() {
    const { a, button, span, div, img, ul, li, pre } = van.tags;
    const entityId = van.state<string>('');
    const entityType = van.state<EntityType>();

    const logState = () =>
      console.log('>> state', entityType.val, entityId.val, entity[entityType.val]?.state.val);

    const parseUrl = () => {
      const [_, type, id] = location.hash.split('/', 3);
      logState();
      if (type in entity) {
        console.log('going', type, id);
        entityType.val = type as EntityType;
        entityId.val = id;
      }
    };
    // Create dependant state updators for these api endpoints
    window.addEventListener('hashchange', parseUrl);

    for (const type in entity) {
      const ent = entity[type as EntityType];
      console.log('>> deriving', type);
      van.derive(() => ent.updater(entityType.val, entityId.val));
    }

    const renderer = {
      index: () => {
        const indexes = entity['index'].state.val?.indexes;
        if (!indexes) return div(`no index for id '${entityId.val}'`);

        return div(
          div(
            'children',
            indexes.child?.map((child) => div(a({ href: child.id }, child.title)))
          ),
          div(
            'indexes',
            indexes.index?.map((index) =>
              div(
                index.name,
                index.artist?.map((artist) =>
                  div(a({ href: `#/artist/${artist.id}` }, artist.name))
                )
              )
            )
          )
        );
      },
      artist: () => {
        logState();
        const indexes = entity.artist.state.val?.artist;
        if (!indexes) return div('no artist info');
        return div(
          'artist ',
          span(indexes.val.artist.name ?? 'Unknown'),
          img({ src: indexes.val.artist.artistImageUrl ?? '' }),
          ul(indexes.val.artist.album?.map((alb) => li(a({ href: `#/album/${alb.id}` }, alb.name))))
        );
      },
      album: () => {
        logState();
        const indexes = entity.album.state.val;
        if (!indexes) return div('no album info');

        return div(
          div(
            'album ',
            span(
              indexes.album?.name ?? 'Unknown',
              ' by ',
              a({ href: `#/artist/${indexes.album.artistId}` }, indexes.album?.artist)
            )
          ),
          ul(
            'blah'
            /*            (indexes?.album  as AlbumWithSongsID3 | undefined)?.song.map(
              song => li(a({href: `#/song/${song.id}`}, song.title))
            )*/
          )
        );
      },
      song: () => div('song')
    };
    /*    
    const AlbumBrowser = async 
    const ArtistBrowser = async (id: string) => {
      const indexes = van.state(await api.getArtist({id}));

    }
    const SongBrowser = async (id: string) => {
      const indexes = van.state(await api.getSong({id}));
      return div(
        "song ",
        span(indexes.val.song?.title ?? "Unknown"),
        " by ",
        span(indexes.val.song.artist),
        img({src: indexes.val.song.coverArt ?? ''}),
      )
    }
    
    const handlers: Record<string, (id: string) => Promise<HTMLDivElement>> = {
      index: IndexBrowser,
      album: AlbumBrowser,
      artist: ArtistBrowser,
      song: SongBrowser,
    };
*/
    const MusicBrowser = () => {
      console.log('MusicBrowser', entityType.val, entityId.val);
      if (!entityId.val) return renderer['index']();
      return renderer[entityType.val]();
    };

    parseUrl();
    van.add(document.body, await MusicBrowser());
  }
};
