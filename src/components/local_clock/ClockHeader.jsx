import { Grid, Typography } from "@mui/material";
import ClockDisplay from "../share/ClockDisplay";
import { useState } from "react";
import ClockForm from "../share/ClockForm";

const ClockHeader = ({
  localClock,
  formState,
  updateLocalClock,
  clockCreateHandler,
}) => {
  const [open, setOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createHandleClose = () => {
    setCreateOpen(false);
  };

  const createHandleOpen = () => {
    setCreateOpen(true);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginY: "20px",
        }}
      >
        <Grid item xs={6}>
          {formState.date !== null && (
            <ClockDisplay
              local={true}
              title={localClock.title}
              date={formState.date}
              offset={formState.offset}
              timezone={formState.timezone}
              handleClickOpen={handleClickOpen}
              handleCreateOpen={createHandleOpen}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant="h2"
            sx={{ fontWeight: "bold", color: "GrayText" }}
          >
            Track-Zone
          </Typography>
        </Grid>
      </Grid>
      <ClockForm
        open={open}
        handleClose={handleClose}
        onSubmitHandler={updateLocalClock}
        clockInfo={localClock}
      />
      <ClockForm
        open={createOpen}
        create={true}
        handleClose={createHandleClose}
        onSubmitHandler={clockCreateHandler}
      />
    </>
  );
};

export default ClockHeader;
