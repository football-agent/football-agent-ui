import React, { useEffect } from "react";
import { getAllTeams } from "../rest/TeamService";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TeamAvatar from "../components/TeamAvatar";
import PlayerAutocomplete from "../components/PlayerAutocomplete";
import { flexbox } from "@mui/system";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function TeamsScreen() {
  const [teams, setTeams] = React.useState([]);

  useEffect(() => {
    console.log("sd,mf");
    getAllTeams().then((response) => {
      setTeams(response.data);
    });
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          {/* <Item> */}
          <div style={{ display: "inline-block" }}>
            <p style={{ fontSize: "2rem" }}>Choose your team</p>
            {/* <Stack style={{ padding: "50px" }} direction="row" spacing={6}> */}
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {teams.map((team) => {
                return <TeamAvatar teamName={team.team} />;
              })}
            </div>

            {/* </Stack> */}
          </div>

          {/* </Item> */}
        </Grid>
        <Grid item xs={4}>
        <p style={{ fontSize: "2rem" }}>Choose your player</p>
          <div style={{ padding: "50px" }}>
          
            <PlayerAutocomplete />
          </div>
          {/* <Item>xs=4</Item> */}
        </Grid>
      </Grid>
    </div>
  );
}
