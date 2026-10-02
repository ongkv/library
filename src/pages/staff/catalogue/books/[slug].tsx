import { deleteBookRequest, fetcher } from "@/lib/helpers/fetcher";
import { BookStatuses } from "@/lib/types/bookStatus";
import { GetCatalogueBookDTO } from "@/lib/types/DTO/bookCatalogue";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

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

export default function CatalogueBookPage() {
  const router = useRouter();
  const { data, isLoading } = useSWR<GetCatalogueBookDTO>(
    `/api/staff/catalogue/getCatalogueBook?id=${router.query.slug}`,
    fetcher,
  );

  const { data: deleteResponse, trigger } = useSWRMutation(
    "/api/staff/catalogue/deleteCatalogueBook",
    deleteBookRequest,
  );

  useEffect(() => {
    if (deleteResponse && deleteResponse.success) {
      router.push("/staff/catalogue");
    }
  }, [deleteResponse, router]);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Error: Failed to retrieve book data</div>;

  const {
    id,
    status,
    title,
    author,
    year,
    bookFormat,
    isbn,
    description,
    pageCount,
    reservedAt,
    borrowedAt,
    recipient,
    returnBy,
  } = data;

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
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">Book Details</Typography>
                  <Divider />
                  <Stack sx={{ py: 2 }}>
                    <BookPageField label="Title" value={title} />
                    <BookPageField label="Author" value={author} />
                    <BookPageField label="Year" value={year} />
                    <BookPageField label="Format" value={bookFormat} />
                    <BookPageField label="ISBN" value={isbn} />
                    <BookPageField label="Description" value={description} />
                    <BookPageField label="Page Count" value={pageCount} />
                  </Stack>

                  <Typography variant="h6">Catalogue Details</Typography>
                  <Divider />
                  <Stack sx={{ py: 2 }}>
                    <BookPageField label="ID" value={id} />
                    <BookPageField label="Status" value={status} />
                    <BookPageField label="Recipient" value={recipient} />
                    <BookPageField label="Reserved At" value={reservedAt} />
                    <BookPageField label="Borrowed At" value={borrowedAt} />
                    <BookPageField label="Return By" value={returnBy} />
                  </Stack>

                  <Typography variant="h6">Actions</Typography>
                  <Divider />
                  <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
                    <Button
                      variant="contained"
                      disabled={status !== BookStatuses[BookStatuses.Available]}
                    >
                      Reserve
                    </Button>
                    <Button
                      variant="contained"
                      disabled={status === BookStatuses[BookStatuses.Borrowed]}
                    >
                      Lend
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      disabled={
                        status !== BookStatuses[BookStatuses.Reserved] ||
                        status !== BookStatuses[BookStatuses.Available]
                      }
                    >
                      Return
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => trigger(id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
