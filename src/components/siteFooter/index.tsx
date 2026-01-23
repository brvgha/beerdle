import { Grid } from "@mui/material";
import "../../styles/siteFooter.css";

const SiteFooter: React.FC = () => {
    return (
        <Grid container component="div" direction="column" className="site-footer">
            <Grid size={12} component="div">
                <p>Beerdle</p>
                <p>© 2025 Beerdle. All rights reserved.</p>
            </Grid>
        </Grid>
    );
};

export default SiteFooter;
