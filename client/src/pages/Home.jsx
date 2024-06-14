import { Link } from "react-router-dom";
import { Box, Button, Stack } from "@mui/material";
import WhiteLogo from "../assets/White Logo V4.jpg";
import MainPageComputer from "../assets/Main Computer Picture.jpg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const RateMyYJob = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ bgcolor: "white", padding: 2 }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img src={WhiteLogo} alt="Logo" width="100" />
          <Box sx={{ marginLeft: 2 }}>
            <Button color="inherit">Products</Button>
            <Button color="inherit">Pricing</Button>
            <Button color="inherit">Blog</Button>
          </Box>
        </Link>
        <AccountCircleIcon sx={{ fontSize: 40 }} />
      </Stack>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        flex="1"
        style={{ marginTop: "20px" }}
      >
        <img
          src={MainPageComputer}
          alt="Main Page Computer"
          style={{ width: "100%", height: "auto" }}
        />
        <Link to="/search" style={{ alignSelf: "center", marginTop: "20px" }}>
          <Button className="btn btn-primary" variant="contained">
            Find a Job
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default RateMyYJob;
