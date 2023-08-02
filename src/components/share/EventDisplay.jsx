import { Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TimerIcon from "@mui/icons-material/Timer";
import { compareAsc, format, formatDistance } from "date-fns";
import classes from "./css/event.module.css";
import EditIcon from "@mui/icons-material/Edit";

const EventDisplay = ({
  date,
  title,
  id,
  localClock,
  openHandler,
  deleteEventHandler,
}) => {
  const compar = compareAsc(date, localClock.date);

  return (
    <div className={classes.event}>
      <Typography variant="h5" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body1" className={classes.date}>
        {format(date, "EEEE, LLLL dd, yyyy")}
      </Typography>
      <Typography variant="h5" className={classes.time}>
        {format(date, "hh:mm a")}
      </Typography>
      <Button
        disableTouchRipple={true}
        variant="text"
        color={compar === 1 ? "warning" : "success"}
        startIcon={<TimerIcon />}
      >
        {" "}
        {compar === 1
          ? formatDistance(localClock.date, date, { includeSeconds: true })
          : "Completed"}
      </Button>
      <br />
      <Button
        onClick={openHandler}
        startIcon={<EditIcon />}
        size="small"
        variant="contained"
      >
        Edit
      </Button>
      <Button
        sx={{ marginLeft: "10px" }}
        size="small"
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={() => deleteEventHandler(id)}
      >
        Delete
      </Button>
    </div>
  );
};

export default EventDisplay;
