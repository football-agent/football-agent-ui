import * as React from "react";

const SelectionContext = React.createContext();

function selectionReducer(state, action) {
  switch (action.type) {
    case "selectedTeamUpdate": {
      let newState = { ...state };
      newState.selectedTeam = action.payload;
      return newState;
    }
    case "selectedPlayerUpdate": {
      let newState = { ...state };
      newState.selectedPlayer = action.payload;
      return newState;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function SelectionProvider({ children }) {
  const [state, dispatch] = React.useReducer(selectionReducer, {
    selectedTeam: null,
    selectedPlayer: null
  });
  const value = { state, dispatch };
  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

function useSelectionContext() {
  const context = React.useContext(SelectionContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

export { SelectionProvider, useSelectionContext };
