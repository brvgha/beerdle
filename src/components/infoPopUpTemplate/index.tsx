import React from "react";
import { Button, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import "../../styles/infoPopUpTemplate.css";

interface InfoPopUpProps {
    open: boolean;
    onClose: () => void;
    type: string;
}

const InfoPopUpTemplate: React.FC<InfoPopUpProps> = ({ open, onClose, type }) => {
    const message = "Orange means you are close.\nGreen means you are correct.\nColourless means you are neither.";

    let content = "";
    switch (type) {
        case "name":
            content = "This is the name of the beer.\nOnly Green once you have guessed the correct beer.";
            break;
        case "type":
            content = `This is the type of the beer e.g Stout, Ale, Lager, Wheat, IPA, etc.\n${message}`;
            break;
        case "origin":
            content = `This is the country of origin of the beer.\n${message}`;
            break;
        case "alcohol_content":
            content = `This is the alcohol content of the beer.\n${message}`;
            break;
        default:
            return null;
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                className: "info-popup-paper"
            }}
        >
            <DialogTitle>
                <Typography variant="h4" component="div" className="info-popup-title">
                    Info
                </Typography>
            </DialogTitle>
            <DialogContent>
                <div className="info-popup-content">
                    <Typography variant="body1">
                        {content}
                    </Typography>
                </div>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={onClose}
                    className="info-popup-close-button"
                >
                    Close
                </Button>
            </DialogContent>
        </Dialog>
    );
}

export default InfoPopUpTemplate;