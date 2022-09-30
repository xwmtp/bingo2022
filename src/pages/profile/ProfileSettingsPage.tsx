import React, { useMemo } from "react";
import styled from "styled-components";
import { SignUp } from "../../components/pages/profile/profile/SignUp";
import { UserProfile } from "../../components/pages/profile/profile/UserProfile";
import { useUser } from "../../api/userApi";
import { isEntrant } from "../../domain/User";
import { Container } from "../../components/Container";
import { useRacetimeLeaderboard } from "../../api/racetimeLeaderboardApi";
import { RacetimeStats } from "../../components/pages/profile/profile/stats/RacetimeStats";
import { TournamentStats } from "../../components/pages/profile/profile/stats/TournamentStats";
import { FlexDiv } from "../../components/divs/FlexDiv";
import { Margins } from "../../GlobalStyle";
import { useMatchResults } from "../../api/matchesApi";
import { toLeaderboardEntry } from "../../domain/Leaderboard";
import { tournamentSettings } from "../../Settings";

export const ProfileSettingsPage: React.FC = () => {
  const { data: user } = useUser();
  const { data: matchResults } = useMatchResults();
  const { data: racetimeLeaderboard } = useRacetimeLeaderboard();

  const leaderboardEntry = useMemo(() => {
    if (user && matchResults) {
      return toLeaderboardEntry(user, matchResults, racetimeLeaderboard);
    }
    return undefined;
  }, [user, matchResults, racetimeLeaderboard]);
  const racetimeStats = racetimeLeaderboard && user ? racetimeLeaderboard[user.id] : undefined;

  if (!user) {
    return (
      <ProfileSettingsPageDiv>
        <Container>
          <p>Log in to visit the profile page</p>
        </Container>
      </ProfileSettingsPageDiv>
    );
  }

  return (
    <ProfileSettingsPageDiv>
      {<UserProfile user={user} />}
      {!isEntrant(user) && tournamentSettings.CAN_SIGNUP && <SignUp />}

      <Stats>
        {isEntrant(user) && !!leaderboardEntry && (
          <TournamentStatsStyled
            leaderboardEntry={leaderboardEntry}
            containerWidth={racetimeStats ? "49%" : "100%"}
            $withMargin={!!racetimeStats}
          />
        )}
        {racetimeStats && (
          <RacetimeStatsStyled
            racetimeStats={racetimeStats}
            containerWidth={isEntrant(user) && !!leaderboardEntry ? "49%" : "100%"}
          />
        )}
      </Stats>
    </ProfileSettingsPageDiv>
  );
};

const ProfileSettingsPageDiv = styled.div`
  width: 100%;
  flex-direction: column;
`;

const TournamentStatsStyled = styled(TournamentStats)<{ $withMargin: boolean }>`
  margin-right: ${({ $withMargin }) => ($withMargin ? Margins.container : 0)}rem;
`;

const RacetimeStatsStyled = styled(RacetimeStats)``;

const Stats = styled(FlexDiv)`
  align-items: flex-start;
  justify-content: flex-start;
`;
