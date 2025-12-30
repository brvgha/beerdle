import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import "../../styles/spinner.css";

const CircularIndeterminate: React.FC = () => {
  return (
    <div className="spinner-root">
      <CircularProgress />
      <CircularProgress />
    </div>
  );
}
export default CircularIndeterminate;