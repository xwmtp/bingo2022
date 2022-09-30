import { MatchBlock } from "../../schedule/MatchBlock";
import React from "react";
import { UnscheduledMatch } from "../../../../domain/Match";

interface Props {
  unscheduledMatches: UnscheduledMatch[];
}

export const UnscheduledMatches: React.FC<Props> = ({ unscheduledMatches }) => {
  return (
    <>
      {unscheduledMatches.map((match) => {
        return <MatchBlock key={match.id} match={match} />;
      })}
    </>
  );
};
