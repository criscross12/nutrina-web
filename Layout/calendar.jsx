import { today } from "@internationalized/date";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Calendar() {
  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());

  const startDay = value.clone().startOf("month").startOf("week");
  const endDay = value.clone().endOf("month").endOf("week");

  useEffect(() => {
    const day = startDay.clone().subtract(1, "day");
    const a = [];
    while (day.isBefore(endDay, "day")) {
      a.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, "day").clone())
      );
    }
    setCalendar(a);
  }, [value]);

  function isSelected(day) {
    return value.isSame(day, "day");
  }

  function beforeToday(day) {
    return day.isBefore(new Date(), "day");
  }

  function isToday(day) {
    return day.isSame(new Date(), "day");
  }

  function dayStyles(day) {
    if (beforeToday(day)) return "before";
    if (isSelected(day)) return "selected";
    if (isToday(day)) return "selected1";
    return "";
  }

  function currYear() {
    return value.format("YYYY");
  }

  function currMonth() {
    return value.format("MMMM");
  }
  function prevMonth() {
    return value.clone().subtract(1, "month");
  }

  function nextMonth() {
    return value.clone().add(1, "month");
  }

  function thisMonth() {
    return value.isSame(new Date(), "month");
  }

  return (
    <div className="inicio">
      <div className="calendar">
        <div className="header cursor-pointer">
          <div onClick={() => !thisMonth() && setValue(prevMonth())}>
            {!thisMonth() ? String.fromCharCode(171) : null}
          </div>
          {currMonth().toUpperCase()} {currYear()}
          <div onClick={() => setValue(nextMonth())}>
            {String.fromCharCode(187)}
          </div>
        </div>
        <div className="day-names w-full justify-center text-center text-red-500 grid p-10">
          {["D", "L", "M", "M", "J", "V", "S"].map((d) => (
            <div className="">{d}</div>
          ))}
        </div>
        {calendar.map((week) => (
          <div>
            {week.map((day) => (
              <div
                className="day cursor-pointer"
                onClick={() => !beforeToday(day) && setValue(day)}
              >
                <div className={dayStyles(day)}>
                  {day.format("D").toString()}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
