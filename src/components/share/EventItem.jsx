import { Grid } from "@mui/material";
import EventDisplay from "./EventDisplay";
import { useState } from "react";
import EventForm from "./EventForm";

const EventItem = ({
  id,
  editEventHandler,
  deleteEventHandler,
  date,
  title,
  localClock,
  clockId,
}) => {
  const [open, setOpen] = useState(false);
  const openHandler = () => setOpen(true);
  const closeHandler = () => setOpen(false);
  return (
    <>
      <Grid item xs={4}>
        <EventDisplay
          openHandler={openHandler}
          deleteEventHandler={deleteEventHandler}
          date={date}
          title={title}
          id={id}
          localClock={localClock}
        />
      </Grid>
      <EventForm
        open={open}
        handleClose={closeHandler}
        clockId={id}
        eventInfo={{ title, date }}
        onSubmitHandler={editEventHandler}
        create={false}
      />
    </>
  );
};

export default EventItem;
