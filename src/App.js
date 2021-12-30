import "./App.css";
import Layout from "./components/Layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TeamsScreen from "./screens/HomeScreen";
import SelectionScreen from "./screens/SelectionScreen";

function App() {
  return (
    <div className="App" style={{ 
      backgroundImage: "url(/PlayerAutocomplete.jpeg)" }} >
      <BrowserRouter>
        <Layout />
        <Routes>
          <Route path="/" element={<SelectionScreen/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
