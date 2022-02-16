import "./App.css";
import Layout from "./components/Layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TeamsScreen from "./screens/HomeScreen";
import SelectionScreen from "./screens/SelectionScreen";
import PredictedValuesScreen from "./screens/PredictedValuesScreen";
import { SelectionProvider } from "./context/SelectionProvider";
import SavedSelectionsScreen from "./screens/SavedSelectionsScreen";
import PredictionExplanationScreen from "./screens/PredictionExplanationScreen";

function App() {
  return (
    <div className="App" >
      <BrowserRouter>
        <Layout />
        <Routes>
          
          <Route path="/" element={<SelectionProvider><SelectionScreen/> </SelectionProvider>} />
          <Route path="/prediction" element={<SelectionProvider><PredictedValuesScreen/></SelectionProvider>} />
          <Route path="/saved-selections/:username" element={<SelectionProvider><SavedSelectionsScreen/></SelectionProvider>} />
          <Route path="/explain" element={<PredictionExplanationScreen/>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
