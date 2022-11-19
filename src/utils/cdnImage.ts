interface ImageOptions {
  discriminator?: string;
  format?: string;
  noHash?: boolean;
}

export const cdnImage = (path: string, size = 128, id: string, hash?: string | null, options: ImageOptions = {}) =>
  "https://cdn.discordapp.com/" + (hash || options.noHash ?
      [path, id, options.noHash ? "" : hash].filter(Boolean).join("/") +
      `.${hash?.startsWith("a_") ? "gif" : options.format ?? "webp"}?size=${size}` :
      `embed/${hash ? path : "avatars"}/${options.discriminator ? (Number(options.discriminator) % 5) : 0}.png`
  );
