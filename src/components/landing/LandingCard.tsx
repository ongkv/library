import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export default function LandingCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="160" image="/No_Cover.jpg" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Book Title
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Author: Book Author
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
