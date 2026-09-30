export enum BookFormats {
  Paperback = 1,
  Hardcover,
}

export type BookFormatsType = keyof typeof BookFormats;
