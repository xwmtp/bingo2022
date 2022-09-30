import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { RouteTabSelector } from "../../components/RouteTabSelector";
import { Margins } from "../../GlobalStyle";
import { useUser } from "../../api/userApi";
import { isAdmin } from "../../domain/User";
import { Container } from "../../components/Container";
import { NothingToDisplay } from "../../components/general/NothingToDisplay";

export const ProfilePage: React.FC = () => {
  const { data: user } = useUser();

  if (!user) {
    return (
      <Container size="small">
        <NothingToDisplay>You must be logged in to view this page.</NothingToDisplay>
      </Container>
    );
  }

  const options = [
    { title: "Profile", to: "/profile/settings" },
    { title: "My Matches", to: "/profile/matches" },
  ];

  if (user && isAdmin(user)) {
    options.push({ title: "Admin", to: "/profile/admin" });
  }

  return (
    <>
      <TabSelectorStyled tabOptions={options} />
      <Outlet />
    </>
  );
};

const TabSelectorStyled = styled(RouteTabSelector)`
  margin-bottom: ${Margins.container}rem;
`;
