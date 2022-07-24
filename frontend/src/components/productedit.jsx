import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
//import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import RefService from "../RefService";

const refService = new RefService();

function PaperComponent(props) {
  const nodeRef = React.useRef(null);
  return (
      <Draggable nodeRef={nodeRef}
          handle="#draggable-dialog-title"
          cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper ref={nodeRef} {...props} />
      </Draggable>
  );
}

export default function ProductDialog(props) {
  //const [open, setOpen] = React.useState(true);

  const {
    id,
    elementData,
    open,
    setOpen = Function.prototype,
    setMountState = Function.prototype,
    onClose = Function.prototype,
  } = props;
  const [saved, setStateSaved] = React.useState(false);
  const [dialogData, setDialogData] = React.useState(elementData);
  //const fields = ['id','name'];

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleSave = () => {
    setStateSaved(true);
    setMountState(false);
    if (id === 0){
      handleCreate();
    }
    else {
      handleUpdate();
    }

  };

  const handleSaveAndClose = () => {
    handleSave();
    handleClose();
  };

  const handleCreate = () => {
    //console.log('handleCreate(): name (of element): '+dialogData.name);
    //console.log(dialogData);
      refService.createElement(
        {
         // "pk": this.props.id,
         // "id": this.props.id,
          "name": dialogData.name,
        },
          'products'
        ).then((result) => {
      //console.log("element created!");
      setStateSaved(true);
    }).catch(() => {
      alert('There was an error! Please re-check your form.');
    });
  };

  const handleUpdate = () => {
    //console.log('handleUpdate(): id = '+id);
    refService.updateElement(
        dialogData,
        'products'
    ).then((result)=>{
      //console.log(result);
      setStateSaved(true);
      //console.log("Element updated!");
    }).catch(()=>{
      alert('There was an error! Please re-check your form.');
    });
  }

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setDialogData({...dialogData, [name]: value })
    setStateSaved(false);
  };

  return (
    <div>
      <Dialog
          open={open}
          onClose={handleClose}
          PaperComponent={PaperComponent}

      >
        <DialogTitle>{id === 0 ? 'Add': 'Edit'} Product{(id !==0) && (saved===false) ? ('*'):('')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="id"
            name="id"
            label="№"
            type="text"
            fullWidth
            variant="standard"
            disabled={true}
            size="small"
            value={id}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={dialogData.name}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleSaveAndClose}>Save & Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
