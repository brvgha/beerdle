import { Box, Button, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

const InfoPopUpTemplate: React.FC<any> = ({ open, onClose, type }) => {
    const message = "Orange means you are close.\nGreen means you are correct.\nColourless means you are neither.";
    switch (type) {
        case "name":
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
                            {"Info"}
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ my: 2, textAlign: 'center' }}>
                            <Typography variant="body1">
                                This is the name of the beer.
                                Only Green once you have guessed the correct beer.
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
        case "type":
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
                            {"Info"}
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ my: 2, textAlign: 'center' }}>
                            <Typography variant="body1">
                                This is the type of the beer e.g Stout, Ale, Lager, Wheat, IPA, Wheat, etc.
                                {message}
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
        case "origin":
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
                            {"Info"}
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ my: 2, textAlign: 'center' }}>
                            <Typography variant="body1">
                                This is the country of origin of the beer.
                                {message}
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
        case "alcohol_content":
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
                            {"Info"}
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ my: 2, textAlign: 'center' }}>
                            <Typography variant="body1">
                                This is the alcohol content of the beer.
                                {message}
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
        default:
            return null;
    }
}

export default InfoPopUpTemplate;