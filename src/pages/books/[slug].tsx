import { fetcher } from "@/lib/helpers/fetcher";
import { GetBookDTO } from "@/lib/types/DTO/book";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";

type BookPageFieldProps = {
  label: string;
  value: string | number | null;
};

function BookPageField({ label, value }: BookPageFieldProps) {
  return (
    <Grid container spacing={2} sx={{ display: "flex", alignItems: "center" }}>
      <Grid size={3}>
        <Typography sx={{ justifySelf: "flex-end" }}>{label}</Typography>
      </Grid>
      <Grid size={9}>
        <Typography>{value}</Typography>
      </Grid>
    </Grid>
  );
}

export default function BookPage() {
  const router = useRouter();
  const { data, isLoading } = useSWR<GetBookDTO>(
    `/api/book/getBook?id=${router.query.slug}`,
    fetcher,
  );

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Error: Failed to retrieve book data</div>;

  const { bookFormat, title, author, year, isbn, description, pageCount } =
    data;

  return (
    <>
      <Button
        variant="text"
        sx={{ my: 3, mx: 5 }}
        onClick={() => router.push("/")}
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
              <Card variant="outlined">
                <CardContent>
                  <BookPageField label="Title" value={title} />
                  <BookPageField label="Author" value={author} />
                  <BookPageField label="Year" value={year} />
                  <BookPageField label="Format" value={bookFormat} />
                  <BookPageField label="ISBN" value={isbn} />
                  <BookPageField label="Description" value={description} />
                  <BookPageField label="Page Count" value={pageCount} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
