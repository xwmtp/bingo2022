import React from "react";
import { Container } from "../../../../Container";
import { secondsToHms } from "../../../../../lib/timeHelpers";
import { RacetimeLeaderboardEntry } from "../../../../../domain/RacetimeLeaderboard";
import styled from "styled-components";
import { FlexDiv } from "../../../../divs/FlexDiv";
import { DateTime } from "luxon";
import { ExternalLink } from "../../../../general/ExternalLink";
import { BiLinkExternal } from "react-icons/bi";
import { StatRow } from "./StatRow";

interface Props {
  racetimeStats: RacetimeLeaderboardEntry;
  containerWidth?: string;
  className?: string;
}

export const RacetimeStats: React.FC<Props> = ({ racetimeStats, containerWidth, className }) => {
  return (
    <Container
      size="small"
      title="Racetime Bingo Stats"
      width={containerWidth}
      className={className}
    >
      <Stats>
        <StatRow name={"Rank"} stat={`# ${racetimeStats.rank}`} />
        <StatRow name={"Leaderboard time"} stat={secondsToHms(racetimeStats.leaderboardTime)} />
        <StatRow name={"Effective median 15"} stat={secondsToHms(racetimeStats.effectiveMedian)} />
        <StatRow
          name={"Last bingo"}
          stat={racetimeStats.lastRaceDate.toLocaleString(DateTime.DATE_MED)}
        />
        <BingoLbLink url={"https://xwmtp.github.io/bingo-leaderboard"}>
          Racetime Bingo Leaderboard <ExternalIcon />
        </BingoLbLink>
      </Stats>
    </Container>
  );
};

const Stats = styled(FlexDiv)`
  flex-direction: column;
  align-items: flex-start;
`;

const BingoLbLink = styled(ExternalLink)`
  margin-top: 0.5rem;
`;

const ExternalIcon = styled(BiLinkExternal)`
  padding-top: 0.25rem;
  transform: scale(1.4);
`;
