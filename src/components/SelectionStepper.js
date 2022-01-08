import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import TeamAvatar from "./TeamAvatar";
import PlayerAutocomplete from "./PlayerAutocomplete";
import { useNavigate } from 'react-router-dom';


const steps = ["Select Team", "Select Player"];

export default function SelectionStepper(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [selectedTeam, setSelectedTeam] = React.useState(null);
  const navigate = useNavigate();




  const handleNext = () => {
    let newSkipped = skipped;

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    if(activeStep===1){
        navigate('/test');

    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onPlayerChange = (value) => {
    props.handlePlayerSelect(value)
  };

  const handleTeamSelect = (teamName) => {
    setSelectedTeam(props.teams.filter((team) => team.team === teamName)[0]);
  };

  const getStepperStepContent = (activeStep) => {
    if (activeStep === 0) {
      return (
        <React.Fragment >
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {props.teams.map((team) => {
              return (
                <TeamAvatar
                  teamName={team.team}
                  handleTeamSelect={handleTeamSelect}
                  selectedTeam={selectedTeam}
                />
              );
            })}
          </div>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }} >
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
              
              
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }}   />
            <Button onClick={handleNext} variant="contained" color="success" style={{backgroundColor:"#455d58", color:"white"}}>
              {activeStep === steps.length - 1 ? "Predict" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      );
    } else if (activeStep === 1) {
      return (
        <React.Fragment>
          <div style={{padding: '1rem'}}>
            <PlayerAutocomplete onPlayerChange={onPlayerChange} />
          </div>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
              style={{backgroundColor:"#455d58", color:"white"}}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext} variant="contained" color="success" style={{backgroundColor:"#455d58", color:"white"}}>
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
        border: '4px solid',
        borderColor: '#455d58'
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
