import { Nav } from "./Nav";
import styled from "styled-components";
import { Colors } from "../../GlobalStyle";
import { LoggedInUserDisplay } from "./LoggedInUserDisplay";
import { FlexDiv } from "../divs/FlexDiv";
import { LoginButton } from "./LoginButton";
import React from "react";
import { useUser } from "../../api/userApi";
import { Logo } from "./Logo";

export const Header: React.FC = () => {
  return (
    <HeaderStyled>
      <HeaderContent>
        <FlexDiv>
          <LogoStyled />
          <Nav />
        </FlexDiv>
        <LoginOrUser />
      </HeaderContent>
    </HeaderStyled>
  );
};

const LoginOrUser: React.FC = () => {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return <></>;
  }
  if (user) {
    return <LoggedInUserDisplay user={user} />;
  }
  return <LoginButton />;
};

const HeaderStyled = styled(FlexDiv)`
  flex-shrink: 0;
  background-color: ${Colors.mossGreen};
  padding: 0 0.6rem;
  height: 4.3rem;
`;

const HeaderContent = styled(FlexDiv)`
  width: 1200px;
  justify-content: space-between;
  padding: 0 1rem;
`;

const LogoStyled = styled(Logo)`
  margin-right: 2rem;
`;
