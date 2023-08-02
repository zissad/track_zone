import { addMinutes, addSeconds } from "date-fns";
import { useEffect } from "react";
import { useState } from "react";
import { TIMEZONE_OFFSET } from "../constant/time";

const INIT_VALUE = {
  timezone: "",
  offset: "",
  date: null,
};

const useClock = (timezone = "", offset = 0) => {
  const [state, setState] = useState({ ...INIT_VALUE });
  const [utc, setUtc] = useState(null);
  useEffect(() => {
    const d = new Date();
    const localOffset = d.getTimezoneOffset();
    setUtc(addMinutes(d, localOffset));
  }, []);
  useEffect(() => {
    if (utc !== null) {
      let date;
      if (timezone) {
        offset = (TIMEZONE_OFFSET[timezone] || offset) * 60;
        date = addMinutes(utc, offset);
      } else {
        const localOffset = utc.getTimezoneOffset();
        const lt = utc.toUTCString().split(" ");
        timezone = lt[lt.length - 1];
        offset = -localOffset;
        date = addMinutes(utc, offset);
      }
      setState((prev) => ({
        ...prev,
        timezone,
        offset: offset / 60,
        date,
      }));
    }
  }, [utc, offset, timezone]);

  return {
    formState: state,
    utc,
  };
};

export default useClock;
