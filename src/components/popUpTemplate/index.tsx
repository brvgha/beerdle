import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Button, Box } from "@mui/material";

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
            slotProps={{
                paper: {
                    sx: {
                        padding: '2rem',
                        textAlign: 'center',
                        borderRadius: '15px',
                        minWidth: '300px'
                    }
                }
            }}
        >
            <DialogTitle>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {isCorrect ? "🎉 Congratulations!" : "🍻 Unlucky!"}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ my: 2, textAlign: 'center' }}>
                    <Typography variant="body1">
                        {isCorrect
                            ? "You guessed the beer correctly!"
                            : "Better luck next time."}
                    </Typography>
                </Box>
                <Box sx={{ my: 2, textAlign: 'center', gap: 2 }}>
                    <Typography variant="body1">
                        <b>Name:</b> {beerName}
                    </Typography>
                    <Typography variant="body1">
                        <b>Type:</b> {beerType}
                    </Typography>
                    <Typography variant="body1">
                        <b>Origin:</b> {beerOrigin}
                    </Typography>
                    <Typography variant="body1">
                        <b>Region:</b> {beerRegion}
                    </Typography>
                    <Typography variant="body1">
                        <b>Alcohol Content:</b> {beerAlcoholContent}
                    </Typography>
                    <Typography variant="body1">
                        <b>Description:</b> {beerDescription}
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={onClose}
                    sx={{ mt: 2, backgroundColor: '#212121', '&:hover': { backgroundColor: '#424242' } }}
                >
                    Close
                </Button>
            </DialogContent>
        </Dialog>
    );
}

export default PopUpTemplate;