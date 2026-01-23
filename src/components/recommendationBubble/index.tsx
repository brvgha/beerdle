import { Button } from "@mui/material";
import '../../styles/recommendationBubble.css';
import { Link } from "react-router-dom";
import React from "react";

const RecommendationBubble: React.FC = () => {
    return (
        <div className="recommendation-bubble-container">
            <Button
                variant="contained"
                component={Link}
                to="/recommendation"
                className="recommendation-bubble-button"
            >
                Add a beer? 🍺
            </Button>
        </div>
    );
};

export default RecommendationBubble;