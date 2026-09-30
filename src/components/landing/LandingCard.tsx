import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { NextRouter } from "next/router";

type LandingCardProps = {
  id: number;
  title: string;
  year: string;
  author: string;
  router: NextRouter;
};

export default function LandingCard({
  id,
  title,
  year,
  author,
  router,
}: LandingCardProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea
        onClick={() => {
          router.push(`/books/${id}`);
        }}
      >
        <CardMedia component="img" height="160" image="/No_Cover.jpg" />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title} ({year})
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Author: {author}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
