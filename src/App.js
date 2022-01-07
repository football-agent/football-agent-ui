import "./App.css";
import Layout from "./components/Layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TeamsScreen from "./screens/HomeScreen";
import SelectionScreen from "./screens/SelectionScreen";
import PredictedValuesScreen from "./screens/PredictedValuesScreen";

function App() {
  return (
    <div className="App" >
      <BrowserRouter>
        <Layout />
        <Routes>
          <Route path="/" element={<SelectionScreen/>} />
          <Route path="/test" element={<PredictedValuesScreen/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
