import React from "react";
import styled from "styled-components";
import { BiCalendar } from "react-icons/bi";
import { IconButton } from "../IconButton";

interface Props {
  text?: string;
  onClick?: () => void;
  className?: string;
}

export const ScheduleButton: React.FC<Props> = ({ text, onClick, className }) => {
  return (
    <ScheduleButtonStyled
      label="Schedule"
      text={text ?? "Pick time"}
      Icon={CalendarIcon}
      onClick={onClick}
      color={"coral"}
      className={className}
    />
  );
};

const ScheduleButtonStyled = styled(IconButton)`
  flex-grow: 0;
`;

const CalendarIcon = styled(BiCalendar)`
  transform: scale(1.2);
`;
