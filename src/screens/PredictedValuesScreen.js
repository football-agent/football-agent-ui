import * as React from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
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
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March"];

export const barChartData = {
  labels,
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

  // useEffect(() => {
  //   getPlayerbyName(localStorage.getItem("player")).then((response) => {
  //     setPlayer(response.data);
  //   });
  // }, []);

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
              sx={{ bgcolor: "red", width: 200, height: 230 }}
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
              <p
                style={{
                  fontFamily: "MyFontThin",
                  fontWeight: "900",
                  fontSize: "40px",
                }}
              >
                Predicted Value: 98178 €/week
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

        <Grid item xs={6}>
          <Item>
            <p
              style={{
                marginTop: "5px",
                fontFamily: "MyFont",
                fontWeight: "900",
                fontSize: "30px",
                color: "#455d58",
              }}
            >
              Team based statistic
            </p>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <div style={{ width: 200, height: 250, margin: "auto" }}>
                <CircularProgressbar
                  value={66}
                  text={"56%"}
                  styles={buildStyles({
                    pathColor: "#455d58",
                  })}
                />
                <p style={{ fontSize: "20px", fontFamily: "MyFont" }}>
                  Some Statistic
                </p>
              </div>
              <div style={{ width: 200, height: 250, margin: "auto" }}>
                <CircularProgressbar
                  value={66}
                  text={"56%"}
                  styles={buildStyles({
                    pathColor: "#455d58",
                  })}
                />
                <p style={{ fontSize: "20px", fontFamily: "MyFont" }}>
                  Some Statistic
                </p>
              </div>
              <div style={{ width: 200, height: 250, margin: "auto" }}>
                <CircularProgressbar
                  value={66}
                  text={"56%"}
                  styles={buildStyles({
                    pathColor: "#455d58",
                  })}
                />
                <p style={{ fontSize: "20px", fontFamily: "MyFont" }}>
                  Some Statistic
                </p>
              </div>
            </div>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <p
              style={{
                marginTop: "5px",
                fontFamily: "MyFont",
                fontWeight: "900",
                fontSize: "30px",
                color: "#455d58",
              }}
            >
              League based statistic
            </p>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <div style={{ width: 200, height: 250, margin: "auto" }}>
                <CircularProgressbar
                  value={66}
                  text={"56%"}
                  styles={buildStyles({
                    pathColor: "#455d58",
                  })}
                />
                <p style={{ fontSize: "20px", fontFamily: "MyFont" }}>
                  Some Statistic
                </p>
              </div>
              <div style={{ width: 200, height: 250, margin: "auto" }}>
                <CircularProgressbar
                  value={66}
                  text={"56%"}
                  styles={buildStyles({
                    pathColor: "#455d58",
                  })}
                />
                <p style={{ fontSize: "20px", fontFamily: "MyFont" }}>
                  Some Statistic
                </p>
              </div>
              <div style={{ width: 200, height: 250, margin: "auto" }}>
                <CircularProgressbar
                  value={66}
                  text={"56%"}
                  styles={buildStyles({
                    pathColor: "#455d58",
                  })}
                />
                <p style={{ fontSize: "20px", fontFamily: "MyFont" }}>
                  Some Statistic
                </p>
              </div>
            </div>
            {/* <div style={{ height: "200px", width: "200px", margin: "auto" }}>
              <Doughnut data={data} />
            </div> */}
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
              The magic behind our prediction
            </p>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <div style={{ margin: "auto" }}>
                <Bar
                  options={barOptions}
                  data={barChartData}
                  style={{ height: "300px", width: "400px" }}
                />
              </div>
              <div style={{ margin: "auto" }}>
                <Bar
                  options={barOptions}
                  data={barChartData}
                  style={{ height: "300px", width: "400px" }}
                />
              </div>
              <div style={{ margin: "auto" }}>
                <Bar
                  options={barOptions}
                  data={barChartData}
                  style={{ height: "300px", width: "400px" }}
                />
              </div>
            </div>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
