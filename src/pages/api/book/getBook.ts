import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "@/lib/types/error";
import { makeBookService } from "@/backend/services/book/makeBookService";
import { GetBookDTO } from "@/lib/types/DTO/book";
import { makeBookFormatService } from "@/backend/services/bookFormat/makeBookFormatService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetBookDTO | ErrorResponse>,
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { id } = req.query;
    const bookService = makeBookService();
    const bookFormatService = makeBookFormatService();
    const book = await bookService.getBookById(Number(id));

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    const format = await bookFormatService.getBookFormatById(
      book.book_format_id,
    );

    res.status(200).json({
      bookFormat: format?.name || "Unknown",
      title: book.title,
      author: book.author,
      year: book.year.toLocaleDateString(),
      isbn: book.isbn,
      description: book.description ?? "No description available",
      pageCount: book.page_count,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("API Error:", error.message);
    }
    res.status(400).json({ error: "Bad Request" });
  }
}
