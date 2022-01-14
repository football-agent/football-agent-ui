import React, { useContext } from "react";
import { useSelectionContext } from '../context/SelectionProvider'


export default function PredictedValuesScreen() {
    const {
        state
      } = useSelectionContext()
  return (
    <div>
      {/* <p>Selected Player: {state.selectedPlayer.player}</p>
      <p>Selected Team: {state.selectedTeam.team}</p>
      <p>The predicted value is 1000000</p>
      <p>The player performs 10 percent better than rest of the team </p> */}
    </div>
  );
}
