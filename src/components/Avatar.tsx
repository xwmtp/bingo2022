import React from "react";
import styled from "styled-components";
import { User } from "../domain/User";

interface Props {
  user: User;
  sizeRem?: number;
  className?: string;
}

export const Avatar: React.FC<Props> = ({ user, className, sizeRem }) => {
  return (
    <AvatarStyled
      title={user.name}
      alt={`${user.name}'s avatar`}
      src={user.avatar}
      className={className}
      $size={sizeRem || 1.6}
    />
  );
};

const AvatarStyled = styled.img<{ $size: number }>`
  --size: ${({ $size }) => $size}rem;
  width: var(--size);
  height: var(--size);
  object-fit: cover;
  border-radius: 10rem;
  flex-shrink: 0;
`;
