import BookCatalogueList from "@/components/staff/BookCatalogueList";
import { fetcher } from "@/lib/helpers/fetcher";
import { GetStaffCatalogueBooksDTO } from "@/lib/types/DTO/bookCatalogue";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function BookCataloguePage() {
  const router = useRouter();
  const { data, isLoading } = useSWR<GetStaffCatalogueBooksDTO[]>(
    "/api/staff/catalogue/getStaffCatalogueBooks",
    fetcher,
  );

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Error: Failed to retrieve book catalogue data</div>;

  return (
    <Box sx={{ p: 5 }}>
      <Stack spacing={4}>
        <Stack direction="row" spacing={3}>
          <Typography variant="h5">Book Catalogue</Typography>
          <Button
            variant="contained"
            onClick={() => router.push("/staff/catalogue/add")}
          >
            Add Book
          </Button>
        </Stack>
        <BookCatalogueList data={data} />
      </Stack>
    </Box>
  );
}
