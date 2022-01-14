import React , {useEffect}from "react";
import { getAllSelections } from "../rest/UserService";
import { useNavigate } from "react-router-dom";


export default function SavedSelectionsScreen() {
  const [selections, setSelections] = React.useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    getAllSelections().then((response) => {
      setSelections(response.data);
    });
  }, []);

  return (
    <div>
      {selections.map((selection) => {
        <div>
          <p>{selection.selectedTeam}</p>
          <p>{selection.selectedPlayer}</p>
        </div>;
      })}
    </div>
  );
}
