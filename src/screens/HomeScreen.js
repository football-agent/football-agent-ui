import React, { useEffect } from "react";
import { getAllTeams } from "../rest/TeamService";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TeamAvatar from "../components/TeamAvatar";
import PlayerAutocomplete from "../components/PlayerAutocomplete";
import TeamInformationAccordion from "../components/TeamInformationAccordion";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function TeamsScreen() {
  const [teams, setTeams] = React.useState([]);
  const [selectedTeam, setSelectedTeam] = React.useState(null);

  const handleTeamSelect = (teamName) => {
    setSelectedTeam(teams.filter((team) => team.team === teamName)[0]);
  };

  useEffect(() => {
    getAllTeams().then((response) => {
      setTeams(response.data);
    });
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {/* <Item> */}
          <div style={{ display: "inline-block" }}>
            <p style={{ fontSize: "2rem" }}>Choose your team</p>
            {/* <Stack style={{ padding: "50px" }} direction="row" spacing={6}> */}
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {teams.map((team) => {
                return (
                  <TeamAvatar
                    teamName={team.team}
                    handleTeamSelect={handleTeamSelect}
                    selectedTeam={selectedTeam}
                  />
                );
              })}
            </div>

            {/* </Stack> */}
          </div>
          {/* {selectedTeam && <TeamInformationCard selectedTeam={selectedTeam} />} */}
          <div style={{ marginTop: "2rem" }}>
            <p style={{ fontSize: "1rem" }}>Selected Team: </p>

            {selectedTeam && (
              <TeamInformationAccordion selectedTeam={selectedTeam} />
            )}
          </div>

          {/* </Item> */}
        </Grid>
        <Grid item xs={6}>
          <p style={{ fontSize: "2rem" }}>Choose your player</p>
          <div style={{ padding: "50px" }}>
            <PlayerAutocomplete />
          </div>
          <Button variant="contained">Predict</Button>
          {/* <Item>xs=4</Item> */}
        </Grid>
      </Grid>
    </div>
  );
}
