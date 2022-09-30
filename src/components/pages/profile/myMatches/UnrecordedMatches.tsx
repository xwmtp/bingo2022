import React from "react";
import { isFinished, ScheduledMatch, sortByScheduledTime } from "../../../../domain/Match";
import { MatchesByDate } from "../../../MatchesByDate";

interface Props {
  scheduledMatches: ScheduledMatch[];
}

export const UnrecordedMatches: React.FC<Props> = ({ scheduledMatches }) => {
  const recordableMatches = scheduledMatches.filter(isFinished);
  const sortedRecordableMatches = sortByScheduledTime(recordableMatches, true);

  return <MatchesByDate scheduledMatches={sortedRecordableMatches} />;
};
