import { SubsonicAPI } from 'subsonic-api';

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
