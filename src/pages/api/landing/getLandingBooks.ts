import type { NextApiRequest, NextApiResponse } from "next";
import { makeBookService } from "@/backend/services/book/makeBookService";
import { GetLandingBooksDTO } from "@/lib/types/DTO/book";
import { ErrorResponse } from "@/lib/types/error";
import { LANDING_BOOK_COUNT } from "@/lib/types/book";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetLandingBooksDTO[] | ErrorResponse>,
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
    const { count } = req.query;

    let bookCount: number = LANDING_BOOK_COUNT;
    if (count) bookCount = Number(count);

    const bookService = makeBookService();
    const bookData: GetLandingBooksDTO[] =
      await bookService.getLandingPageBooks(bookCount);

    res.status(200).json(bookData);
  } catch (error) {
    if (error instanceof Error) {
      console.error("API Error:", error.message);
    }
    res.status(400).json({ error: "Bad Request" });
  }
}
