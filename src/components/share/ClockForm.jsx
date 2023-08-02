import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CreateNewFolder } from "@mui/icons-material";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { TIMEZONE_NAME, OFFSET } from "../../constant/time";

const INIT_VALUE = {
  title: "",
  timezone: "",
  offset: 0,
};

const ClockForm = ({
  open,
  handleClose,
  onSubmitHandler,
  create,
  clockInfo = { ...INIT_VALUE },
}) => {
  const [state, setState] = useState(clockInfo);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = () => {
    if (create) {
      onSubmitHandler(state);
      setState({ ...INIT_VALUE });
    } else {
      onSubmitHandler(state, clockInfo?.id);
      handleClose();
    }
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{create ? "Create Clock" : "Update Clock"}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: "10px" }}>
            <TextField
              label="Title"
              name="title"
              value={state.title}
              onChange={onChangeHandler}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mt: "20px" }}>
            <InputLabel id="timezone">Time Zone</InputLabel>
            <Select
              labelId="timezone"
              value={state.timezone}
              label="Time Zone"
              name="timezone"
              onChange={onChangeHandler}
            >
              {TIMEZONE_NAME.map((name, index) => (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {(state.timezone === "GMT" || state.timezone === "UTC") && (
            <FormControl fullWidth sx={{ mt: "20px" }}>
              <InputLabel id="offset">Offset</InputLabel>
              <Select
                labelId="offset"
                value={state.offset}
                label="Offset"
                name="offset"
                onChange={onChangeHandler}
              >
                {OFFSET.map((value, index) => (
                  <MenuItem key={index} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
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
              Create
            </Button>
          ) : (
            <Button
              startIcon={<UpgradeIcon />}
              onClick={onSubmit}
              variant="contained"
              color="info"
            >
              Update
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClockForm;
