import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "@/lib/types/error";
import { DeleteCatalogueBookDTO } from "@/lib/types/DTO/book";
import { makeBookCatalogueService } from "@/backend/services/bookCatalogue/makeBookCatalogueService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeleteCatalogueBookDTO | ErrorResponse>,
) {
  try {
    if (req.method !== "DELETE") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
    const body: { id: string } = JSON.parse(req.body);
    const bookCatalogueService = makeBookCatalogueService();

    await bookCatalogueService.deleteCatalogueBookById(Number(body.id));

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("API Error:", error.message);
    }
    res.status(400).json({ error: "Bad Request" });
  }
}
