import React from "react";
import { MatchResult, sortByScheduledTime } from "../../../domain/Match";
import { ResultBlock } from "./ResultBlock";
import { NothingToDisplay } from "../../general/NothingToDisplay";

interface Props {
  results: MatchResult[];
  highlightUserResult?: boolean;
}

export const MatchResults: React.FC<Props> = ({ results, highlightUserResult }) => {
  if (results.length === 0) {
    return <NothingToDisplay>No recorded results yet.</NothingToDisplay>;
  }

  const sortedResults = sortByScheduledTime(results, true);

  return (
    <>
      {sortedResults.map((result) => {
        return <ResultBlock key={result.id} result={result} highlightUser={highlightUserResult} />;
      })}
    </>
  );
};
