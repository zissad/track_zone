import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import DeleteIcon from "@mui/icons-material/Delete";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { format, formatDistance } from "date-fns";

const ClockDisplay = ({
  title,
  id = "",
  date,
  timezone,
  localClock,
  offset,
  clockDeleteHandler,
  dialogOpen,
  handleClickOpen,
  handleCreateOpen,
  local = false,
}) => {
  return (
    <Card
      sx={{
        maxWidth: 370,
        boxShadow: "1px 3px 4px 4px rgba(0,0,0,0.2)",
        padding: "10px",
      }}
    >
      <CardContent>
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
          {local && format(date, "MM-dd-yyyy").toString()}
        </Typography>
        <Typography variant="h6" sx={{ color: "gray" }}>
          {timezone}{" "}
          {offset < 0 ? `-${Math.abs(offset)}` : `+${Math.abs(offset)}`}
        </Typography>
        {local === false && (
          <Typography variant="subtitle1">
            {formatDistance(localClock.date, date, {
              addSuffix: true,
            })}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ paddingBottom: "20px" }}>
        <Button
          onClick={handleClickOpen}
          startIcon={<EditIcon />}
          size="small"
          variant="contained"
        >
          Edit
        </Button>
        {local ? (
          <Button
            onClick={handleCreateOpen}
            startIcon={<CreateNewFolderIcon />}
            size="small"
            variant="contained"
            color="success"
          >
            Create Clock
          </Button>
        ) : (
          <>
            <Button
              onClick={() => {
                clockDeleteHandler(id);
              }}
              startIcon={<DeleteIcon />}
              size="small"
              variant="contained"
              color="error"
            >
              Delete
            </Button>
            <Button
              onClick={dialogOpen}
              startIcon={<EventNoteIcon />}
              size="small"
              variant="contained"
              color="secondary"
            >
              Events
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default ClockDisplay;
