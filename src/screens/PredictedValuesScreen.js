import * as React from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSelectionContext } from "../context/SelectionProvider";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import RadarChart from "react-svg-radar-chart";
import "react-svg-radar-chart/build/css/index.css";

import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Bar } from "react-chartjs-2";
import { getPredictionByPlayer } from "../rest/PredictionService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  border: "2px solid #455d58",
  borderRadius: "5px",
  backgroundColor: "#faf7f2",
}));

export const dataRadar = {
  labels: ["Thing 1", "Thing 2", "Thing 3", "Thing 4", "Thing 5", "Thing 6"],
  datasets: [
    {
      label: "# of Votes",
      data: [2, 9, 3, 5, 2, 3],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

function titleCase(str) {
  return str
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const getPentagonData = (selectedPlayer) => {
  let data = [];
  let dataObject = {
    data: {
      shooting: selectedPlayer.shooting / 100,
      passing: selectedPlayer.passing / 100,
      dribbling: selectedPlayer.dribbling / 100,
      defending: selectedPlayer.defending / 100,
      physic: selectedPlayer.physic / 100,
      pace: selectedPlayer.pace / 100,
    },
    meta: { color: "blue" },
  };
  console.log(dataObject);
  data.push(dataObject);
  return data;
};

const captions = {
  // columns
  shooting: "Shooting",
  dribbling: "Dribbling",
  passing: "Passing",
  physic: "Physic",
  defending: "Defending",
  pace: "Pace",
};

const positionMetricMapping = {
  //   FW: Goals, asssits, gca
  // MF: Goals, assists, passes
  // DF: Passes, Aerials won, players dribbled

  FW: ["goals", "assists", "gca"],
  MF: ["goals", "assists", "passes"],
  DF: ["passes", "aerials_won_pct", "players_dribbled_past"],
};

const someOptions = {
  captionProps: () => ({
    className: "caption",
    textAnchor: "middle",
    fontSize: 15,
    fontFamily: "sans-serif",
  }),
};

export const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#455d58",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const metricsToShow = [
  "shots_total",
  "assisted_shots",
  "tackles",
  "passes_live",
  "pressure_regains",
  "gca",
  "goals",
  "passes",
];

const getRows = (selectedPlayer) => {
  let rows = [];
  let row = {};
  for (let key of Object.keys(selectedPlayer)) {
    if (metricsToShow.includes(key)) {
      row[titleCase(key)] = selectedPlayer[key];
    }
  }
  rows.push(row);
  return rows;
};

// const goalLabels = ["goals_min", "goals_25", "goals_50", "goals_75", "goals_max"];
// const assistLabels = ["assist_min", "assists_25", "assists_50", "assists_75", "assists_max"];
const baseLabels = ["_min", "_25", "_50", "_75", "_max"];

export const barChartData = {
  labels: baseLabels,
  datasets: [
    {
      label: "Dataset 1",
      data: [0.2, 0.4, 0.5],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      minBarLength: 1.5,
      maxBarThickness: 40,
    },
  ],
};

export default function PredictedValuesScreen() {
  const { state } = useSelectionContext();

  const [player, setPlayer] = React.useState(null);
  const [predictedValue, setPredictedValue] = React.useState(0);

  const setBarChartData = (fieldName) => {
    const barLabels = baseLabels.map((baseLabel) => {
      return fieldName + baseLabel;
    });

    const playerPosition = state.selectedPlayer.position.split(",")[0];
    let statToConsider;
    let stats = state.selectedTeam.stats;
    for (let i = 0; i < stats.length; i++) {
      if (stats[i].pos === playerPosition) {
        statToConsider = stats[i];
        break;
      }
    }

    let values = [];

    for (let key of Object.keys(statToConsider)) {
      if (key.includes(fieldName)) {
        values.push(statToConsider[key] / 3);
      }
    }

    let barDataSet = [];
    let barDataSetObject = {
      label: fieldName,
      data: values,
      backgroundColor: "#455d58",
      minBarLength: 1.5,
      maxBarThickness: 60,
    };
    barDataSet.push(barDataSetObject);

    let barChartObject = {};
    barChartObject.labels = barLabels;
    barChartObject.datasets = barDataSet;
    console.log(barChartObject);
    return barChartObject;
  };

  React.useEffect(() => {
    getPredictionByPlayer(
      state.selectedPlayer.player,
      state.selectedTeam.team
    ).then((response) => {
      setPredictedValue(
        numberWithCommas(Math.round(response.data.predictedValue))
      );
    });
  }, []);

  return (
    <Box style={{ margin: "2rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          {/* <Card style={{ backgroundColor: "#faf7f2" }}>
            <CardContent> */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "80px",
              marginTop: "2.3rem",
            }}
          >
            <Avatar
              src={state.selectedPlayer?.photo}
              style={{ marginTop: "20px", border: "4px solid #455d58" }}
              sx={{ bgcolor: "red", width: 200, height: 260 }}
              variant="square"
            />

            <div style={{ marginLeft: "10px" }}>
              <p
                style={{
                  fontFamily: "MyFontThin",
                  fontWeight: "800",
                  fontSize: "30px",
                  marginTop: "-8px",
                
                }}
              >
                Player Name : {state.selectedPlayer?.player}
              </p>
              <p
                style={{
                  fontFamily: "MyFontThin",
                  fontWeight: "800",
                  fontSize: "25px",
                  textAlign: "left",
                }}
              >
                Age : {state.selectedPlayer?.age}
              </p>
              <p
                style={{
                  fontFamily: "MyFontThin",
                  fontWeight: "800",
                  fontSize: "25px",
                  textAlign: "left",
                }}
              >
                Club : {state.selectedPlayer?.squad}
              </p>
              <p
                style={{
                  fontFamily: "MyFontThin",
                  fontWeight: "800",
                  fontSize: "25px",
                  textAlign: "left",
                }}
              >
                Current Market Value :{" "}
                {numberWithCommas(state.selectedPlayer?.value_eur)} €
              </p>
            </div>

            <div
              style={{
                position: "absolute",
                left: "42%",
                border: "2px solid #455d58",
                height: "200px",
                width: "300px",
                borderRadius: "5px",
              }}
            >
              <p>{}</p>
              <p
                style={{
                  fontFamily: "MyFontThin",
                  fontWeight: "900",
                  fontSize: "40px",
                }}
              >
                Predicted Value: {predictedValue} €
              </p>
              <p></p>
            </div>
          </div>
          {/* </CardContent>
          </Card> */}
        </Grid>
        <Grid item xs={4}>
          <div
          // style={{
          //   height: "350px",
          //   width: "350px",
          // }}
          >
            {/* <Radar data={dataRadar} /> */}
            {state.selectedPlayer && (
              <RadarChart
                captions={captions}
                data={getPentagonData(state.selectedPlayer, player)}
                size={350}
                options={someOptions}
              />
            )}
          </div>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <p
              style={{
                fontFamily: "MyFont",
                fontWeight: "900",
                fontSize: "20px",
              }}
            >
              Team Based Statistics for <p style={{ fontWeight: "1900",fontSize: "30px",}}>{state.selectedTeam.team}</p>
            </p>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              {positionMetricMapping[
                state.selectedPlayer.position.split(",")[0]
              ].map((metric) => {
                return (
                  <div style={{ margin: "auto" }}>
                    <Bar
                      options={barOptions}
                      data={setBarChartData(metric)}
                      style={{ height: "300px", width: "400px" }}
                    />
                  </div>
                );
              })}
              {/* <div style={{ margin: "auto" }}>
                <Bar
                  options={barOptions}
                  data={setBarChartData("goals")}
                  style={{ height: "300px", width: "400px" }}
                />
              </div>
              <div style={{ margin: "auto" }}>
                <Bar
                  options={barOptions}
                  data={setBarChartData("assists")}
                  style={{ height: "300px", width: "400px" }}
                />
              </div>
              <div style={{ margin: "auto" }}>
                <Bar
                  options={barOptions}
                  data={setBarChartData("gca")}
                  style={{ height: "300px", width: "400px" }}
                />
              </div>
              <div style={{ margin: "auto" }}>
                <Bar
                  options={barOptions}
                  data={setBarChartData("passes")}
                  style={{ height: "300px", width: "400px" }}
                />
              </div> */}
            </div>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <p
              style={{
                fontFamily: "MyFont",
                fontWeight: "900",
                fontSize: "20px",
              }}
            >
              Player based Statistics for {state.selectedPlayer.player}
            </p>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <TableContainer
                component={Paper}
                style={{ width: "60%", margin: "2rem auto" }}
              >
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      {metricsToShow.map((metric) => {
                        return (
                          <StyledTableCell>{titleCase(metric)}</StyledTableCell>
                        );
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getRows(state.selectedPlayer).map((row) => (
                      <StyledTableRow>
                        {/* <StyledTableCell>{row.team.team}</StyledTableCell>
                        <StyledTableCell align="right">
                          {row.player.player}
                        </StyledTableCell> */}
                        {metricsToShow.map((metric) => {
                          return (
                            <StyledTableCell>
                              {row[titleCase(metric)]}
                            </StyledTableCell>
                          );
                        })}
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
