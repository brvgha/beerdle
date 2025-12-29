import { Grid } from "@mui/material";


const styles = {
    footer: {
        backgroundColor: "#212121",
        color: "#ffffff",
        padding: "1rem",
        textAlign: "center",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        m: 0,
        boxSizing: 'border-box'
    }
}

const SiteFooter: React.FC = () => {
    return (
        <Grid container component="div" direction="column" sx={styles.footer}>
            <Grid size={12} component="div">
                <p>Beerdle</p>
                <p>© 2025 Beerdle. All rights reserved.</p>
            </Grid>
        </Grid>
    );
};

export default SiteFooter;
