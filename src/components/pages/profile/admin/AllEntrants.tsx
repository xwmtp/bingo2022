import React, { useMemo } from "react";
import { UserDisplay } from "../../../UserDisplay";
import styled from "styled-components";
import { useAllEntrants } from "../../../../api/entrantsApi";
import { Spinner } from "../../../general/Spinner";
import { Button } from "../../../forms/Button";
import { useMatchResults } from "../../../../api/matchesApi";
import { useRacetimeLeaderboard } from "../../../../api/racetimeLeaderboardApi";
import { toLeaderboardEntries, toPairingEntries } from "../../../../domain/Leaderboard";
import { DateTime } from "luxon";
import { ExternalLink } from "../../../general/ExternalLink";
import { FlexDiv } from "../../../divs/FlexDiv";

export const AllEntrants: React.FC = () => {
  const { data: allEntrants, isLoading, isError, isIdle } = useAllEntrants();
  const { data: matchResults } = useMatchResults();
  const { data: racetimeLeaderboard } = useRacetimeLeaderboard();

  const pairingEntries = useMemo(() => {
    if (allEntrants && matchResults) {
      const entries = toLeaderboardEntries(allEntrants, matchResults, racetimeLeaderboard);
      return toPairingEntries(entries);
    }
    return [];
  }, [allEntrants, matchResults, racetimeLeaderboard]);

  if (isLoading || isIdle) {
    return <Spinner size="small" />;
  }
  if (isError) {
    return <p>Could not load entrants</p>;
  }

  const namesCsv = allEntrants.map((entrant) => `${entrant.name}; ${entrant.id}`).join("\n");

  const sortedEntrants = allEntrants.sort((a, b) => a.name.localeCompare(b.name));

  const downloadText = (text: string, fileName: string) => {
    const element = document.createElement("a");
    const file = new Blob([text], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <AllEntrantsDiv>
      <p>Total entrants: {sortedEntrants.length}</p>
      <EntrantsList>
        {sortedEntrants.map((entrant) => (
          <RacetimeLink key={entrant.id} url={`https://racetime.gg/user/${entrant.id}`}>
            <UserDisplayStyled user={entrant} />
          </RacetimeLink>
        ))}
      </EntrantsList>

      <DownloadButtons>
        <DownloadButton
          disabled={pairingEntries.length === 0}
          color="brightMossGreen"
          onClick={() =>
            pairingEntries.length > 0 &&
            downloadText(
              JSON.stringify(pairingEntries, null, 1),
              `entrants_${DateTime.local(DateTime.DATETIME_SHORT)}.json`
            )
          }
        >
          Download pairing json
        </DownloadButton>

        <DownloadButton
          disabled={pairingEntries.length === 0}
          color="brightMossGreen"
          onClick={() =>
            pairingEntries.length > 0 &&
            downloadText(namesCsv, `entrants_${DateTime.local(DateTime.DATETIME_SHORT)}.csv`)
          }
        >
          Download names csv
        </DownloadButton>
      </DownloadButtons>
    </AllEntrantsDiv>
  );
};

const AllEntrantsDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const EntrantsList = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const UserDisplayStyled = styled(UserDisplay)`
  margin-top: 0.7rem;
`;

const DownloadButtons = styled(FlexDiv)`
  margin-top: 0.7rem;
  justify-content: flex-start;
`;

const DownloadButton = styled(Button)`
  margin-top: 0.7rem;
  flex-grow: 0;
  margin-right: 0.6rem;
`;

const RacetimeLink = styled(ExternalLink)`
  font-weight: normal;
  color: white;
`;
