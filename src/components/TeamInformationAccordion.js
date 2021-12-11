import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function TeamInformationAccordion(props) {
  return (
    <div>
      <Accordion style={{backgroundColor: '#ECECEC'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{props.selectedTeam.team}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Team Size: {props.selectedTeam.players.length}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
