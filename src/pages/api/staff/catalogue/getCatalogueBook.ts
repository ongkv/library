import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "@/lib/types/error";
import { makeBookService } from "@/backend/services/book/makeBookService";
import { makeBookFormatService } from "@/backend/services/bookFormat/makeBookFormatService";
import { GetCatalogueBookDTO } from "@/lib/types/DTO/bookCatalogue";
import { makeBookCatalogueService } from "@/backend/services/bookCatalogue/makeBookCatalogueService";
import { makeUserService } from "@/backend/services/user/makeUserService";
import { makeBookStatusService } from "@/backend/services/bookStatus/makeBookStatusService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetCatalogueBookDTO | ErrorResponse>,
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const bookCatalogueService = makeBookCatalogueService();
    const bookService = makeBookService();
    const bookFormatService = makeBookFormatService();
    const bookStatusService = makeBookStatusService();
    const userService = makeUserService();

    const { id } = req.query;

    const catalogueBook = await bookCatalogueService.getCatalogueBookById(
      Number(id),
    );
    if (!catalogueBook) {
      return res.status(404).json({ error: "Catalogue book not found" });
    }

    const book = await bookService.getBookById(Number(id));
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    let fullName: string = "N/A";
    if (catalogueBook.user_id) {
      const user = await userService.getUserById(catalogueBook.user_id);
      if (user) {
        fullName = `${user.f_name} ${user.l_name}`;
      }
    }

    const format = await bookFormatService.getBookFormatById(
      book.book_format_id,
    );
    const status = await bookStatusService.getBookStatusById(
      catalogueBook.book_status_id,
    );

    res.status(200).json({
      ...catalogueBook,
      recipient: fullName,
      bookFormat: format?.name || "Unknown",
      title: book.title,
      author: book.author,
      year: book.year.toLocaleDateString(),
      isbn: book.isbn,
      description: book.description ?? "No description available",
      pageCount: book.page_count,
      status: status?.status || "Unknown",
      reservedAt: catalogueBook.reserved_at
        ? catalogueBook.reserved_at.toLocaleDateString()
        : "N/A",
      borrowedAt: catalogueBook.borrowed_at
        ? catalogueBook.borrowed_at.toLocaleDateString()
        : "N/A",
      returnBy: catalogueBook.return_by
        ? catalogueBook.return_by.toLocaleDateString()
        : "N/A",
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("API Error:", error.message);
    }
    res.status(400).json({ error: "Bad Request" });
  }
}
