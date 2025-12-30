import React from "react";
import Grid from "@mui/material/Grid";
import SiteHeader from "../siteHeader";


import "../../styles/pageTemplate.css";

const PageTemplate: React.FC<any> = ({ title }) => {
  return (
    <Grid container className="page-root" component="div">
      <Grid size={12} component="div">
        <SiteHeader />
      </Grid>
      <Grid size={12} component="div">
        <h1>{title}</h1>
      </Grid>
    </Grid>
  );
}
export default PageTemplate;