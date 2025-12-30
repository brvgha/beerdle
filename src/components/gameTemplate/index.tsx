import Grid from "@mui/material/Grid";
import SiteHeader from "../siteHeader";
import { TextField, Autocomplete, Button, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import PopUpTemplate from "../popUpTemplate";
import actual from '../../../data/sample.json';
import type { BeerdleProps } from "../../types/interfaces";
import { capitalizeFirstLetter, checkSameAlcoholContent, checkSameName, checkSameOrigin, checkSameType, checkSameRegions } from "../../utils";
import SiteFooter from "../siteFooter";
import InfoPopUpTemplate from "../infoPopUpTemplate";
import { useBeerdle } from "../../hooks/useBeerdle";

const commonAttributeBoxStyles = {
    padding: "0.75rem",
    textAlign: "center" as const,
    backgroundColor: "#f0f0f0",
    minHeight: "90px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.8rem",
    gap: "15px",
    "& h6": {
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
    const { guesses, incrementGuesses, addToGuessedBeers, guessedBeers, options } = useBeerdle();
    const [selectedBeer, setSelectedBeer] = useState<BeerdleProps | null>(null);
    const [showPopUp, setShowPopUp] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [infoType, setInfoType] = useState<string>('');
    const [isWin, setIsWin] = useState(false);

    const actualBeer = JSON.parse(JSON.stringify(actual)).beers[0];

    const handleSubmit = () => {
        if (selectedBeer && addToGuessedBeers) {
            const currentGuess = selectedBeer;
            addToGuessedBeers(selectedBeer);
            setSelectedBeer(null);

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

    const handleInfoClick = (type: string) => {
        setInfoType(type);
        setShowInfo(true);
        console.log("Showing info")
    };

    const getInfoButtonComponent = (type: string, index: number) => {

        const label = type === 'alcohol_content' ? 'Alcohol Content' : type === 'origin' ? 'Country' : type;
        const text = capitalizeFirstLetter(label);

        if (index === 0) {
            return (
                <Typography
                    fontWeight="bold"
                    fontSize="1rem"
                    variant="h6"
                    onClick={() => handleInfoClick(type)}
                    sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                >
                    {text}
                </Typography>
            )
        } else {
            return <Typography fontWeight="bold" fontSize="1rem" variant="h6">{text}</Typography>;
        }
    }

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
                    groupBy={(option) => option.region}
                    getOptionLabel={(option) => option.name}
                    onChange={(_event, newValue) => {
                        setSelectedBeer(newValue);
                    }}
                    value={selectedBeer}
                    renderGroup={(params) => (
                        <li key={params.key}>
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                    padding: '8px 16px',
                                    backgroundColor: '#f5f5f5',
                                    textTransform: 'uppercase',
                                    fontSize: '0.75rem',
                                    letterSpacing: '0.05em'
                                }}
                            >
                                {params.group}
                            </Typography>
                            <ul style={{ padding: 0 }}>{params.children}</ul>
                        </li>
                    )}
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
                    {guessedBeers && Array.from(guessedBeers.entries()).reverse().flatMap(([key, beers], entryIndex) =>
                        beers.map((beer, i) => (
                            <Grid container key={`${key}-${i}`} spacing={1} sx={{ mb: 1 }}>
                                {checkSameName(actualBeer.name, beer.name) ? <Grid size={3}>
                                    <Paper sx={styles.exactAttributeBox} elevation={2}>
                                        {getInfoButtonComponent('name', entryIndex)}
                                        {beer.name}
                                    </Paper>
                                </Grid> : <Grid size={3}>
                                    <Paper sx={styles.attributeBox} elevation={2}>
                                        {getInfoButtonComponent('name', entryIndex)}
                                        {beer.name}
                                    </Paper>
                                </Grid>}
                                {checkSameType(actualBeer.type, beer.type) === true ? <Grid size={3}>
                                    <Paper sx={{ ...styles.exactAttributeBox, animationDelay: '0.2s' }} elevation={2}>
                                        {getInfoButtonComponent('type', entryIndex)}
                                        {capitalizeFirstLetter(beer.type)}
                                    </Paper>
                                </Grid> : checkSameType(actualBeer.type, beer.type) === 'close' ? <Grid size={3}>
                                    <Paper sx={{ ...styles.closeAttributeBox, animationDelay: '0.2s' }} elevation={2}>
                                        {getInfoButtonComponent('type', entryIndex)}
                                        {capitalizeFirstLetter(beer.type)}
                                    </Paper>
                                </Grid> : <Grid size={3}>
                                    <Paper sx={{ ...styles.attributeBox, animationDelay: '0.2s' }} elevation={2}>
                                        {getInfoButtonComponent('type', entryIndex)}
                                        {capitalizeFirstLetter(beer.type)}
                                    </Paper>
                                </Grid>}
                                {checkSameAlcoholContent(actualBeer.alcohol_content, beer.alcohol_content) === true ? <Grid size={3}>
                                    <Paper sx={{ ...styles.exactAttributeBox, animationDelay: '0.4s' }} elevation={2}>
                                        {getInfoButtonComponent('alcohol_content', entryIndex)}
                                        {beer.alcohol_content}
                                    </Paper>
                                </Grid> : checkSameAlcoholContent(actualBeer.alcohol_content, beer.alcohol_content) === "close" ? <Grid size={3}>
                                    <Paper sx={{ ...styles.closeAttributeBox, animationDelay: '0.4s' }} elevation={2}>
                                        {getInfoButtonComponent('alcohol_content', entryIndex)}
                                        {beer.alcohol_content}
                                    </Paper>
                                </Grid> : <Grid size={3}>
                                    <Paper sx={{ ...styles.attributeBox, animationDelay: '0.4s' }} elevation={2}>
                                        {getInfoButtonComponent('alcohol_content', entryIndex)}
                                        {beer.alcohol_content}
                                    </Paper>
                                </Grid>}
                                {checkSameOrigin(actualBeer.origin, beer.origin) === true ? <Grid size={3}>
                                    <Paper sx={{ ...styles.exactAttributeBox, animationDelay: '0.6s' }} elevation={2}>
                                        {getInfoButtonComponent('origin', entryIndex)}
                                        {beer.origin}
                                    </Paper>
                                </Grid> : checkSameRegions(actualBeer.region, beer.region) === true ? <Grid size={3}>
                                    <Paper sx={{ ...styles.closeAttributeBox, animationDelay: '0.6s' }} elevation={2}>
                                        {getInfoButtonComponent('origin', entryIndex)}
                                        {beer.origin}
                                    </Paper>
                                </Grid> : <Grid size={3}>
                                    <Paper sx={{ ...styles.attributeBox, animationDelay: '0.6s' }} elevation={2}>
                                        {getInfoButtonComponent('origin', entryIndex)}
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
            <InfoPopUpTemplate open={showInfo} type={infoType} onClose={() => { setShowInfo(false); setInfoType(''); }} />
            <Grid size={12} component="div">
                <SiteFooter />
            </Grid>
        </Grid>

    );
}

export default GameTemplate;