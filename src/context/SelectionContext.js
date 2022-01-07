import React from "react";

const SelectionContext = React.createContext({
  "selectedPlayer": null,
  "selectedTeam": null
});

export default SelectionContext;


function selectionReducer(state, action) {
    switch (action.type) {
      case 'increment': {
        return {count: state.count + 1}
      }
      case 'decrement': {
        return {count: state.count - 1}
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`)
      }
    }
  }
  
  function CountProvider({children}) {
    const [state, dispatch] = React.useReducer(selectionReducer, {
      "selectedPlayer": null,
      "selectedTeam": null
    })
    // NOTE: you *might* need to memoize this value
    // Learn more in http://kcd.im/optimize-context
    const value = {state, dispatch}
    return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>
  }
  
  function useCount() {
    const context = React.useContext(SelectionContext)
    if (context === undefined) {
      throw new Error('useCount must be used within a CountProvider')
    }
    return context
  }
  export {CountProvider, useCount}
