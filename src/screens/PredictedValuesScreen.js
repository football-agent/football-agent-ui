import * as React from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function PredictedValuesScreen() {
  return (
    <Box style={{ margin: "2rem" }}>
      <Grid container>
        <Grid item xs={8}>
          <Card style={{ backgroundColor: "#faf7f2" }}>
            <CardContent>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{ bgcolor: "red", width: 100, height: 130 }}
                  variant="square"
                >
                  N
                </Avatar>
                <div style={{ margin: "1rem" }}>
                  <p>Player Name</p>
                  <p>Age</p>
                  <p>Club</p>
                  <p>Nationality</p>
                </div>

                <div
                  style={{
                    backgroundColor: "grey",
                    border: "2px solid red",
                    height: "50px",
                    marginLeft: "4rem",
                  }}
                >
                  Predicted Value
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Item>Team based statistic</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>League based statistic</Item>
        </Grid>

        <Grid item xs={12}>
          <Item>The magic behind our prediction</Item>
        </Grid>


      </Grid>
    </Box>
  );
}
