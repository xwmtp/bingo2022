import React from "react";
import { Container } from "../../components/Container";
import styled from "styled-components";
import { AllEntrants } from "../../components/pages/profile/admin/AllEntrants";
import { UnscheduledMatches } from "../../components/pages/profile/myMatches/UnscheduledMatches";
import { AddMatches } from "../../components/pages/profile/admin/addMatches/AddMatches";
import { UnrecordedMatches } from "../../components/pages/profile/myMatches/UnrecordedMatches";
import { useScheduledMatches, useUnscheduledMatches } from "../../api/matchesApi";
import { useUser } from "../../api/userApi";
import { isAdmin } from "../../domain/User";
import { EditRoles } from "../../components/pages/profile/admin/editRoles/EditRoles";
import { Button } from "../../components/forms/Button";
import { Link } from "react-router-dom";
import { FlexDiv } from "../../components/divs/FlexDiv";

export const AdminPage: React.FC = () => {
  const { data: user } = useUser();
  const { data: allScheduledMatches } = useScheduledMatches();
  const { data: allUnscheduledMatches } = useUnscheduledMatches();

  if (!user) {
    return <></>;
  }

  if (!isAdmin(user)) {
    return (
      <AdminPageDiv>
        <Container>
          <p>This page is admin only</p>
        </Container>
      </AdminPageDiv>
    );
  }

  return (
    <AdminPageDiv>
      <Container title={"All entrants"} size="small">
        <AllEntrants />
      </Container>
      <Container title={"Add new matches"} size="small">
        <AddMatches />
      </Container>
      <Container title={"Edit roles"} size="small">
        <EditRoles />
      </Container>
      <Container title={"Tools"} size="small">
        <LinkButtons>
          <Link to="/pairing">
            <LinkButton size="big" color="brightMossGreen">
              Pairings
            </LinkButton>
          </Link>
          <Link to="/stats">
            <LinkButton size="big" color="brightMossGreen">
              Stats
            </LinkButton>
          </Link>
        </LinkButtons>
      </Container>
      <Container title={"All unrecorded matches"} size="small">
        {allScheduledMatches && <UnrecordedMatches scheduledMatches={allScheduledMatches} />}
      </Container>
      <Container title={"All unscheduled matches"} size="small">
        {allUnscheduledMatches && <UnscheduledMatches unscheduledMatches={allUnscheduledMatches} />}
      </Container>
    </AdminPageDiv>
  );
};

const AdminPageDiv = styled.div`
  width: 100%;
  flex-direction: column;
`;

const LinkButtons = styled(FlexDiv)`
  justify-content: flex-start;
`;

const LinkButton = styled(Button)`
  width: 8rem;
  margin-right: 1rem;
`;
