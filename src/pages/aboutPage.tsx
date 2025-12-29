import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SiteHeader from "../components/siteHeader";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "100vh",
  },
  image: {
    padding: "1em",
    display: "block",
    margin: "0 auto",
    willChange: "filter",
    transition: "filter 300ms",
    backgroundColor: "#ffffffff",
    width: "80%",
    height: "80%",
    borderRadius: "20px",

  },
  buttonContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexDirection: "row" as const,
    width: "100%",
    alignItems: "center",
  },
  headerContainer: {
    marginTop: "-70px",
    flexDirection: "column" as const,
  },
};

const AboutPage: React.FC = () => {
  if (sessionStorage.length > 0) {
    sessionStorage.clear();
  }
  sessionStorage.setItem("loggedin", "false");

  return (
    <Grid container sx={styles.root}>
      <Grid size={12}>
        <div style={styles.headerContainer}>
          <SiteHeader />
        </div>
        <div style={styles.image}>
          <img src="/logo.png" style={styles.image} alt="logo" />
        </div>
        <Grid container sx={{ mt: 2, gap: 0.5 }} direction="column">
          <Typography>Welcome to Beerdle.</Typography>
          <Typography>Guess the beer in 6 tries.</Typography>
          <Typography>New challenge every day!</Typography>
          <Typography>Thanks for playing 💕</Typography>
        </Grid>
        <Grid container sx={styles.buttonContainer}>
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
