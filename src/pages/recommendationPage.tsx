import { Button, Grid, Input, InputAdornment, TextField, Typography } from "@mui/material";
import SiteHeader from "../components/siteHeader";
import SiteFooter from "../components/siteFooter";
import LogoTemplate from "../components/logoTemplate";
import { useState } from "react";
import type { BeerdleProps } from "../types/interfaces";


const RecommendationPage: React.FC = () => {
    let beer: BeerdleProps = {
        name: "",
        alias: "",
        type: "",
        alcohol_content: "1.5%",
        origin: "",
        description: "",
        region: "",

    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        beer.name = name;
        beer.type = type;
        beer.alias = alias;
        beer.origin = origin;
        beer.alcohol_content = String(alcoholContent) + '%';
        // sendRecommendation(beer);
    };

    const [alcoholContent, setAlcoholContent] = useState(1.5);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [alias, setAlias] = useState("");
    const [origin, setOrigin] = useState("");

    return (
        <Grid container spacing={6} direction='column'>
            <Grid>
                <SiteHeader />
            </Grid>
            <Grid>
                <LogoTemplate />
            </Grid>
            <Grid component="form" onSubmit={handleSubmit} container direction='column' spacing={2} sx={{ mt: 6 }}>
                <Typography variant="h4">Recommendation</Typography>
                <Typography variant="h6">Know of a beer that should be added?</Typography>
                <Typography variant="h6">Add the details here!</Typography>
                <Grid>
                    <TextField
                        label="Name"
                        value={name}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>
                <Grid>
                    <TextField
                        label="Alias - is it known by another name?"
                        value={alias}
                        variant="outlined"
                        onChange={(e) => setAlias(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid>
                    <TextField
                        label="Type"
                        value={type}
                        variant="outlined"
                        onChange={(e) => setType(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid>
                    <TextField
                        label="Country"
                        value={origin}
                        variant="outlined"
                        onChange={(e) => setOrigin(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid>
                    <label>Alcohol Content</label>
                    <Input
                        type="number"
                        value={alcoholContent}
                        onChange={(e) => setAlcoholContent(Number(e.target.value))}
                        sx={{ mt: 2 }}
                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                        fullWidth
                    />
                </Grid>
                <Button type="submit" variant="contained" sx={{ mt: 2, color: '#ffffff', backgroundColor: '#000000' }}>Add Beer</Button>
            </Grid>

            <Grid>
                <SiteFooter />
            </Grid>
        </Grid>

    );
};

export default RecommendationPage;