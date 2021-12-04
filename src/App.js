import "./App.css";
import Layout from "./components/Layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TeamsScreen from "./screens/HomeScreen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout />
        <Routes>
          <Route path="/" element={<TeamsScreen/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
