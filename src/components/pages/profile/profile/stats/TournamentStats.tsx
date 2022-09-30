import React from "react";
import { Container } from "../../../../Container";
import styled from "styled-components";
import { FlexDiv } from "../../../../divs/FlexDiv";
import { LeaderboardEntry } from "../../../../../domain/Leaderboard";
import { secondsToHms } from "../../../../../lib/timeHelpers";
import { StatRow } from "./StatRow";

interface Props {
  leaderboardEntry: LeaderboardEntry;
  className?: string;
  containerWidth?: string;
}

export const TournamentStats: React.FC<Props> = ({
  leaderboardEntry,
  containerWidth,
  className,
}) => {
  return (
    <Container size="small" title="Tournament Stats" width={containerWidth} className={className}>
      <Stats>
        <StatRow name={"Points"} stat={leaderboardEntry.points} />
        <StatRow name={"Matches played"} stat={leaderboardEntry.roundsPlayed} />
        {leaderboardEntry.median && (
          <StatRow name={"Median"} stat={secondsToHms(leaderboardEntry.median)} />
        )}
        <StatRow name={"Wins"} stat={leaderboardEntry.wins} />
        <StatRow name={"Ties"} stat={leaderboardEntry.ties} />
        <StatRow name={"Losses"} stat={leaderboardEntry.losses} />
        <StatRow name={"Dnf"} stat={leaderboardEntry.forfeits} />
      </Stats>
    </Container>
  );
};

const Stats = styled(FlexDiv)`
  flex-direction: column;
  align-items: flex-start;
`;
