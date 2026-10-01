import BookCatalogueList from "@/components/staff/BookCatalogueList";
import { fetcher } from "@/lib/helpers/fetcher";
import { GetStaffCatalogueBooksDTO } from "@/lib/types/DTO/bookCatalogue";
import { Box, Stack, Typography } from "@mui/material";
import useSWR from "swr";

export default function BookCataloguePage() {
  const { data, isLoading } = useSWR<GetStaffCatalogueBooksDTO[]>(
    "/api/staff/catalogue/getStaffCatalogueBooks",
    fetcher,
  );

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Error: Failed to retrieve book catalogue data</div>;

  return (
    <Box sx={{ p: 5 }}>
      <Stack spacing={4}>
        <Typography variant="h5">Book Catalogue</Typography>
        <BookCatalogueList data={data} />
      </Stack>
    </Box>
  );
}
