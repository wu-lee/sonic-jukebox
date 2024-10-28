import { SubsonicAPI } from 'subsonic-api';

export const config = {
  url: import.meta.env.VITE_SERVER_URL,
  auth: {
    username: import.meta.env.VITE_USERNAME,
    password: import.meta.env.VITE_PASSWORD
  }
};

export const api = new SubsonicAPI(config);
