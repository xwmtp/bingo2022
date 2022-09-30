import React from "react";
import { ScheduledMatch, sortByScheduledTime } from "../../../domain/Match";
import { DateTime } from "luxon";
import { MatchesByDate } from "../../MatchesByDate";
import { NothingToDisplay } from "../../general/NothingToDisplay";
import styled from "styled-components";
import { Colors } from "../../../GlobalStyle";

interface Props {
  matches: ScheduledMatch[];
  displayStatusOnMatchBlocks?: boolean;
}

export const ScheduledMatches: React.FC<Props> = ({ matches, displayStatusOnMatchBlocks }) => {
  const relevantMatches = matches.filter(
    (match) => match.scheduledTime > DateTime.local().startOf("day")
  );
  const sortedRelevantMatches = sortByScheduledTime(relevantMatches);

  if (sortedRelevantMatches.length === 0) {
    return <NothingToDisplay>There are no current scheduled matches.</NothingToDisplay>;
  }

  return (
    <>
      <Timezone>{`All times are displayed in your local timezone (${DateTime.local().toFormat(
        "ZZZZ"
      )})`}</Timezone>
      <MatchesByDate
        scheduledMatches={sortedRelevantMatches}
        displayStatusOnMatchBlock={displayStatusOnMatchBlocks}
      />
    </>
  );
};

const Timezone = styled.p`
  font-size: 90%;
  margin-bottom: 0.7rem;
  color: ${Colors.brighterMossGreen};
`;
