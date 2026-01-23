import { Grid } from "@mui/material";


const LogoTemplate: React.FC = () => {
    return (
        <Grid container className="about-logo-container">
            <img src="/logo.png" className="about-logo-image" alt="logo" />
        </Grid>
    );
};

export default LogoTemplate;