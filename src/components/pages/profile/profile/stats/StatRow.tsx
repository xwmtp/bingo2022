import React from "react";
import styled from "styled-components";
import { FlexDiv } from "../../../../divs/FlexDiv";
import { Colors, ScreenWidths } from "../../../../../GlobalStyle";

interface Props {
  name: string;
  stat: string | number;
}

export const StatRow: React.FC<Props> = ({ name, stat }) => {
  return (
    <StatRowStyled>
      <StatName>{name}</StatName>
      <Stat>{stat}</Stat>
    </StatRowStyled>
  );
};

const StatRowStyled = styled(FlexDiv)`
  justify-content: flex-start;
`;

const StatName = styled.p`
  min-width: 11rem;
  @media (max-width: ${ScreenWidths.tablet}px) {
    min-width: 9.5rem;
  }
`;

const Stat = styled.p`
  color: ${Colors.brighterMossGreen};
`;
