import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Button, Box } from "@mui/material";

interface PopUpProps {
    open: boolean;
    isCorrect: boolean;
    onClose: () => void;
}

const PopUpTemplate: React.FC<PopUpProps> = ({ open, isCorrect, onClose }) => {
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
                            : "Better luck next time. Why not try another round?"}
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