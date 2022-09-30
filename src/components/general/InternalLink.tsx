import React from "react";
import styled from "styled-components";
import { ColorName, Colors } from "../../GlobalStyle";
import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  children: React.ReactNode;
  newWindow?: boolean;
  color?: ColorName;
}

export const InternalLink: React.FC<Props> = ({ to, color, newWindow, children }) => {
  return (
    <Link
      $color={color}
      to={to}
      target={newWindow ? "_blank" : undefined}
      rel={newWindow ? "noopener noreferrer" : undefined}
    >
      {children}
    </Link>
  );
};

const Link = styled(NavLink)<{ $color?: ColorName }>`
  font-weight: bold;
  color: ${({ $color }) => ($color ? Colors[$color] : Colors.brighterMossGreen)};
`;
