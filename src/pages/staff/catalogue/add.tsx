import BookCatalogueAddForm from "@/components/staff/BookCatalogueAddForm";
import { Card, CardContent, CardMedia, Grid } from "@mui/material";

export default function StaffCatalogueAddBookPage() {
  return (
    <Card variant="outlined" sx={{ m: 5 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={4}>
            <Card variant="outlined">
              <CardMedia
                component="img"
                sx={{ height: 500 }}
                image="/No_Cover.jpg"
              />
            </Card>
          </Grid>
          <Grid size={8}>
            <Grid container>
              <Grid size={12}>
                <BookCatalogueAddForm />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
