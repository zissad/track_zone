import { useState } from "react";
import useClock from "../../hooks/useClock";
import ClockDisplay from "../share/ClockDisplay";
import ClockForm from "../share/ClockForm";
import EventForm from "../share/EventForm";
import EventDialog from "../share/EvnetDialog";

const ClockList = ({
  clock,
  localClock,
  events,
  clockEditHandler,
  clockDeleteHandler,
  onEventSubmitHandler,
  deleteEventHandler,
  editEventHandler,
}) => {
  const { formState } = useClock(clock.timezone, clock.offset);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const dialogClose = () => setOpenDialog(false);
  const dialogOpen = () => setOpenDialog(true);

  const handleClose = () => setOpen(false);

  const handleOpen = () => setOpen(true);

  const filteredEvents =
    events &&
    Object.keys(events).reduce((acc, curr) => {
      if (curr.startsWith(clock.id)) {
        acc[curr] = events[curr];
      }
      return acc;
    }, {});

  return (
    formState.date !== null && (
      <>
        <ClockDisplay
          title={clock.title}
          localClock={localClock}
          id={clock.id}
          date={formState.date}
          offset={formState.offset}
          timezone={formState.timezone}
          handleClickOpen={handleOpen}
          clockDeleteHandler={clockDeleteHandler}
          dialogOpen={dialogOpen}
        />
        <ClockForm
          open={open}
          handleClose={handleClose}
          clockInfo={clock}
          onSubmitHandler={clockEditHandler}
        />
        <EventDialog
          open={openDialog}
          events={filteredEvents}
          editEventHandler={editEventHandler}
          deleteEventHandler={deleteEventHandler}
          localClock={localClock}
          handleClose={dialogClose}
          clockId={clock.id}
          title={clock.title}
          date={formState.date}
          timezone={formState.timezone}
          offset={formState.offset}
          onEventSubmitHandler={onEventSubmitHandler}
        />
      </>
    )
  );
};

export default ClockList;
