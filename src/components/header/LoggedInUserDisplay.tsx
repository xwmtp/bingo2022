import React from "react";
import { FlexDiv } from "../divs/FlexDiv";
import { NavLink } from "react-router-dom";
import { User } from "../../domain/User";
import styled from "styled-components";
import { UserDisplay } from "../UserDisplay";

interface Props {
  user: User;
}

export const LoggedInUserDisplay: React.FC<Props> = ({ user }) => {
  return (
    <NavLinkStyled to="/profile/settings">
      <FlexDiv>
        <UserStyled user={user} size="big" wideScreenOnlyName={true} removeNamePadding={true} />
      </FlexDiv>
    </NavLinkStyled>
  );
};

const NavLinkStyled = styled(NavLink)`
  padding: 0.6rem;
`;

const UserStyled = styled(UserDisplay)`
  min-width: 1rem;
`;
