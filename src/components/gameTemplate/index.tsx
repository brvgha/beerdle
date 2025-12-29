import Grid from "@mui/material/Grid";
import SiteHeader from "../siteHeader";
import { TextField, Autocomplete, Button, Paper } from "@mui/material";
import React, { useContext, useState } from "react";
import PopUpTemplate from "../popUpTemplate";
import actual from '../../../data/sample.json';
import { BeerdleContext } from "../../context/beerdleContext";
import type { BeerdleProps } from "../../types/interfaces";
import { capitalizeFirstLetter, checkSameAlcoholContent, checkSameName, checkSameOrigin, checkSameType, checkSameRegions } from "../../utils";

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
        padding: "1em",
        display: "block",
        margin: "0 auto",
        willChange: "filter",
        transition: "filter 300ms",
        backgroundColor: "#ffffffff",
        width: "20%",
        height: "20%",
        borderRadius: "20px",

    },
    button: {
        marginTop: "1rem",
        width: "100%",
        backgroundColor: "#212121",
        color: "#ffffff",
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
    const { guesses, incrementGuesses, addToGuessedBeers, guessedBeers, updateOptions, options } = useContext(BeerdleContext);
    const [selectedBeer, setSelectedBeer] = useState<BeerdleProps | null>(null);
    const [showPopUp, setShowPopUp] = useState(false);
    const [isWin, setIsWin] = useState(false);

    const actualBeer = JSON.parse(JSON.stringify(actual)).beers[0];

    const handleSubmit = () => {
        if (selectedBeer && addToGuessedBeers && updateOptions) {
            const currentGuess = selectedBeer;
            addToGuessedBeers(selectedBeer);
            setSelectedBeer(null);
            updateOptions();

            // Check win condition
            if (currentGuess.name === actualBeer.name) {
                setIsWin(true);
                setTimeout(() => {
                    setShowPopUp(true);
                }, 1500);
            } else if (guesses >= 6) {
                setIsWin(false);
                setTimeout(() => {
                    setShowPopUp(true);
                }, 1500);
            } else {
                incrementGuesses(guesses);
            }
        } else {
            alert("Please select a beer");
        }
    };

    return (
        <Grid container component="div" direction="column">
            <Grid size={12} component="div">
                <SiteHeader />
            </Grid>
            <Grid size={12} component="div" sx={{ display: 'flex', justifyContent: 'center' }}>
                <img src="/logo.png" alt="logo" style={styles.logo} />
            </Grid>
            <Grid size={12} component="div" sx={styles.gameContainer}>
                <Autocomplete
                    options={options}
                    disabled={guesses > 6}
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
                    {guessedBeers && Array.from(guessedBeers.entries()).reverse().flatMap(([key, beers]) =>
                        beers.map((beer, i) => (
                            <Grid container key={`${key}-${i}`} spacing={1} sx={{ mb: 1 }}>
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
                                        <h3>Country:</h3>
                                        {beer.origin}
                                    </Paper>
                                </Grid> : checkSameRegions(beer.region, actualBeer.region) ? <Grid size={3}>
                                    <Paper sx={{ ...styles.closeAttributeBox, animationDelay: '0.6s' }} elevation={2}>
                                        <h3>Country:</h3>
                                        {beer.origin}
                                    </Paper>
                                </Grid> : <Grid size={3}>
                                    <Paper sx={{ ...styles.attributeBox, animationDelay: '0.6s' }} elevation={2}>
                                        <h3>Country:</h3>
                                        {beer.origin}
                                    </Paper>
                                </Grid>}
                            </Grid>
                        )))}
                </Grid>
                {guesses <= 6 && !isWin ? (
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={styles.button}
                        disabled={!selectedBeer}
                    >
                        Submit ({guesses}/6)
                    </Button>
                ) : (
                    <div style={{ textAlign: 'center', marginTop: '1rem', color: isWin ? '#00ad09ff' : '#d80000ff', fontWeight: 'bold' }}>
                        {isWin ? "Congratulations!" : "Game Over"} ({guesses}/6)
                    </div>
                )}
            </Grid>
            <PopUpTemplate
                open={showPopUp}
                isCorrect={isWin}
                beerName={actualBeer.name}
                beerType={capitalizeFirstLetter(actualBeer.type)}
                beerOrigin={actualBeer.origin}
                beerRegion={actualBeer.region}
                beerAlcoholContent={actualBeer.alcohol_content}
                beerDescription={actualBeer.description}
                onClose={() => setShowPopUp(false)}
            />
        </Grid>
    );
}

export default GameTemplate;