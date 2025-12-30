import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Button } from "@mui/material";
import "../../styles/popUpTemplate.css";
interface PopUpProps {
    open: boolean;
    isCorrect: boolean;
    onClose: () => void;
    beerName: string;
    beerType: string;
    beerOrigin: string;
    beerRegion: string;
    beerAlcoholContent: string;
    beerDescription: string;
}



const PopUpTemplate: React.FC<PopUpProps> = ({ open, isCorrect, onClose, beerName, beerType, beerOrigin, beerRegion, beerAlcoholContent, beerDescription }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                className: "popup-paper"
            }}
        >
            <DialogTitle>
                <Typography variant="h4" component="div" className="popup-title">
                    {isCorrect ? "🎉 Congratulations!" : "🍻 Unlucky!"}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <div className="popup-section">
                    <Typography variant="body1">
                        {isCorrect
                            ? "You guessed the beer correctly!"
                            : "Better luck next time."}
                    </Typography>
                </div>
                <div className="popup-section">
                    <Typography variant="body1" className="popup-detail">
                        <b>Name:</b> {beerName}
                    </Typography>
                    <Typography variant="body1" className="popup-detail">
                        <b>Type:</b> {beerType}
                    </Typography>
                    <Typography variant="body1" className="popup-detail">
                        <b>Origin:</b> {beerOrigin}
                    </Typography>
                    <Typography variant="body1" className="popup-detail">
                        <b>Region:</b> {beerRegion}
                    </Typography>
                    <Typography variant="body1" className="popup-detail">
                        <b>Alcohol Content:</b> {beerAlcoholContent}
                    </Typography>
                    <Typography variant="body1" className="popup-detail">
                        <b>Description:</b> {beerDescription}
                    </Typography>
                </div>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={onClose}
                    className="popup-close-button"
                >
                    Close
                </Button>
            </DialogContent>
        </Dialog>
    );
}

export default PopUpTemplate;