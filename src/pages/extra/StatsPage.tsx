import React, { useState } from "react";
import { useMatchResults } from "../../api/matchesApi";
import { Match, MatchResult } from "../../domain/Match";
import { EntrantWithResult } from "../../domain/Entrant";
import { ResultRow } from "../../components/pages/results/ResultBlock";
import { Container } from "../../components/Container";
import { Input } from "../../components/forms/Input";
import { useRacetimeLeaderboard } from "../../api/racetimeLeaderboardApi";
import { RacetimeLeaderboard, RacetimeLeaderboardEntry } from "../../domain/RacetimeLeaderboard";
import { Duration } from "luxon";
import styled from "styled-components";
import { useUser } from "../../api/userApi";
import { NothingToDisplay } from "../../components/general/NothingToDisplay";
import { isAdmin } from "../../domain/User";
import { RacetimeButton } from "../../components/forms/buttons/RacetimeButton";

export const StatsPage: React.FC = () => {
  const [round, setRound] = useState<string>("");

  const title = "Stats";
  const { data: user } = useUser();
  const { data: matchResults } = useMatchResults();
  const { data: racetimeLeaderboard } = useRacetimeLeaderboard();

  if (!user || !isAdmin(user)) {
    return (
      <Container title={title}>
        <NothingToDisplay>This page is admin only.</NothingToDisplay>
      </Container>
    );
  }

  if (!matchResults || !racetimeLeaderboard) {
    return <Container title={title} />;
  }

  const results = round
    ? matchResults.filter((matchResult) => matchResult.round === round)
    : matchResults;
  const { best, worst, bestDiff, worstDiff, closestMatch, average } = getStats(
    results,
    racetimeLeaderboard
  );

  return (
    <Container title={title}>
      <Input
        type="text"
        maxLength={30}
        value={round}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setRound(event.target.value)}
        placeholder={"Round x"}
      />

      {results.length > 0 && (
        <>
          <Header>Best result</Header>
          {best && <ResultRow entrant={best.entrant} />}
          <RtggButton match={best?.match} />

          <Header>Worst result</Header>
          {worst && <ResultRow entrant={worst.entrant} />}
          <RtggButton match={worst?.match} />

          <Header>Best diff</Header>
          {bestDiff && (
            <>
              <ResultRow entrant={bestDiff.diff.entrant} />
              {`Current bingo leaderboard time: ${Duration.fromMillis(
                bestDiff.diff.lbEntry.leaderboardTime * 1000
              ).toFormat("h:mm:ss")}`}
              <p>{`Finish time ${Math.abs(
                Math.round(bestDiff.diff.percentage * 1000) / 10
              )}% faster than lb time`}</p>
              <RtggButton match={bestDiff?.match} />
            </>
          )}

          <Header>Worst diff</Header>
          {worstDiff && (
            <>
              <ResultRow entrant={worstDiff.diff.entrant} />
              {`Current bingo leaderboard time: ${Duration.fromMillis(
                worstDiff.diff.lbEntry.leaderboardTime * 1000
              ).toFormat("h:mm:ss")}`}
              <p>{`Finish time ${
                Math.round(worstDiff.diff.percentage * 1000) / 10
              }% slower than lb time`}</p>
              <RtggButton match={worstDiff?.match} />
            </>
          )}

          <Header>Closest match diff</Header>
          {!!closestMatch && closestMatch.match.entrants.length >= 2 && (
            <>
              <ResultRow entrant={closestMatch.match.entrants[0]} />
              <ResultRow entrant={closestMatch.match.entrants[1]} />

              {`Difference: ${Duration.fromMillis(closestMatch.diff * 1000).toFormat("h:mm:ss")}`}
              <RtggButton match={closestMatch.match} />
            </>
          )}

          <Header>Average</Header>
          <>{Duration.fromMillis(average * 1000).toFormat("h:mm:ss")}</>
        </>
      )}
    </Container>
  );
};

const getStats = (results: MatchResult[], racetimeLeaderboard: RacetimeLeaderboard) => {
  type Diff = { entrant: EntrantWithResult; lbEntry: RacetimeLeaderboardEntry; percentage: number };
  let bestResult: { match: Match; entrant: EntrantWithResult } | undefined;
  let worstResult: { match: Match; entrant: EntrantWithResult } | undefined;
  let bestDiff: { match: Match; diff: Diff } | undefined;
  let worstDiff: { match: Match; diff: Diff } | undefined;
  let closestMatch: { match: MatchResult; diff: number } | undefined;

  const allTimes: number[] = [];

  for (const result of results) {
    const times = result.entrants
      .map((entrant) => entrant.result.finishTime)
      .filter((time): time is number => !!time);
    if (times.length === 2) {
      const matchDiff = Math.abs(times[0] - times[1]);
      if (!closestMatch || matchDiff < closestMatch.diff) {
        closestMatch = { match: result, diff: matchDiff };
      }
    }

    for (const entrant of result.entrants) {
      if (!entrant.result.hasForfeited) {
        allTimes.push(entrant.result.finishTime!!);
      }
      if (!entrant.result.finishTime) {
        continue;
      }

      if (!bestResult || entrant.result.finishTime! < bestResult.entrant.result.finishTime!) {
        bestResult = { match: result, entrant: entrant };
      }
      if (!worstResult || entrant.result.finishTime! > worstResult.entrant.result.finishTime!) {
        worstResult = { match: result, entrant: entrant };
      }

      const matchingLbEntry = racetimeLeaderboard[entrant.user.id];
      const percentage =
        (entrant.result.finishTime - matchingLbEntry.leaderboardTime) /
        matchingLbEntry.leaderboardTime;

      if (!bestDiff || percentage < bestDiff.diff.percentage) {
        bestDiff = {
          match: result,
          diff: { entrant: entrant, lbEntry: matchingLbEntry, percentage: percentage },
        };
      }
      if (!worstDiff || percentage > worstDiff.diff.percentage) {
        worstDiff = {
          match: result,
          diff: { entrant: entrant, lbEntry: matchingLbEntry, percentage: percentage },
        };
      }
    }
  }
  let total = 0;
  for (const time of allTimes) {
    total += time;
  }
  const average = total / allTimes.length;
  return {
    best: bestResult,
    worst: worstResult,
    bestDiff: bestDiff,
    worstDiff: worstDiff,
    closestMatch: closestMatch,
    average: average,
  };
};

const RtggButton: React.FC<{ match?: Match }> = ({ match }) => {
  return match ? <RacetimeButtonStyled url={`https://racetime.gg/${match.racetimeId}`} /> : <></>;
};

const Header = styled.h3`
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
`;

const RacetimeButtonStyled = styled(RacetimeButton)`
  max-width: 2rem;
`;
