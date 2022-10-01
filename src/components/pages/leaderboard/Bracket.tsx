import React from "react";
import { BracketRound, getWinner, includesUser, MatchUp } from "../../../domain/BracketSetup";
import styled from "styled-components";
import { UserDisplay } from "../../UserDisplay";
import { Container } from "../../Container";
import { Colors } from "../../../GlobalStyle";
import { FlexDiv } from "../../divs/FlexDiv";
import { Entrant } from "../../../domain/Entrant";
import { useUser } from "../../../api/userApi";

interface Props {
  bracketRounds: BracketRound[];
  className?: string;
}

export const Bracket: React.FC<Props> = ({ bracketRounds }) => {
  return (
    <Container title="Phase 2 - Bracket">
      <FlexDiv>
        {bracketRounds.map((round) => (
          <BracketRoundColumn round={round} key={round.name} />
        ))}
      </FlexDiv>
    </Container>
  );
};

const BracketRoundColumn: React.FC<{ round: BracketRound; className?: string }> = ({ round }) => {
  return (
    <Round>
      {round.matchUps.map((matchUp, index) => (
        <BracketMatchUp matchUp={matchUp} key={round.name + index} />
      ))}
    </Round>
  );
};

const BracketMatchUp: React.FC<{ matchUp: MatchUp; className?: string }> = ({ matchUp }) => {
  const { data: user } = useUser();
  const winner = getWinner(matchUp);
  const includesLoggedInUser = !!user && includesUser(matchUp, user);

  return (
    <MatchUpBlock $displayAsLoggedInUser={includesLoggedInUser}>
      <BracketMatchSlot player={matchUp.player1} matchWinner={winner} />
      <BracketMatchSlot player={matchUp.player2} matchWinner={winner} />
    </MatchUpBlock>
  );
};

const BracketMatchSlot: React.FC<{
  player?: Entrant;
  matchWinner?: Entrant;
  className?: string;
}> = ({ player, matchWinner, className }) => {
  const playerHasLost = !!matchWinner && player?.user.id !== matchWinner.user.id;
  return (
    <Slot $hasLost={playerHasLost} className={className}>
      {!!player?.user && <UserDisplay user={player.user} size="small" removeNamePadding={true} />}
    </Slot>
  );
};

const Round = styled(FlexDiv)`
  align-self: stretch;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  margin: 0 0.3rem;
  flex-basis: 25%;
  min-width: 0;
`;

const Slot = styled(FlexDiv)<{ $hasLost?: boolean }>`
  justify-content: flex-start;
  height: 1.7rem;
  max-width: 100%;
  opacity: ${({ $hasLost }) => ($hasLost ? 0.5 : 1)};
`;

const MatchUpBlock = styled(FlexDiv)<{
  $displayAsLoggedInUser: boolean;
}>`
  flex-direction: column;
  align-items: flex-start;
  margin: 0.7rem 0;
  background-color: ${({ $displayAsLoggedInUser }) =>
          $displayAsLoggedInUser ? Colors.brightGrey : Colors.lightGrey};
  border-radius: 0.6rem;
  padding: 0.4rem 0.6rem;
  width: 100%;
`;
