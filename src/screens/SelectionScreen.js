import React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SelectionStepper from "../components/SelectionStepper";
import { getAllTeams } from "../rest/TeamService";


export default function SelectionScreen() {
  const [isStartPredictButtonClicked, setIsStartPredictButtonClicked] =
    React.useState(false);
  const [teams, setTeams] = React.useState([]);

  const handleStartPredictButtonClick = () => {
    setIsStartPredictButtonClicked(true);
    getAllTeams().then((response) => {
      setTeams(response.data);
    });
  };

  return (
    <div >
        <p style={{fontSize: '2rem', fontFamily:"cursive", color: 'white'}}>Revolutionizing value quantification</p>
      <div
        style={{
          top: isStartPredictButtonClicked ? "70%" : "45%",
          left: "45%",
          position: "absolute",
          backgroundImage: "url(/PlayerAutocomplete.jpeg)" 
        }}
      >
        <Button
          onClick={handleStartPredictButtonClick}
          variant="contained"
          disableElevation
          disabled={isStartPredictButtonClicked}
          startIcon={<AddIcon />}
          style={{ height: "6rem", width: "15rem" }}
        >
          Start Predicting
        </Button>
      </div>
      {isStartPredictButtonClicked && (
        <div style={{ margin: "4rem" }}>
          <SelectionStepper teams={teams} />
        </div>
      )}
    </div>
  );
}
