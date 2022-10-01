import React, { useMemo } from "react";
import { Container } from "../../Container";
import { UserDisplay } from "../../UserDisplay";
import { WideScreenOnly } from "../../divs/WideScreenOnly";
import { secondsToHms } from "../../../lib/timeHelpers";
import styled from "styled-components";
import { Block } from "../../Block";
import { Colors } from "../../../GlobalStyle";
import { FlexDiv } from "../../divs/FlexDiv";
import { useRacetimeLeaderboard } from "../../../api/racetimeLeaderboardApi";
import { sortLeaderboardEntries, toLeaderboardEntries } from "../../../domain/Leaderboard";
import { NothingToDisplay } from "../../general/NothingToDisplay";
import { MatchResult } from "../../../domain/Match";
import { User } from "../../../domain/User";

interface Props {
  allEntrants: User[];
  allResults: MatchResult[];
}

export const Leaderboard: React.FC<Props> = ({ allEntrants, allResults }) => {
  const { data: racetimeLeaderboard } = useRacetimeLeaderboard();

  const title = "Phase 1 - Leaderboard";

  const sortedEntries = useMemo(() => {
    if (allEntrants && allResults) {
      const entries = toLeaderboardEntries(allEntrants, allResults, racetimeLeaderboard);
      return sortLeaderboardEntries(entries);
    }
    return [];
  }, [allEntrants, allResults, racetimeLeaderboard]);

  if (sortedEntries.length === 0) {
    return (
      <Container title={title}>
        <NothingToDisplay>
          <p>No entrants to display (yet).</p>
        </NothingToDisplay>
      </Container>
    );
  }

  return (
    <Container title={title}>
      <LeaderboardHeader>
        <HiddenRankAndUser>
          <Rank>0</Rank>
          <UserDisplay size="big" user={sortedEntries[0].user} />
        </HiddenRankAndUser>

        <Number>Points</Number>
        <WideScreenOnly>
          <Time>Median</Time>
        </WideScreenOnly>
        <Number>Rounds</Number>
        <WideScreenOnly>
          <Number>Dnf</Number>
        </WideScreenOnly>
      </LeaderboardHeader>

      {sortedEntries.map((entry, index) => {
        return (
          <LeaderboardEntryBlock
            key={index}
            $displayAsLoggedInUser={index <= 12 || (!!entry.median && entry.median <= 4606)}
          >
            <RankAndUser>
              <Rank>{index + 1}</Rank>
              <UserDisplay size="big" user={entry.user} />
            </RankAndUser>

            <Number>{entry.points}</Number>

            <WideScreenOnly>
              <Time>{entry.median ? secondsToHms(entry.median) : "--:--:--"}</Time>
            </WideScreenOnly>

            <Number>{entry.roundsPlayed}</Number>

            <WideScreenOnly>
              <Number>{entry.forfeits}</Number>
            </WideScreenOnly>
          </LeaderboardEntryBlock>
        );
      })}
    </Container>
  );
};

const LeaderboardHeader = styled(Block)`
  justify-content: space-between;
  background-color: transparent;
  margin-top: 0;
  font-weight: bold;
  font-size: 1rem;
  padding-top: 0.35rem;
  padding-bottom: 0.35rem;
`;

const LeaderboardEntryBlock = styled(Block)<{
  $displayAsLoggedInUser: boolean;
}>`
  justify-content: space-between;
  background-color: ${({ $displayAsLoggedInUser }) =>
          $displayAsLoggedInUser ? Colors.brightGrey : Colors.lightGrey};
  font-size: 1.1rem;
  margin-top: 0.5rem;
  padding-top: 0.35rem;
  padding-bottom: 0.35rem;
`;

const RankAndUser = styled(FlexDiv)`
  justify-content: flex-start;
`;

const HiddenRankAndUser = styled(RankAndUser)`
  visibility: hidden;
`;

const Number = styled.p`
  text-align: center;
  min-width: 6rem;
`;

const Time = styled.p`
  text-align: center;
  min-width: 6rem;
`;

const Rank = styled.p`
  text-align: center;
  min-width: 2rem;
  margin-right: 1.5rem;
`;
