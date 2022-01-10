import React, { useContext } from "react";
import { useSelectionContext } from '../context/SelectionProvider'


export default function PredictedValuesScreen() {
    const {
        state
      } = useSelectionContext()
  return (
    <div>
      <p>Selected Player: {state.selectedPlayer.player}</p>
      <p>Selected Team: {state.selectedTeam.team}</p>
    </div>
  );
}
