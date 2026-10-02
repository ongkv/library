import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "@/lib/types/error";
import { BookCatalogueAddFormInputsDTO } from "@/lib/types/DTO/bookCatalogue";
import { makeBookService } from "@/backend/services/book/makeBookService";
import { AddNewBookResponseDTO } from "@/lib/types/DTO/book";
import { makeBookFormatService } from "@/backend/services/bookFormat/makeBookFormatService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AddNewBookResponseDTO | ErrorResponse>,
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
    const body: BookCatalogueAddFormInputsDTO = JSON.parse(req.body);

    const { title, author, year, format, isbn, description, pageCount } = body;
    if (!title || !author || !year || !format || !isbn || !pageCount) {
      throw new Error("Request body is invalid");
    }

    const bookFormatService = makeBookFormatService();
    const bookFormat = await bookFormatService.getBookFormatByName(format);
    if (!bookFormat) {
      throw new Error("Book format is invalid");
    }

    const formattedISBN =
      "978-" + isbn.replace(/(\d{1})(\d{4})(\d{4})(\d{1})/, "$1-$2-$3-$4");

    const bookService = makeBookService();
    const book = await bookService.addNewBook({
      title,
      author,
      year: new Date(year),
      isbn: formattedISBN,
      description,
      book_format_id: bookFormat.id,
      page_count: Number(pageCount),
    });

    res.status(200).json({ id: book.id });
  } catch (error) {
    if (error instanceof Error) {
      console.error("API Error:", error.message);
    }
    res.status(400).json({ error: "Bad Request" });
  }
}
