import { Grid } from "@mui/material";


const ErrorTemplate: React.FC<{ error: string }> = ({ error }) => {
    return (
        <Grid container>
            <h1>Error</h1>
            <p>{error}</p>
        </Grid>
    );
};

export default ErrorTemplate;