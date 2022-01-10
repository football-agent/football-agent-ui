import React, {useContext} from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SelectionStepper from "../components/SelectionStepper";
import { getAllTeams } from "../rest/TeamService";
import { display } from "@mui/system";
import { AlignHorizontalCenter } from "@mui/icons-material";
import { useSelectionContext } from '../context/SelectionProvider'



export default function SelectionScreen() {
  const [isStartPredictButtonClicked, setIsStartPredictButtonClicked] =
    React.useState(false);
  const [teams, setTeams] = React.useState([]);
  const [selectedTeam, setSelectedTeam] = React.useState(null);
  const [selectedPlayer, setSelectedPlayer] = React.useState(null);
  // const context = useContext(SelectionContext)
  const {dispatch}= useSelectionContext()


  const handleStartPredictButtonClick = () => {
    setIsStartPredictButtonClicked(true);
    getAllTeams().then((response) => {
      setTeams(response.data);
    });
  };

  const handleTeamSelect = (value) => {
    setSelectedTeam(value);
    dispatch({type: 'selectedTeamUpdate'}, value)
  };

  const handlePlayerSelect = (value) => {
    setSelectedPlayer(value);
    // context?.updateSelectedPlayer(value)
    dispatch({type: 'selectedPlayerUpdate'}, value)

  };

  return (
    <div>
      <p
        style={{
          fontSize: "3.5rem",
          fontFamily: "MyFont",
          color: "#455d58",
          padding: "1",
          marginBlock: "20px"
          
        }}
      >
        Revolutionizing value quantification
      </p>
      <hr style={{AlignHorizontalCenter, width:"60%",borderWidth:"2px", display: isStartPredictButtonClicked ? "none" : "inherit"}}/>
      {/* //TODO: chnage it to light theme */}
      <div
        style={{
          width: "90%",
          display: isStartPredictButtonClicked ? "none" : "inherit",
          marginLeft:"5%", 
          marginTop: "3%"
          
        }}
      >
        <p
          style={{ fontSize: "1.3rem", fontFamily: "MyFont", color: "#455d58", margin:"0px" }}
        >
          The predictor provides football agents, club executives and ambitious
          players data-driven football insights. The predictor analysis the past
          performance of the player, benchmarks its performance to its peers in
          the top 5 european leagues, and contextualises within the players
          future club financials to obtain its fair value.{" "}
        </p>
        
      </div>
      <div>
        <hr style={{display: isStartPredictButtonClicked ? "none" : "inherit", marginTop:"3%",  AlignHorizontalCenter, width:"60%",borderWidth:"2px"}}/> 
      </div>
      
      
      <div
        style={{
          
          left: "43%",
          position: "absolute",
          marginTop:"5%", 
          // backgroundImage: "url(/PlayerAutocomplete.jpeg)"
          // display: !isStartPredictButtonClicked ? 'none' : 'sese'
          borderColor: "#455d58",
          border: "4px solid",
          borderRadius: "10px",
          display: isStartPredictButtonClicked ? "none" : "inherit",
        }}
      >
        
        <Button
          onClick={handleStartPredictButtonClick}
          variant="contained"
          disableElevation
          disabled={isStartPredictButtonClicked}
          
          // startIcon={<AddIcon />}
          style={{ height: "6rem", width: "15rem", backgroundColor: "#faf7f2" }}
        >
          <p
            style={{
              color: "#455d58",
              fontSize: "1.5rem",
              fontFamily: "MyFont",
            }}
          >
            Start Predicting
          </p>
        </Button>
      </div>
      {isStartPredictButtonClicked && (
        <div style={{ margin: "4rem" }}>
          <SelectionStepper
            teams={teams}
            handleTeamSelect={handleTeamSelect}
            handlePlayerSelect={handlePlayerSelect}
          />
        </div>
      )}
    </div>
  );
}
