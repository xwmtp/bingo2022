import React from "react";
import styled from "styled-components";
import { BiTrash } from "react-icons/bi";
import { IconButton } from "../IconButton";

interface Props {
  text?: string;
  onClick?: () => void;
  className?: string;
}

export const DeleteButton: React.FC<Props> = ({ text, onClick, className }) => {
  return (
    <DeleteButtonStyled
      label="Delete"
      color={"coral"}
      text={text}
      Icon={TrashIcon}
      onClick={onClick}
      className={className}
    />
  );
};

const DeleteButtonStyled = styled(IconButton)`
  flex-grow: 0;
`;

const TrashIcon = styled(BiTrash)`
  transform: scale(1.3);
`;
