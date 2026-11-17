const customUrl = process.env.NEXT_PUBLIC_SITE_URL;
const pagesUrl = process.env.NEXT_PUBLIC_PAGES_URL;
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

export const siteUrl = (customUrl || pagesUrl || (vercelHost ? `https://${vercelHost}` : "http://localhost:3000")).replace(/\/$/, "");

// Пока не указан настоящий домен, сайт считается черновиком для показа и закрыт от поисковиков.
export const isIndexable = Boolean(customUrl);
