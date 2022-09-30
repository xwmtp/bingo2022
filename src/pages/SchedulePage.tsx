import { Container } from "../components/Container";
import React from "react";
import { useScheduledMatches } from "../api/matchesApi";
import { NothingToDisplay } from "../components/general/NothingToDisplay";
import { ScheduledMatches } from "../components/pages/schedule/ScheduledMatches";

export const SchedulePage: React.FC = () => {
  const { data: scheduledMatches, isError } = useScheduledMatches();

  const title = "Schedule";

  if (isError) {
    return (
      <Container title={title}>
        <NothingToDisplay>An error occurred while loading the data.</NothingToDisplay>
      </Container>
    );
  }

  if (!scheduledMatches) {
    return <Container title={title} />;
  }

  return (
    <Container title={title}>
      <ScheduledMatches matches={scheduledMatches} displayStatusOnMatchBlocks={true} />
    </Container>
  );
};
