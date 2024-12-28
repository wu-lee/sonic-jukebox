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

  constructor(readonly updateInterval?: number) {
    if (updateInterval !== undefined && updateInterval > 0) {
      setInterval(() => this.refresh(), updateInterval * 1000);
    }
  }

  async refresh() {
    const { jukeboxStatus } = await api.jukeboxControl({ action: 'status' });
    this.update(jukeboxStatus);
  }

  update(state?: JukeboxPlaylist) {
    console.log(state); // DEBUG
    if (!state) return;
    this.currentIndex = state.currentIndex;
    this.playing = state.playing;
    this.gain = state.gain;
    if (state.position !== undefined) this.position = state.position;
    if (state.entry) this.entry = state.entry;
  }

  async get() {
    const { jukeboxPlaylist } = await api.jukeboxControl({ action: 'get' });
    this.update(jukeboxPlaylist);
  }

  private async simply(action: 'start' | 'stop' | 'status' | 'clear' | 'shuffle') {
    const { jukeboxStatus } = await api.jukeboxControl({ action });
    await this.get();
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
    await this.get();
  }

  async set(id: string) {
    await api.jukeboxControl({ action: 'set', id });
    await this.get();
  }

  async remove(index?: number) {
    index ??= this.currentIndex;
    await api.jukeboxControl({ action: 'remove', index });
    await this.get();
  }

  async skipSong(index?: number) {
    index ??= this.currentIndex + 1;
    await api.jukeboxControl({ action: 'skip', index });
    await this.get();
  }

  async skipSecs(offset: number) {
    await api.jukeboxControl({ action: 'skip', offset });
    await this.get();
  }

  async setGain(gain: number) {
    const { jukeboxStatus } = await api.jukeboxControl({ action: 'setGain', gain });
    this.update(jukeboxStatus);
  }
}
