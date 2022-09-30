import styled from "styled-components";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import React from "react";

export const Nav: React.FC = () => {
  return (
    <Navigation>
      <Link to="/">Leaderboard</Link>
      {/*<Link to="/schedule">Schedule</Link>*/}
      <Link to="/results">Results</Link>
      <Link to="/about">About</Link>
    </Navigation>
  );
};

const Link: React.FC<{ to: string; $fontSize?: string }> = ({ to, children }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <LinkStyled to={to} $isActive={!!match}>
      <h4> {children}</h4>
    </LinkStyled>
  );
};

const Navigation = styled.nav`
  display: flex;
  flex-direction: row;
`;

const LinkStyled = styled(NavLink)<{ $isActive: boolean }>`
  padding: 0.6rem;
  text-decoration: ${({ $isActive }) => ($isActive ? "underline" : "none")};
`;
