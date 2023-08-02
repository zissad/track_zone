import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";
import { Button, Container, Grid } from "@mui/material";
import EventDisplay from "./EventDisplay";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { useState } from "react";
import EventForm from "./EventForm";
import EventItem from "./EventItem";

const EventDialog = ({
  open,
  events,
  handleClose,
  clockId,
  localClock,
  title,
  date,
  timezone,
  offset,
  onEventSubmitHandler,
  editEventHandler,
  deleteEventHandler,
}) => {
  const [openForm, setOpenForm] = useState(false);

  const openFormHandler = () => setOpenForm(true);
  const closeFormHandler = () => setOpenForm(false);

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1 }}
              variant="h6"
              component="div"
            ></Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <br />
          <Typography variant="body1">{title}</Typography>
          <Typography
            gutterBottom
            variant="h4"
            sx={{ marginBottom: 0, fontWeight: "bold", color: "#1db135" }}
          >
            {format(date, "KK:mm:ss bb").toString()}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
            }}
          >
            {format(date, "MM-dd-yyyy").toString()}
          </Typography>
          <Typography variant="h6" sx={{ color: "gray" }}>
            {timezone}{" "}
            {offset < 0 ? `-${Math.abs(offset)}` : `+${Math.abs(offset)}`}
          </Typography>
          <br />
          <Button
            onClick={openFormHandler}
            startIcon={<CreateNewFolderIcon />}
            size="small"
            variant="contained"
            color="secondary"
          >
            Create Event
          </Button>
          <br />
          <br />
          <hr />
          <br />
          <Grid container spacing={2}>
            {Object.keys(events).map((key) => (
              <EventItem
                key={key}
                id={key}
                clockId={clockId}
                editEventHandler={editEventHandler}
                deleteEventHandler={deleteEventHandler}
                date={events[key].date}
                title={events[key].title}
                localClock={localClock}
              />
            ))}
          </Grid>
          <EventForm
            open={openForm}
            handleClose={closeFormHandler}
            clockId={clockId}
            onSubmitHandler={onEventSubmitHandler}
            create={true}
          />
        </Container>
      </Dialog>
    </div>
  );
};

export default EventDialog;
