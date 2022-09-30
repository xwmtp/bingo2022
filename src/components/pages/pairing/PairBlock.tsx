import React from "react";
import styled from "styled-components";
import { Block } from "../../Block";
import { UserDisplay } from "../../UserDisplay";
import { FlexDiv } from "../../divs/FlexDiv";
import { Pair } from "../../../domain/Pair";

interface Props {
  pair: Pair;
  isVisible: boolean;
  direction?: "row" | "column";
}

export const PairBlock: React.FC<Props> = ({ pair, isVisible, direction = "row" }) => {
  const BlockStyled = direction === "row" ? BlockHorizontal : BlockVertical;
  const PairUserStyled = direction === "row" ? PairUserRow : PairUserRowVertical;
  return (
    <BlockStyled>
      {pair.map((entry) => (
        <PairUserStyled key={entry.user.id} $isVisible={isVisible}>
          <PairUserDisplay user={entry.user} />
          <PairPoints>{entry.pairPoints}</PairPoints>
          <p>{entry.pairSeed}</p>
        </PairUserStyled>
      ))}
    </BlockStyled>
  );
};

const BlockHorizontal = styled(Block)`
  justify-content: space-between;
  padding: 0.6rem;
`;

const BlockVertical = styled(BlockHorizontal)`
  flex-direction: column;
`;

const PairUserRow = styled(FlexDiv)<{ $isVisible: boolean }>`
  visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
  min-width: 18rem;
`;

const PairUserRowVertical = styled(PairUserRow)`
  margin: 0.5rem 0;
`;

const PairUserDisplay = styled(UserDisplay)`
  margin-right: 0.5rem;
`;

const PairPoints = styled.p`
  margin-right: 1rem;
`;
