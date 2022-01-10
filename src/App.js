import "./App.css";
import Layout from "./components/Layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TeamsScreen from "./screens/HomeScreen";
import SelectionScreen from "./screens/SelectionScreen";
import PredictedValuesScreen from "./screens/PredictedValuesScreen";
import { SelectionProvider } from "./context/SelectionProvider";

function App() {
  return (
    <div className="App" >
      <BrowserRouter>
        <Layout />
        <Routes>
          
          <Route path="/" element={<SelectionProvider><SelectionScreen/> </SelectionProvider>} />
          <Route path="/test" element={<SelectionProvider><PredictedValuesScreen/></SelectionProvider>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
