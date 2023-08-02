import { Container } from "@mui/material";
import ClockHeader from "../components/local_clock/ClockHeader";
import { useState } from "react";
import Clocks from "../components/clocks/Clocks";
import { TIMEZONE_OFFSET } from "../constant/time";
import shortid from "shortid";
import useClock from "../hooks/useClock";

const INIT_VALUE = {
  title: "Local Clock",
  timezone: "",
  offset: 0,
};

const App = () => {
  const [local, setLocal] = useState({ ...INIT_VALUE });
  const { formState } = useClock(local.timezone, local.offset);
  const [clocks, setClocks] = useState([]);
  const [events, setEvents] = useState({});

  const createEvent = (event, clockId) => {
    const eventId = shortid.generate();
    const id = `${clockId}|${eventId}`;
    event.id = eventId;
    setEvents((prev) => ({
      ...prev,
      [id]: event,
    }));
  };

  const updateLocalClock = (clock) => {
    setLocal((...prev) => ({
      ...prev,
      ...clock,
    }));
  };

  const clockEditHandler = (clock, id) => {
    const oldState = [...clocks];
    oldState.map((clockItem) => {
      if (clockItem.id === id) {
        clockItem.title = clock.title;
        clockItem.timezone = clock.timezone;
        clockItem.offset = clock.offset;
      }
      return clockItem;
    });
    setClocks(oldState);
  };

  const deleteEventHandler = (id) => {
    const oldEventState =
      events &&
      Object.keys(events).reduce((acc, curr) => {
        if (!curr.endsWith(id)) {
          acc[curr] = events[curr];
        }
        return acc;
      }, {});
    setEvents(oldEventState);
  };

  const editEventHandler = (event, id) => {
    const oldEventState = Object.keys(events).reduce((acc, curr) => {
      if (curr.endsWith(id)) {
        events[curr] = {
          ...events[curr],
          ...event,
        };
      }
      acc[curr] = events[curr];
      return acc;
    }, {});
    setEvents(oldEventState);
  };

  const clockDeleteHandler = (id) => {
    const oldEventState =
      events &&
      Object.keys(events).reduce((acc, curr) => {
        if (!curr.startsWith(id)) {
          acc[curr] = events[curr];
        }
        return acc;
      }, {});
    setEvents(oldEventState);
    const oldState = clocks.filter((clock) => clock.id !== id);
    setClocks(oldState);
  };

  const createClockHandler = (clock) => {
    clock.id = shortid.generate();
    if (clock.timezone === "GMT" || clock.timezone === "UTC") {
      setClocks([...clocks, clock]);
      return;
    } else {
      clock.offset = TIMEZONE_OFFSET[clock.timezone];
      setClocks([...clocks, clock]);
    }
  };

  return (
    <div>
      <Container>
        <ClockHeader
          localClock={local}
          formState={formState}
          updateLocalClock={updateLocalClock}
          clockCreateHandler={createClockHandler}
        />
        <hr />
        <br />
        <br />
        <Clocks
          events={events}
          localClock={formState}
          clocks={clocks}
          editEventHandler={editEventHandler}
          deleteEventHandler={deleteEventHandler}
          clockEditHandler={clockEditHandler}
          clockDeleteHandler={clockDeleteHandler}
          onEventSubmitHandler={createEvent}
        />
      </Container>
    </div>
  );
};

export default App;
