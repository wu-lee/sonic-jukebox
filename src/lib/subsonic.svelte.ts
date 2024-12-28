import { SubsonicAPI, type Child, type JukeboxPlaylist, type JukeboxStatus } from 'subsonic-api';

export const config = {
  url: import.meta.env.VITE_SERVER_URL,
  auth: {
    username: import.meta.env.VITE_USERNAME,
    password: import.meta.env.VITE_PASSWORD
  }
};

export const api = new SubsonicAPI(config);

// Represents a subsonic session
export class SubsonicSession {
  public id: string;
  public isAdmin: boolean;
  public name: string;
  public token: string;
  public username: string;
  public subsonicToken: string;
  public subsonicSalt: string;
  public baseURL: string;

  // Constructor.
  constructor(params: {
    id: string;
    isAdmin: boolean;
    name: string;
    token: string;
    username: string;
    subsonicToken: string;
    subsonicSalt: string;
    baseURL: string;
  }) {
    this.id = params.id;
    this.isAdmin = params.isAdmin;
    this.name = params.name;
    this.token = params.token;
    this.username = params.username;
    this.subsonicToken = params.subsonicToken;
    this.subsonicSalt = params.subsonicSalt;
    this.baseURL = params.baseURL;
  }

  // Create a session object from the api
  static async load(_api: SubsonicAPI = api) {
    const session = await _api.navidromeSession();
    const baseURL = _api.baseURL();
    return new SubsonicSession({ ...session, baseURL });
  }

  coverArtURLs(imageIds: string[]): Record<string, string> {
    const urls = imageIds.map((it) => [it, this.coverArtURL(it)]);
    return Object.fromEntries(urls);
  }

  coverArtURL(imageId: string): string {
    return (
      `${this.baseURL}rest/getCoverArt?c=subsonic-api&v=1.16.1&u=${this.username}` +
      `&s=${this.subsonicSalt}&t=${this.subsonicToken}&id=${encodeURIComponent(imageId)}&size=120`
    );
  }
}

export class JukeboxControl {
  currentIndex: number = $state(0);
  playing: boolean = $state(false);
  gain: number = $state(0);
  position: number = $state(0);
  entry: Child[] = $state([]);
  timerId?: number = undefined;

  constructor() {}

  autoRefresh(enable: boolean = true) {
    let seconds = 0;
    // Clear any existing timer
    if (this.timerId !== undefined) {
      clearInterval(this.timerId);
      this.timerId = undefined;
    }

    // Add a new one if we're enabled
    if (enable) {
      this.timerId = setInterval(() => {
        // infer the update frequency from the playing status.
        const freq = this.playing ? 1 : 15;
        // console.log('seconds', seconds, freq); // DEBUG
        if (seconds % freq === 0) {
          api.jukeboxControl({ action: 'get' }).then((result) => {
            this.update(result.jukeboxPlaylist);
          });
          seconds = 0;
        }
        seconds += 1;
      }, 1000); // run every second
    }
  }

  async refresh(get: boolean = true) {
    if (get) {
      const result = await api.jukeboxControl({ action: 'get' });
      this.update(result.jukeboxPlaylist);
    } else {
      const result = await api.jukeboxControl({ action: 'status' });
      this.update(result.jukeboxStatus);
    }
  }

  update(state?: JukeboxPlaylist) {
    console.log('update', state); // DEBUG
    if (!state) return;
    this.currentIndex = state.currentIndex;
    this.playing = state.playing;
    this.gain = state.gain;
    if (state.position !== undefined) this.position = state.position;
    this.entry = state.entry ?? [];
  }

  private async simply(action: 'start' | 'stop' | 'status' | 'clear' | 'shuffle') {
    const { jukeboxStatus } = await api.jukeboxControl({ action });
    await this.refresh(true);
  }

  async start() {
    await this.simply('start');
  }

  async stop() {
    await this.simply('stop');
  }

  async status() {
    await this.simply('status');
  }

  async clear() {
    await this.simply('clear');
  }

  async shuffle() {
    await this.simply('shuffle');
  }

  async add(id: string) {
    await api.jukeboxControl({ action: 'add', id });
    await this.refresh();
  }

  async set(id: string) {
    await api.jukeboxControl({ action: 'set', id });
    await this.refresh();
  }

  async remove(index?: number) {
    index ??= this.currentIndex;
    await api.jukeboxControl({ action: 'remove', index });
    await this.refresh();
  }

  async skipSong(index?: number) {
    index ??= this.currentIndex + 1;
    await api.jukeboxControl({ action: 'skip', index });
    await this.refresh();
  }

  async skipSecs(offset: number) {
    await api.jukeboxControl({ action: 'skip', offset });
    await this.refresh();
  }

  async setGain(gain: number) {
    const { jukeboxStatus } = await api.jukeboxControl({ action: 'setGain', gain });
    this.update(jukeboxStatus);
  }
}
