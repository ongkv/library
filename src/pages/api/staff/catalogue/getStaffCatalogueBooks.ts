import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "@/lib/types/error";
import { GetStaffCatalogueBooksDTO } from "@/lib/types/DTO/bookCatalogue";
import { makeBookCatalogueService } from "@/backend/services/bookCatalogue/makeBookCatalogueService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetStaffCatalogueBooksDTO[] | ErrorResponse>,
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
    const bookCatalogueService = makeBookCatalogueService();
    const bookCatalogueData: GetStaffCatalogueBooksDTO[] =
      await bookCatalogueService.getCatalogueBooksSummary();

    res.status(200).json(bookCatalogueData);
  } catch (error) {
    if (error instanceof Error) {
      console.error("API Error:", error.message);
    }
    res.status(400).json({ error: "Bad Request" });
  }
}
