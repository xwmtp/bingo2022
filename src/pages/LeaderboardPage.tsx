import React from "react";
import { Leaderboard } from "../components/pages/leaderboard/Leaderboard";
import { Container } from "../components/Container";
import { Spinner } from "../components/general/Spinner";
import { useAllEntrants } from "../api/entrantsApi";
import { useMatchResults } from "../api/matchesApi";
import { NothingToDisplay } from "../components/general/NothingToDisplay";
import { Bracket } from "../components/pages/leaderboard/Bracket";
import { getWinner, parseToBracketRounds } from "../domain/BracketSetup";
import { bracketSetup, leaderboardSettings, websiteSettings } from "../Settings";
import { mockBracketSetup } from "../domain/mocks/MockData";
import { Winner } from "../components/pages/leaderboard/Winner";

export const LeaderboardPage: React.FC = () => {
  const { data: allEntrants, isLoading: isLoadingEntrants } = useAllEntrants();
  const { data: matchResults, isLoading: isLoadingMatches } = useMatchResults();
  const bracketSetupData = websiteSettings.USE_MOCK_DATA ? mockBracketSetup : bracketSetup;

  const pageTitle = "Leaderboard";

  if (isLoadingEntrants || isLoadingMatches) {
    return (
      <Container title={pageTitle}>
        <Spinner />
      </Container>
    );
  }

  if (!allEntrants || !matchResults) {
    return (
      <Container title={pageTitle}>
        <NothingToDisplay>An error occurred while loading the data.</NothingToDisplay>
      </Container>
    );
  }

  const relevantMatchResults = matchResults.filter((result) =>
    leaderboardSettings.RELEVANT_ROUNDS.some(
      (relevantRound) => result.round?.toLocaleLowerCase() === relevantRound.toLowerCase()
    )
  );
  const bracketRounds = parseToBracketRounds(bracketSetupData, allEntrants, matchResults);

  const lastRound = bracketRounds[bracketRounds.length - 1];
  const lastMatchUp = lastRound?.matchUps[lastRound.matchUps.length - 1];
  const winner = !!lastMatchUp ? getWinner(lastMatchUp) : undefined;

  return (
    <>
      {winner && <Winner winner={winner} />}
      {bracketRounds.length > 0 && <Bracket bracketRounds={bracketRounds} />}
      <Leaderboard allEntrants={allEntrants} allResults={relevantMatchResults} />
    </>
  );
};
