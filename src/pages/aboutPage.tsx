import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SiteHeader from "../components/siteHeader";
import '../styles/aboutPage.css'



const AboutPage: React.FC = () => {
  if (sessionStorage.length > 0) {
    sessionStorage.clear();
  }
  sessionStorage.setItem("loggedin", "false");

  return (
    <Grid container className="about-root">
      <Grid size={12}>
        <Grid container className="about-header-container">
          <SiteHeader />
        </Grid>
        <Grid container className="about-logo-container">
          <img src="/logo.png" className="about-logo-image" alt="logo" />
        </Grid>
        <Grid container sx={{ mt: 2, gap: 0.5 }} direction="column">
          <Typography>Welcome to Beerdle.</Typography>
          <Typography>Guess the beer in 6 tries.</Typography>
          <Typography>New challenge every day!</Typography>
          <Typography>Thanks for playing 💕</Typography>
        </Grid>
        <Grid container className="about-button-container">
          <Button
            variant="contained"
            sx={{ minWidth: "100px", backgroundColor: "#00c43bff", color: "#ffffffff" }}
            component={Link}
            to="/"
          >
            Play
          </Button>
          <Button
            variant="contained"
            sx={{ minWidth: "100px", backgroundColor: "#0055c4ff", color: "#ffffffff" }}
            component={Link}
            to="/login"
            onMouseOver={
              () => {
                <Typography>Login to store your progress.</Typography>
              }
            }
          >
            Login
          </Button>
          <Button
            variant="contained"
            sx={{ minWidth: "100px", backgroundColor: "#6500c4ff", color: "#ffffffff" }}
            component={Link}
            to="/signup"
          >
            Signup
          </Button>

        </Grid>
        <Grid container direction="column" sx={{ my: 2, width: '50%', display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'center', position: 'relative', bottom: "30%", left: "25%" }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#ffffffff", color: "#ffffffff" }}
            component={Link}
            to="/signup"
          >
            <img src="/bmc-button.png" alt="coffee" style={{ width: "150px", height: "50px" }} />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AboutPage;
