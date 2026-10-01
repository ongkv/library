import BookCatalogueList from "@/components/staff/BookCatalogueList";
import { Box, Stack, Typography } from "@mui/material";

export default function BookCataloguePage() {
  return (
    <Box sx={{ p: 5 }}>
      <Stack spacing={4}>
        <Typography variant="h5">Book Catalogue</Typography>
        <BookCatalogueList />
      </Stack>
    </Box>
  );
}
