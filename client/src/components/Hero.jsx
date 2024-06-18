import { Button, Stack, Typography } from "@mui/material";
import MainPageComputer from "../assets/Main Computer Picture.jpg";
import "@fontsource/kantumruy";

const Hero = () => {
  const style = {
    fontFamily: "Kantumruy, sans-serif",
    fontWeight: 700,
  };

  return (
    <div className="hero">
      <img src={MainPageComputer} alt="background" className="hero__image" />
      <Stack className="hero__text" justifyContent="center" alignItems="center">
        <Typography variant="h2" style={style}>
          Know more about your job before you apply
        </Typography>
        <Button variant="contained" style={style} size="large">
          Rate My Job
        </Button>
      </Stack>
    </div>
  );
};

export default Hero;
