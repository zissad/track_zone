import { Grid, Typography } from "@mui/material";
import ClockList from "./ClockList";

const Clocks = ({
  clocks,
  events,
  localClock,
  clockEditHandler,
  clockDeleteHandler,
  onEventSubmitHandler,
  editEventHandler,
  deleteEventHandler,
}) => {
  return (
    <Grid container spacing={2}>
      {clocks.length !== 0 ? (
        clocks.map((clock) => (
          <Grid key={clock.id} item xs={4}>
            <ClockList
              editEventHandler={editEventHandler}
              deleteEventHandler={deleteEventHandler}
              events={events}
              clock={clock}
              localClock={localClock}
              clockEditHandler={clockEditHandler}
              clockDeleteHandler={clockDeleteHandler}
              onEventSubmitHandler={onEventSubmitHandler}
            />
          </Grid>
        ))
      ) : (
        <Typography variant="body1">No Clock Created : </Typography>
      )}
    </Grid>
  );
};

export default Clocks;
