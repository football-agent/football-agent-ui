import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import TeamAvatar from "./TeamAvatar";
import PlayerAutocomplete from "./PlayerAutocomplete";
import { useNavigate } from "react-router-dom";
import { useSelectionContext } from "../context/SelectionProvider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { addSelection } from "../rest/UserService";

const steps = ["Select Team", "Select Player"];

export default function SelectionStepper(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [selectedTeam, setSelectedTeam] = React.useState(null);
  const [selectedPlayer, setSelectedPlayer] = React.useState(null);
  const [isChecked, setIsChecked] = React.useState(false);
  const navigate = useNavigate();
  const { dispatch } = useSelectionContext();

  const handleNext = () => {
    let newSkipped = skipped;

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    if (activeStep === 1) {
      if (isChecked) {
        addSelection(localStorage.getItem("username"), {
          selectedTeam: selectedTeam,
          selectedPlayer: selectedPlayer
        }).then(() => {
          console.log("Selection Saved");
        });
      }
      navigate("/prediction");
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onPlayerChange = (value) => {
    props.handlePlayerSelect(value);
    dispatch({ type: "selectedPlayerUpdate", payload: value });
    setSelectedPlayer(value);
  };

  const handleTeamSelect = (teamName) => {
    let selectedTeam = props.teams.filter((team) => team.team === teamName)[0];
    setSelectedTeam(selectedTeam);
    dispatch({ type: "selectedTeamUpdate", payload: selectedTeam });
  };

  const handleCheckBoxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const getStepperStepContent = (activeStep) => {
    if (activeStep === 0) {
      return (
        <React.Fragment>
          {/* <div style={{ display: "flex", flexWrap: "wrap", flexDirection: 'row' }}> */}
          <div style={{ display: "grid", gridTemplateColumns: 'repeat(8, 1fr)' , gap: '10px', rowGap: '10px'}}>
            {props.teams.map((team) => {
              return (
                <TeamAvatar
                  teamName={team.team}
                  teamImage={team.logo}
                  handleTeamSelect={handleTeamSelect}
                  selectedTeam={selectedTeam}
                />
              );
            })}
          </div>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              onClick={handleNext}
              variant="contained"
              color="success"
              style={{ backgroundColor: "#455d58", color: "white" }}
            >
              {activeStep === steps.length - 1 ? "Predict" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      );
    } else if (activeStep === 1) {
      return (
        <React.Fragment>
          <div style={{ padding: "1rem" }}>
            <PlayerAutocomplete onPlayerChange={onPlayerChange} />
            {localStorage.getItem("token") &&
              selectedPlayer &&
              selectedTeam && (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isChecked}
                      onChange={handleCheckBoxChange}
                    />
                  }
                  label="Check here to save your selection"
                />
              )}
          </div>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
              style={{ backgroundColor: "#455d58", color: "white" }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              onClick={handleNext}
              variant="contained"
              color="success"
              style={{ backgroundColor: "#455d58", color: "white" }}
            >
              {activeStep === steps.length - 1 ? "Predict" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      );
    }
  };

  return (
    <Box
      sx={{
        width: "60%",
        display: "inline-block",
        background: "#faf7f2",
        padding: "1rem",
        borderRadius: "10px",
        border: "4px solid",
        borderColor: "#455d58",
      }}
    >
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {getStepperStepContent(activeStep)}
    </Box>
  );
}
