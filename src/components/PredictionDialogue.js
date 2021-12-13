import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function PredictionDialog(props) {
  const [open, setOpen] = React.useState(false);


  const handleClose = () => {
   props.handleDialogueClose()
  };

  return (
    <div>
      <Dialog
        open={props.isDialogueOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
         Predicted Values
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Predicted Salary:  {props.selectedPlayer.wage_eur}
          </DialogContentText>
        </DialogContent>
        
      </Dialog>
    </div>
  );
}
