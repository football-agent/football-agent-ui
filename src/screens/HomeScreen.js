import React, { useEffect } from "react";
import { getAllTeams } from "../rest/TeamService";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function TeamsScreen() {
  const [teams, setTeams] = React.useState([]);

  useEffect(() => {
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
            <Stack style={{ padding: "50px" }} direction="row" spacing={6}>
              <div onClick={()=>console.log("sdf")}>
                <Avatar
                  sx={{ width: 100, height: 100 }}
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                />
              </div>

              <Avatar
                sx={{ width: 100, height: 100 }}
                alt="Travis Howard"
                src="/static/images/avatar/2.jpg"
              />
              <Avatar
                sx={{ width: 100, height: 100 }}
                alt="Cindy Baker"
                src="/static/images/avatar/3.jpg"
              />
            </Stack>
          </div>

          {/* </Item> */}
        </Grid>
        <Grid item xs={4}>
          <div style={{ padding: "50px" }}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Choose player"
              variant="outlined"
            />
          </div>
          {/* <Item>xs=4</Item> */}
        </Grid>
      </Grid>
    </div>
  );
}
