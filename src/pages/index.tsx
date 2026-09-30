import LandingCard from "@/components/landing/LandingCard";
import { Box, Grid, Stack, Typography } from "@mui/material";

function LandingCardRow() {
  return (
    <Grid container spacing={5}>
      <Grid size={3}>
        <LandingCard />
      </Grid>
      <Grid size={3}>
        <LandingCard />
      </Grid>
      <Grid size={3}>
        <LandingCard />
      </Grid>
      <Grid size={3}>
        <LandingCard />
      </Grid>
    </Grid>
  );
}

export default function Home() {
  return (
    <Box sx={{ p: 5 }}>
      <Stack spacing={4}>
        <Typography variant="h5">Recently Added Books</Typography>
        <LandingCardRow />
        <LandingCardRow />
      </Stack>
    </Box>
  );
}
