import { Button, Grid } from "@mui/material";
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
    display: "flex",
    flexDirection: "column" as const,
    height: "500px",
    alignItems: "center",
    justifyContent: "center",
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

                <div style={styles.buttonContainer}>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/login"
                    >
                        Login
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to="/signup"
                    >
                        Signup
                    </Button>
            </div>
        </Grid>
    </Grid>
  );
};

export default AboutPage;
