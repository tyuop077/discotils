interface ImageOptions {
  discriminator?: string;
  preferredFormat?: string;
}

export const cdnImage = (path: string, size = 128, id: string, hash?: string, options: ImageOptions = {}) =>
  "https://cdn.discordapp.com/" + (hash ?
      `${path}/${id}/${hash}.${hash.startsWith("a_") ? "gif" : options.preferredFormat ?? "webp"}?size=${size}` :
      `embed/${path}/${options.discriminator ? (Number(options.discriminator) % 5) : 0}.png`
  );
