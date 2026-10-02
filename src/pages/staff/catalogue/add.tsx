import BookCatalogueAddForm from "@/components/staff/BookCatalogueAddForm";
import { Button, Card, CardContent, CardMedia, Grid } from "@mui/material";
import { useRouter } from "next/router";

export default function StaffCatalogueAddBookPage() {
  const router = useRouter();

  return (
    <>
      <Button
        variant="text"
        sx={{ my: 3, mx: 5 }}
        onClick={() => router.push("/staff/catalogue")}
      >
        Back
      </Button>
      <Card variant="outlined" sx={{ mx: 5 }}>
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
    </>
  );
}
