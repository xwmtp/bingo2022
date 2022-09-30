import styled from "styled-components";
import React from "react";
import { Colors } from "../GlobalStyle";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import { Selector } from "./TabSelector";

interface Props {
  tabOptions: TabOption[];
  width?: string;
  fontSize?: string;
  className?: string;
}

interface TabOption {
  title: string;
  to: string;
}

export const RouteTabSelector: React.FC<Props> = ({ tabOptions, width, fontSize, className }) => {
  return (
    <Selector className={className} $width={width}>
      {tabOptions.map((option) => {
        return (
          <TabOptionNavLink key={option.title} to={option.to} $fontSize={fontSize}>
            {option.title}
          </TabOptionNavLink>
        );
      })}
    </Selector>
  );
};

const TabOptionNavLink: React.FC<{ to: string; $fontSize?: string }> = ({
  to,
  $fontSize,
  children,
}) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <NavLinkStyled to={to} $isActive={!!match} $fontSize={$fontSize}>
      {children}
    </NavLinkStyled>
  );
};

const NavLinkStyled = styled(NavLink)<{
  $isActive: boolean;
  $fontSize?: string;
}>`
  background-color: ${({ $isActive }) => ($isActive ? Colors.brightMossGreen : "none")};
  padding: 0.6rem;
  font-size: ${({ $fontSize }) => $fontSize ?? "1.3rem"};
  display: flex;
  justify-content: center;
  border-radius: 0.6rem;
  flex-grow: 1;
`;
