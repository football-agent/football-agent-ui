import React, { useEffect } from "react";
import { getAllSelections } from "../rest/UserService";
import { useNavigate } from "react-router-dom";
import SelectionTable from "../components/SelectionTable";

export default function SavedSelectionsScreen(props) {
  const [selections, setSelections] = React.useState(null);


  useEffect(() => {
    getAllSelections(localStorage.getItem("username")).then((response) => {
      setSelections(response.data);
    });
  }, []);

  return <div>{selections && <SelectionTable selections={selections} />}</div>;
}
