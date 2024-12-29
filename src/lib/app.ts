import { env } from '$env/dynamic/public';

// The base URL for the application
export const baseUrl: string = env.PUBLIC_BASE_URL ?? '';
