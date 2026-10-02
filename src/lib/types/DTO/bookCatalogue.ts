import { Prisma } from "@/generated/prisma/client";

const bookCatalogueWithBookAndUser =
  Prisma.validator<Prisma.BookCatalogueDefaultArgs>()({
    include: {
      book: true,
      user: true,
    },
  });

export type BookCatalogueWithBookAndUser = Prisma.BookCatalogueGetPayload<
  typeof bookCatalogueWithBookAndUser
>;

export const getStaffBookCatalogueSelectArgs = {
  id: true,
  book_id: true,
  reserved_at: true,
  borrowed_at: true,
  return_by: true,
};

export const getStaffBookCatalogueBookSelectArgs = {
  book_format_id: true,
  title: true,
  author: true,
};

export const getStaffBookCatalogueUserSelectArgs = {
  f_name: true,
  l_name: true,
};

const getStaffCatalogueBooks =
  Prisma.validator<Prisma.BookCatalogueDefaultArgs>()({
    select: {
      ...getStaffBookCatalogueSelectArgs,
      book: {
        select: {
          ...getStaffBookCatalogueBookSelectArgs,
        },
      },
      user: {
        select: {
          ...getStaffBookCatalogueUserSelectArgs,
        },
      },
    },
  });

export type GetStaffCatalogueBooksDTO = Prisma.BookCatalogueGetPayload<
  typeof getStaffCatalogueBooks
>;

export type BookCatalogueAddFormInputsDTO = {
  title: string;
  author: string;
  year: string;
  format: string;
  isbn: string;
  description: string;
  pageCount: string;
};

export type GetCatalogueBookDTO = {
  id: number;
  status: string;
  bookFormat: string;
  title: string;
  author: string;
  year: string;
  isbn: string;
  description: string;
  pageCount: number;
  reservedAt: string;
  borrowedAt: string;
  recipient: string;
  returnBy: string;
};
