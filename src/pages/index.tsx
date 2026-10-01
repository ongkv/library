import LandingCard from "@/components/landing/LandingCard";
import { fetcher } from "@/lib/helpers/fetcher";
import { LANDING_BOOK_COUNT } from "@/lib/types/book";
import { GetLandingBooksDTO } from "@/lib/types/DTO/book";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { NextRouter, useRouter } from "next/router";
import useSWR from "swr";

type LandingCardRowProps = {
  data: GetLandingBooksDTO[];
  router: NextRouter;
};

function LandingCardRow({ data, router }: LandingCardRowProps) {
  return (
    <Grid container spacing={5}>
      {data.map(({ id, title, year, author }) => (
        <Grid size={3} key={`${id}-${title}`}>
          <LandingCard
            id={id}
            title={title}
            year={`${new Date(year).getFullYear()}`}
            author={author}
            router={router}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default function Home() {
  const router = useRouter();

  const { data, isLoading } = useSWR<GetLandingBooksDTO[]>(
    "/api/landing/getLandingBooks?count=" + LANDING_BOOK_COUNT,
    fetcher,
  );

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Error: Failed to retrieve book data</div>;

  const m: number = Math.floor(data.length / 2);
  const [topRow, bottomRow] = [data.slice(0, m), data.slice(m, data.length)];

  return (
    <Box sx={{ p: 5 }}>
      <Stack spacing={4}>
        <Typography variant="h5">Recently Added Books</Typography>
        <LandingCardRow data={topRow} router={router} />
        <LandingCardRow data={bottomRow} router={router} />
      </Stack>
    </Box>
  );
}
