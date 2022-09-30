import { Input } from "./Input";
import React from "react";
import { DateTime } from "luxon";
import styled from "styled-components";
import { FlexDiv } from "../divs/FlexDiv";

interface Props {
  dateTime: DateTime;
  setDateTime: (dateTime: DateTime) => void;
}

export const DateTimeInput: React.FC<Props> = ({ dateTime, setDateTime }) => {
  return (
    <InputsStyled>
      <Input
        type="date"
        className="form-control"
        value={dateTime.toISODate()}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const parsedDate = DateTime.fromISO(event.target.value);
          if (!parsedDate.isValid) {
            return;
          }
          setDateTime(mergeDateAndTime(parsedDate, dateTime));
        }}
      />
      <Input
        type="time"
        className="form-control"
        value={dateTime.toFormat("HH:mm")}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const parsedTime = DateTime.fromISO(event.target.value);
          if (!parsedTime.isValid) {
            return;
          }
          setDateTime(mergeDateAndTime(dateTime, parsedTime));
        }}
      />
    </InputsStyled>
  );
};

const mergeDateAndTime = (date: DateTime, time: DateTime): DateTime => {
  const iso = date.toFormat("yyyy-MM-dd") + "T" + time.toFormat("HH:mm");
  return DateTime.fromISO(iso);
};

const InputsStyled = styled(FlexDiv)`
  margin: 1.8rem 0;
`;
