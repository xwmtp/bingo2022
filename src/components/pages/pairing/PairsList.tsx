import React from "react";
import { PairBlock } from "./PairBlock";
import { Pair } from "../../../domain/Pair";
import styled from "styled-components";
import { FlexDiv } from "../../divs/FlexDiv";

interface Props {
  pairs: Pair[];
  numberOfVisiblePairs: number;
}

export const PairsList: React.FC<Props> = ({ pairs, numberOfVisiblePairs }) => {
  return (
    <PairsListStyled>
      {pairs.map((pair, i) => (
        <PairBlock key={i} pair={pair} isVisible={i < numberOfVisiblePairs} />
      ))}
    </PairsListStyled>
  );
};

const PairsListStyled = styled(FlexDiv)`
  flex-direction: column;
  flex-wrap: wrap;
  max-height: 48rem;
  margin-bottom: 0.7rem;
`;
