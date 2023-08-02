import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CreateNewFolder } from "@mui/icons-material";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { FormControl } from "@mui/material";
import { useState } from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const INIT_VALUE = {
  title: "",
  date: new Date(),
};

const EventForm = ({
  open,
  handleClose,
  clockId,
  onSubmitHandler,
  create = true,
  eventInfo = { ...INIT_VALUE },
}) => {
  const [state, setState] = useState(eventInfo);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onDateChangeHandler = (value) => {
    setState((prev) => ({
      ...prev,
      date: value,
    }));
  };

  const onSubmit = () => {
    if (create) {
      onSubmitHandler(state, clockId);
      setState({ ...INIT_VALUE });
    } else {
      onSubmitHandler(state, clockId);
      handleClose();
    }
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          {create ? "Create New Event" : "Update Event"}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: "10px" }}>
            <TextField
              label="Event Title"
              name="title"
              value={state.title}
              onChange={onChangeHandler}
            />
          </FormControl>
          <br />
          <br />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker
                label="Set Your Date & Time"
                value={state.date}
                onChange={(value) => onDateChangeHandler(value)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancel
          </Button>
          {create ? (
            <Button
              startIcon={<CreateNewFolder />}
              onClick={onSubmit}
              variant="contained"
              color="success"
            >
              Create Event
            </Button>
          ) : (
            <Button
              startIcon={<UpgradeIcon />}
              onClick={onSubmit}
              variant="contained"
              color="info"
            >
              Update Event
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EventForm;
