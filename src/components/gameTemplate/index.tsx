import Grid from "@mui/material/Grid";
import SiteHeader from "../siteHeader";
import { TextField, Autocomplete, Button, Paper } from "@mui/material";
import React, { useContext, useState } from "react";
import data from '../../../data/beers.json';
import actual from '../../../data/sample.json';
import { BeerdleContext } from "../../context/beerdleContext";
import type { BeerdleProps } from "../../types/interfaces";
import { capitalizeFirstLetter, checkSameAlcoholContent, checkSameName, checkSameOrigin, checkSameType } from "../../utils";

const commonAttributeBoxStyles = {
    padding: "0.75rem",
    textAlign: "center" as const,
    backgroundColor: "#f0f0f0",
    minHeight: "80px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.8rem",
    gap: "15px",
    "& h3": {
        margin: 0,
        minHeight: "2.4em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    animation: "flipIn 0.8s cubic-bezier(0.4, 0.0, 0.2, 1) backwards",
};

const styles = {
    gameContainer: {
        backgroundColor: "#ffffffff",
        padding: "2rem",
        margin: "0 auto",
        maxWidth: "500px",
        alignItems: "center",
        flexDirection: "column" as const,
    },
    logo: {
        height: "20em",
        padding: "1.5em",
        willChange: "filter",
        transition: "filter 300ms",
        backgroundColor: "#ffffffff",
    },
    button: {
        marginTop: "1rem",
        width: "100%",
        backgroundColor: "#ffffffff",
        color: "#fcdb23ff",
    },
    attributeBox: {
        ...commonAttributeBoxStyles,
    },
    closeAttributeBox: {
        ...commonAttributeBoxStyles,
        backgroundColor: "#ffa500", // Example: Orange for 'close'
    },
    exactAttributeBox: {
        ...commonAttributeBoxStyles,
        backgroundColor: "#00ff00", // Example: Green for 'exact'
    },
};

const GameTemplate: React.FC = () => {
    const { guesses, incrementGuesses, addToGuessedBeers, guessedBeers } = useContext(BeerdleContext);
    const [selectedBeer, setSelectedBeer] = useState<BeerdleProps | null>(null);

    const actualBeer = JSON.parse(JSON.stringify(actual)).beers[0];
    console.log(actualBeer);

    const handleSubmit = () => {
        if (selectedBeer && addToGuessedBeers) {
            addToGuessedBeers(selectedBeer);
            incrementGuesses(guesses);
            setSelectedBeer(null);
        }
    };

    return (
        <Grid container sx={styles.gameContainer} component="div" direction="column">
            <Grid size={12} component="div">
                <SiteHeader />
            </Grid>
            <Grid size={12} component="div">
                <img src="/logo.png" alt="logo" style={styles.logo} />
            </Grid>
            <Grid size={12} component="div" sx={{ width: '100%' }}>
                <Autocomplete
                    options={data.beers as BeerdleProps[]}
                    getOptionLabel={(option) => option.name}
                    onChange={(_event, newValue) => {
                        setSelectedBeer(newValue);
                    }}
                    value={selectedBeer}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Guess"
                            fullWidth
                            size="small"
                        />
                    )}
                    fullWidth
                />
                <Grid size={12} component="div" sx={{ width: '100%', mt: 2 }}>
                    {guessedBeers && Array.from(guessedBeers.values()).flat().map((beer, index) => (
                        <Grid container key={index} spacing={1} sx={{ mb: 1 }}>
                            {checkSameName(actualBeer.name, beer.name) ? <Grid size={3}>
                                <Paper sx={styles.exactAttributeBox} elevation={2}>
                                    <h3>Name:</h3>
                                    {beer.name}
                                </Paper>
                            </Grid> : <Grid size={3}>
                                <Paper sx={styles.attributeBox} elevation={2}>
                                    <h3>Name:</h3>
                                    {beer.name}
                                </Paper>
                            </Grid>}
                            {checkSameType(beer.type, actualBeer.type) ? <Grid size={3}>
                                <Paper sx={{ ...styles.exactAttributeBox, animationDelay: '0.2s' }} elevation={2}>
                                    <h3>Type:</h3>
                                    {capitalizeFirstLetter(beer.type)}
                                </Paper>
                            </Grid> : <Grid size={3}>
                                <Paper sx={{ ...styles.attributeBox, animationDelay: '0.2s' }} elevation={2}>
                                    <h3>Type:</h3>
                                    {capitalizeFirstLetter(beer.type)}
                                </Paper>
                            </Grid>}
                            {checkSameAlcoholContent(beer.alcohol_content, actualBeer.alcohol_content) ? <Grid size={3}>
                                <Paper sx={{ ...styles.exactAttributeBox, animationDelay: '0.4s' }} elevation={2}>
                                    <h3>Alcohol Content:</h3>
                                    {beer.alcohol_content}
                                </Paper>
                            </Grid> : checkSameAlcoholContent(beer.alcohol_content, actualBeer.alcohol_content) === "close" ? <Grid size={3}>
                                <Paper sx={{ ...styles.closeAttributeBox, animationDelay: '0.4s' }} elevation={2}>
                                    <h3>Alcohol Content:</h3>
                                    {beer.alcohol_content}
                                </Paper>
                            </Grid> : <Grid size={3}>
                                <Paper sx={{ ...styles.attributeBox, animationDelay: '0.4s' }} elevation={2}>
                                    <h3>Alcohol Content:</h3>
                                    {beer.alcohol_content}
                                </Paper>
                            </Grid>}
                            {checkSameOrigin(beer.origin, actualBeer.origin) ? <Grid size={3}>
                                <Paper sx={{ ...styles.exactAttributeBox, animationDelay: '0.6s' }} elevation={2}>
                                    <h3>Origin:</h3>
                                    {beer.origin}
                                </Paper>
                            </Grid> : <Grid size={3}>
                                <Paper sx={{ ...styles.attributeBox, animationDelay: '0.6s' }} elevation={2}>
                                    <h3>Origin:</h3>
                                    {beer.origin}
                                </Paper>
                            </Grid>}
                        </Grid>
                    ))}
                </Grid>
                {guesses < 6 ? (
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={styles.button}
                        disabled={!selectedBeer}
                    >
                        Submit ({guesses}/6)
                    </Button>
                ) : (
                    <div style={{ textAlign: 'center', marginTop: '1rem', color: 'red', fontWeight: 'bold' }}>
                        Game Over ({guesses}/6)
                    </div>
                )}
            </Grid>

        </Grid>
    );
}

export default GameTemplate;