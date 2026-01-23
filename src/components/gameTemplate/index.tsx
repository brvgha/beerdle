import Grid from "@mui/material/Grid";
import SiteHeader from "../siteHeader";
import { TextField, Autocomplete, Button, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import PopUpTemplate from "../popUpTemplate";
import type { BeerdleProps } from "../../types/interfaces";
import { capitalizeFirstLetter, checkSameAlcoholContent, checkSameOrigin, checkSameType, checkSameRegions, checkNameCloseness, checkIsWin } from "../../utils/beerUtils";
import SiteFooter from "../siteFooter";
import InfoPopUpTemplate from "../infoPopUpTemplate";
import { useBeerdle } from "../../hooks/useBeerdle";
import "../../styles/gameTemplate.css";
import RecommendationBubble from "../recommendationBubble";
import LogoTemplate from "../logoTemplate";
import Spinner from "../spinner";

const GameTemplate: React.FC = () => {
    const { guesses, incrementGuesses, addToGuessedBeers, guessedBeers, options, beerdle: actualBeer } = useBeerdle();
    const [selectedBeer, setSelectedBeer] = useState<BeerdleProps | null>(null);
    const [showPopUp, setShowPopUp] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [infoType, setInfoType] = useState<string>('');
    const [isWin, setIsWin] = useState(checkIsWin());

    const handleSubmit = () => {
        if (selectedBeer && addToGuessedBeers && actualBeer) {
            const currentGuess = selectedBeer;
            addToGuessedBeers(selectedBeer);
            setSelectedBeer(null);
            // Check win condition
            if (currentGuess.name === actualBeer.name) {
                setIsWin(true);
                localStorage.setItem('isWin', 'true');
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

    return (actualBeer !== null ?
        <Grid container component="div" direction="column">
            <Grid size={12} component="div">
                <SiteHeader />
            </Grid>
            <RecommendationBubble />
            <LogoTemplate />
            <Grid size={12} component="div" className="game-container">
                {!isWin ? <Autocomplete
                    options={options}
                    disabled={guesses > 6}
                    groupBy={(option) => option.region}
                    getOptionLabel={(option) => option.name + ` (${option.alias.length > 0 ? option.alias + ',' : ''} ${capitalizeFirstLetter(option.type)}, ${option.origin}, ${option.alcohol_content} )`}
                    onChange={(_event, newValue) => {
                        setSelectedBeer(newValue);
                    }}
                    value={selectedBeer}
                    renderGroup={(params) => (
                        <li key={params.key}>
                            <Typography className="group-header">
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
                /> : <Typography variant="h4" sx={{ mt: 2 }}>You Win!</Typography>}
                <Grid size={12} component="div" sx={{ width: '100%', mt: 2 }}>
                    {guessedBeers && Array.from(guessedBeers.entries()).reverse().flatMap(([key, beers], entryIndex) =>
                        beers.map((beer, i) => (
                            <Grid container key={`${key}-${i}`} spacing={1} sx={{ mb: 1 }}>
                                {checkNameCloseness(actualBeer.name, beer.name) === true ? <Grid size={3}>
                                    <Paper className="attribute-box exact" elevation={2}>
                                        {getInfoButtonComponent('name', entryIndex)}
                                        {beer.name}
                                    </Paper>
                                </Grid> : checkNameCloseness(actualBeer.name, beer.name) === "close" ? <Grid size={3}>
                                    <Paper className="attribute-box close" elevation={2}>
                                        {getInfoButtonComponent('name', entryIndex)}
                                        {beer.name}
                                    </Paper>
                                </Grid> : <Grid size={3}>
                                    <Paper className="attribute-box" elevation={2}>
                                        {getInfoButtonComponent('name', entryIndex)}
                                        {beer.name}
                                    </Paper>
                                </Grid>}
                                {checkSameType(actualBeer.type, beer.type) === true ? <Grid size={3}>
                                    <Paper className="attribute-box exact" style={{ animationDelay: '0.2s' }} elevation={2}>
                                        {getInfoButtonComponent('type', entryIndex)}
                                        {capitalizeFirstLetter(beer.type)}
                                    </Paper>
                                </Grid> : checkSameType(actualBeer.type, beer.type) === 'close' ? <Grid size={3}>
                                    <Paper className="attribute-box close" style={{ animationDelay: '0.2s' }} elevation={2}>
                                        {getInfoButtonComponent('type', entryIndex)}
                                        {capitalizeFirstLetter(beer.type)}
                                    </Paper>
                                </Grid> : <Grid size={3}>
                                    <Paper className="attribute-box" style={{ animationDelay: '0.2s' }} elevation={2}>
                                        {getInfoButtonComponent('type', entryIndex)}
                                        {capitalizeFirstLetter(beer.type)}
                                    </Paper>
                                </Grid>}
                                {checkSameAlcoholContent(actualBeer.alcohol_content, beer.alcohol_content) === true ? <Grid size={3}>
                                    <Paper className="attribute-box exact" style={{ animationDelay: '0.4s' }} elevation={2}>
                                        {getInfoButtonComponent('alcohol_content', entryIndex)}
                                        {beer.alcohol_content}
                                    </Paper>
                                </Grid> : checkSameAlcoholContent(actualBeer.alcohol_content, beer.alcohol_content) === "close" ? <Grid size={3}>
                                    <Paper className="attribute-box close" style={{ animationDelay: '0.4s' }} elevation={2}>
                                        {getInfoButtonComponent('alcohol_content', entryIndex)}
                                        {beer.alcohol_content}
                                    </Paper>
                                </Grid> : <Grid size={3}>
                                    <Paper className="attribute-box" style={{ animationDelay: '0.4s' }} elevation={2}>
                                        {getInfoButtonComponent('alcohol_content', entryIndex)}
                                        {beer.alcohol_content}
                                    </Paper>
                                </Grid>}
                                {checkSameOrigin(actualBeer.origin, beer.origin) === true ? <Grid size={3}>
                                    <Paper className="attribute-box exact" style={{ animationDelay: '0.6s' }} elevation={2}>
                                        {getInfoButtonComponent('origin', entryIndex)}
                                        {beer.origin}
                                    </Paper>
                                </Grid> : checkSameRegions(actualBeer.region, beer.region) === true ? <Grid size={3}>
                                    <Paper className="attribute-box close" style={{ animationDelay: '0.6s' }} elevation={2}>
                                        {getInfoButtonComponent('origin', entryIndex)}
                                        {beer.origin}
                                    </Paper>
                                </Grid> : <Grid size={3}>
                                    <Paper className="attribute-box" style={{ animationDelay: '0.6s' }} elevation={2}>
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
                        className="submit-button"
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
        </Grid> : <Spinner />

    );
}

export default GameTemplate;