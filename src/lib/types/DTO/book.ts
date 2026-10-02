export type GetLandingBooksDTO = {
  id: number;
  title: string;
  year: Date;
  author: string;
};

export type AddNewBookDTO = {
  book_format_id: number;
  title: string;
  author: string;
  year: Date;
  isbn: string;
  cover_img: Uint8Array<ArrayBufferLike> | null;
  description: string;
  page_count: number;
};

export type AddNewBookResponseDTO = {
  id: number;
};

export type GetBookDTO = {
  bookFormat: string;
  title: string;
  author: string;
  year: string;
  isbn: string;
  description: string;
  pageCount: number;
};
