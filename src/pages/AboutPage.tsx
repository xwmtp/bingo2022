import { Container } from "../components/Container";
import React from "react";
import styled from "styled-components";
import { Margins } from "../GlobalStyle";
import { PreviousYears } from "../components/pages/about/PreviousYears";
import { ExternalLink } from "../components/general/ExternalLink";
import { tournamentSettings } from "../Settings";
import { InternalLink } from "../components/general/InternalLink";
import { BiCalendar, BiSave } from "react-icons/bi";

export const AboutPage: React.FC = () => {
  return (
    <AboutPageDiv>
      <Container title={"Bingo Tournament 2022"} width={"70%"}>
        <AboutContent>
          <p> Welcome to the 2022 Ocarina of Time Bingo Tournament!</p>
          <br />

          <h3>General info</h3>
          <List>
            <ListItem>
              The tournament will start on <strong>Monday, July 18th.</strong>
            </ListItem>
            <ListItem>
              Sign up will close on <strong>Friday, July 15th, 23:59 UTC.</strong>
            </ListItem>
            <ListItem>
              This is a regular{" "}
              <ExternalLink url="https://ootbingo.github.io/bingo/latest-version.html">
                Bingo
              </ExternalLink>{" "}
              tournament, played on the latest version (currently <strong>v10.2</strong>). Note that
              the version <em>may</em> be updated between rounds, but never while a round is in
              progress.
            </ListItem>
            <ListItem>
              The tournament consists of two phases: a swiss-round phase followed by a
              single-elimination bracket phase.
            </ListItem>
            <ListItem>
              Having a <ExternalLink url="https://racetime.gg/${}">Racetime.gg</ExternalLink>{" "}
              account with <em>at least one</em> race in the OoT Bingo category is required to join
              the tournament. You may sign up before you completed one race, but should finish one
              before the tournament starts (join ESNB/SNB for example!).
            </ListItem>
          </List>

          <h3>Rules</h3>
          <List>
            <ListItem>
              All races must be played on{" "}
              <ExternalLink url={`https://racetime.gg/${tournamentSettings.RACETIME_CATEGORY}`}>
                Racetime.gg
              </ExternalLink>{" "}
              and announced in the Discord when about to start.
            </ListItem>
            <ListItem>
              <strong>ESNB</strong> and <strong>SNB</strong> may not be used for any match in the
              tournament. All races have to be played in a different room from <strong>ESNB</strong>{" "}
              or <strong>SNB</strong>.
            </ListItem>
            <ListItem>
              It is not allowed to help entrants with their bingo during tournament races.
            </ListItem>
            <ListItem>
              Entrants may not watch the restream of their match while they are racing.
            </ListItem>
            <ListItem>All races must be livestreamed.</ListItem>
          </List>

          <h3>Scheduling & recording</h3>
          <List>
            <ListItem>
              After you've been assigned an opponent, you will find your match on your{" "}
              <InternalLink to="/profile/matches">profile page</InternalLink>. You can schedule your
              race by pressing the <CalendarIcon /> 'pick time' button. Only one match entrant has
              to do so. Only schedule after you agreed on a time with your opponent.
            </ListItem>
            <ListItem>
              After the Racetime race has been <strong>recorded</strong>, you can save the results
              of your match to the website. Copy the Racetime race url, go to your{" "}
              <InternalLink to="/profile/matches">profile page</InternalLink>, and click the
              <SaveIcon /> button.
            </ListItem>
            <ListItem>
              If, for any reason, you are unable to to play your match, please contact a Tournament
              Organizer.
            </ListItem>
          </List>

          <h3>Phase 1: Swiss Rounds</h3>
          <List>
            <ListItem>
              The first phase consists of <strong>4</strong> rounds.
            </ListItem>
            <ListItem>
              Each round starts on <strong>Monday, 4pm UTC</strong> and lasts exactly one week.
            </ListItem>
            <ListItem>
              All races have to be finished before the end of the round. If a race is not done in
              time, the decision about the result of the match and further action regarding both
              players is left to the tournament organizers and will be treated case by case.
            </ListItem>
            <ListItem>
              A win is awarded <strong>3</strong> points. In the unlikely case of a draw (to the
              second), both players are awarded <strong>1</strong> point.
            </ListItem>
            <ListItem>
              A forfeit is counted as a <strong>4:00:00</strong> time for the tournament median.
            </ListItem>
            <ListItem>
              Ranking is based on amount of points, then median time in the tournament, then amount
              of finished (not forfeited) races in the tournament.
            </ListItem>

            <br />
            <strong>Seeding and paring</strong>
            <List>
              <ListItem>
                Seeding and pairing will be based on the{" "}
                <ExternalLink url="https://xwmtp.github.io/bingo-leaderboard">
                  Bingo leaderboard
                </ExternalLink>{" "}
                rating, not the tournament's ranking.
              </ListItem>
              <ListItem>
                Before Round 1 starts, the upper half (rounded up) of the leaderboard gets one{" "}
                <em>virtual point</em>. The virtual point is removed before Round 3 starts.
              </ListItem>
              <ListItem>
                Within each group of entrants with the same amount of tournament points (including
                the virtual point), the highest-seeded player will face the lowest-seeded player,
                the second highest will face the second lowest, and so on.
              </ListItem>
              <ListItem>
                If a group has an odd number of entrants, the highest seed of that group floats down
                to the group below. Each entrant can be floated down according to that rule at most
                once.
              </ListItem>
              <ListItem>
                Each entrant will only have to face an entrant that floated down once at most.
              </ListItem>
              <ListItem>
                If there is an odd number of entrants, the highest seed of the lowest group gets a{" "}
                <strong>bye</strong>. A maximum of one bye can be given to each entrant.
              </ListItem>
              <ListItem>
                A player that received a bye should still do a race against any opponent(s), to set
                a time for their tournament median. If not, they receive a forfeit time (but still 3
                points). They should announce before the match that it will count for the
                tournament.
              </ListItem>
            </List>
            <ListItem>
              At the end of the 4th round, the top <strong>13</strong> players will advance to the
              second phase as seeds 1 to 13.
            </ListItem>
            <ListItem>
              Among the remaining players, the top <strong>3</strong> median times will advance to
              the second phase as seeds 14 to 16.
            </ListItem>
          </List>

          <h3>Phase 2: Bracket</h3>
          <List>
            <ListItem>
              The second phase is a <strong>single-elimination</strong> bracket.
            </ListItem>
            <ListItem>In the event of a draw, the match has to be played again.</ListItem>{" "}
            <ListItem>
              Each match consists of one race, except for the grand finals, which is played in three
              races.
            </ListItem>
          </List>
        </AboutContent>
      </Container>
      <PreviousYearsContainer title={"Previous years"} width={"30%"}>
        <PreviousYears />
      </PreviousYearsContainer>
    </AboutPageDiv>
  );
};

const AboutPageDiv = styled.div`
  width: 100%;
  display: flex;
  max-width: 90vw;
  flex-direction: row;
  justify-content: center;
`;

const PreviousYearsContainer = styled(Container)`
  margin-left: ${Margins.container}rem;
`;

const AboutContent = styled.div`
  line-height: 1.3rem;
`;

const List = styled.ul`
  padding: 1rem 1.5rem;
`;

const ListItem = styled.li`
  padding: 0.15rem 0;
`;

const SaveIcon = styled(BiSave)`
  margin-left: 0.4rem;
  margin-right: 0.2rem;
  transform: scale(1.3);
`;

const CalendarIcon = styled(BiCalendar)`
  margin-left: 0.3rem;
  margin-right: 0.2rem;
  transform: scale(1.2);
`;
