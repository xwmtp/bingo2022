import React from "react";
import { Container } from "../../components/Container";
import styled from "styled-components";
import { ScheduledMatches } from "../../components/pages/schedule/ScheduledMatches";
import { UnscheduledMatches } from "../../components/pages/profile/myMatches/UnscheduledMatches";
import { isFinished, isNotFinished } from "../../domain/Match";
import { useUser } from "../../api/userApi";
import { MatchResults } from "../../components/pages/results/MatchResults";
import { UnrecordedMatches } from "../../components/pages/profile/myMatches/UnrecordedMatches";
import { useMatchResults, useScheduledMatches, useUnscheduledMatches } from "../../api/matchesApi";
import { NothingToDisplay } from "../../components/general/NothingToDisplay";

export const MyMatchesPage: React.FC = () => {
  const { data: user } = useUser();

  const { data: myScheduledMatches } = useScheduledMatches(user?.id);
  const { data: myUnscheduledMatches } = useUnscheduledMatches(user?.id);
  const { data: myMatchResults } = useMatchResults(user?.id);

  // matches that have been scheduled but not finished
  const myUnfinishedMatches = myScheduledMatches?.filter(isNotFinished);
  // matches that have been scheduled, finished (according to the scheduled time) but not recorded yet
  const myUnrecordedMatches = myScheduledMatches?.filter(isFinished);

  const hasUnscheduledMatches = myUnscheduledMatches && myUnscheduledMatches.length > 0;
  const hasUnfinished = myUnfinishedMatches && myUnfinishedMatches.length > 0;
  const hasUnrecordedMatches = myUnrecordedMatches && myUnrecordedMatches.length > 0;
  const hasResults = myMatchResults && myMatchResults.length > 0;
  const noMatchesToDisplay =
    !hasUnscheduledMatches && !hasUnfinished && !hasUnrecordedMatches && !hasResults;

  if (!user) {
    return <></>;
  }

  if (noMatchesToDisplay) {
    return (
      <Container size="small">
        <NothingToDisplay>No matches to display (yet)</NothingToDisplay>
      </Container>
    );
  }

  return (
    <ProfilePageDiv>
      {hasUnrecordedMatches && (
        <Container title={"Unrecorded"} size="small">
          <UnrecordedMatches scheduledMatches={myUnrecordedMatches} />
        </Container>
      )}
      {hasUnscheduledMatches && (
        <Container title={"Unscheduled"} size="small">
          <UnscheduledMatches unscheduledMatches={myUnscheduledMatches} />
        </Container>
      )}
      {hasUnfinished && (
        <Container title={"Scheduled"} size="small">
          <ScheduledMatches matches={myUnfinishedMatches} />
        </Container>
      )}
      {hasResults && (
        <Container title={"Results"} size="small">
          <MatchResults results={myMatchResults} />
        </Container>
      )}
    </ProfilePageDiv>
  );
};

const ProfilePageDiv = styled.div`
  width: 100%;
  flex-direction: column;
`;
