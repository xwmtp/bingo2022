import { UserDisplay } from "../../../../UserDisplay";
import React from "react";
import styled from "styled-components";
import { FlexDiv } from "../../../../divs/FlexDiv";
import { DeleteButton } from "../../../../forms/buttons/DeleteButton";
import { MatchToAdd } from "../../../../../domain/Match";

interface Props {
  matchesToAdd: MatchToAdd[];
  onRemoveMatch?: (index: number) => void;
  className?: string;
}

export const MatchesToAddList: React.FC<Props> = ({ matchesToAdd, onRemoveMatch, className }) => {
  if (matchesToAdd.length === 0) {
    return <></>;
  }
  return (
    <Matches className={className}>
      {matchesToAdd.map((matchToAdd, index) => {
        return (
          <Match key={index}>
            {onRemoveMatch && <DeleteButtonStyled onClick={() => onRemoveMatch(index)} />}
            <UserDisplay user={matchToAdd.entrant1} />
            {matchToAdd.entrant2 && <UserDisplay user={matchToAdd.entrant2} />}
            <p>{matchToAdd.round}</p>
          </Match>
        );
      })}
    </Matches>
  );
};

const Matches = styled.div`
  flex-direction: column;
`;

const Match = styled(FlexDiv)`
  justify-content: flex-start;
  margin-top: 0.7rem;
`;

const DeleteButtonStyled = styled(DeleteButton)`
  margin-right: 2rem;
`;
