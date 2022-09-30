import React from "react";
import styled from "styled-components";
import { BiPencil } from "react-icons/bi";
import { IconButton } from "../IconButton";

interface Props {
  text?: string;
  onClick?: () => void;
  className?: string;
}

export const EditButton: React.FC<Props> = ({ text, onClick, className }) => {
  return (
    <EditButtonStyled
      label="Edit"
      color={"coral"}
      text={text}
      Icon={PencilIcon}
      onClick={onClick}
      className={className}
    />
  );
};

const EditButtonStyled = styled(IconButton)`
  padding: 0.3rem 0.4rem;
`;

const PencilIcon = styled(BiPencil)`
  transform: scale(1.3);
`;
