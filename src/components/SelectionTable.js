import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelectionContext } from "../context/SelectionProvider";
import { useNavigate } from "react-router-dom";



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const getRows = (selections) => {
  let rows = [];
  for (let i = 0; i < selections.length; i++) {
    let row = {
      team: selections[i].selectedTeam,
      player: selections[i].selectedPlayer,
    };
    rows.push(row);
  }
  return rows;
};



export default function SelectionTable(props) {
    const { dispatch } = useSelectionContext();
    const navigate = useNavigate();

   async function handleRowClick(team,player ){
        await dispatch({ type: "selectedTeamUpdate" }, team);
        await  dispatch({ type: "selectedTeamUpdate" }, player);
        navigate("/prediction");
    }

  return (
    <TableContainer
      component={Paper}
      style={{ width: "60%", margin: "2rem auto" }}
    >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Team </StyledTableCell>
            <StyledTableCell align="right">Player</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {console.log(getRows(props.selections))}
          {getRows(props.selections).map((row) => (
            <StyledTableRow onClick={()=>handleRowClick(row.team, row.player)}>
              <StyledTableCell >
                {row.team.team}
              </StyledTableCell>
              <StyledTableCell align="right">{row.player.player}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
