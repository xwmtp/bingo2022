import React from "react";
import styled from "styled-components";
import { BiSave } from "react-icons/bi";
import { IconButton } from "../IconButton";

interface Props {
  text?: string;
  onClick?: () => void;
  className?: string;
}

export const RecordButton: React.FC<Props> = ({ text, onClick, className }) => {
  return (
    <RecordButtonStyled
      label="Record"
      color={"brightMossGreen"}
      text={text}
      Icon={SaveIcon}
      onClick={onClick}
      className={className}
    />
  );
};

const RecordButtonStyled = styled(IconButton)`
  padding: 0.3rem 0.4rem;
`;

const SaveIcon = styled(BiSave)`
  transform: scale(1.3);
`;
