import React from "react";
import { Container } from "../../Container";
import { UserDisplay } from "../../UserDisplay";
import { Entrant } from "../../../domain/Entrant";
import { FlexDiv } from "../../divs/FlexDiv";
import styled from "styled-components";

interface Props {
  winner: Entrant;
}


export const Winner: React.FC<Props> = ({ winner }) => {
  return (
    <Container>
      <WinnerDiv>
        <WinnerText>The winner of the <strong>2022 OoT Bingo Tournament</strong> is</WinnerText>

        <UserDisplay size="huge" user={winner.user} removeNamePadding={true} />
      </WinnerDiv>

    </Container>
  );
};

const WinnerText = styled.p`
  margin-bottom: 1rem;
`;

const WinnerDiv = styled(FlexDiv)`
  flex-direction: column;
`;

