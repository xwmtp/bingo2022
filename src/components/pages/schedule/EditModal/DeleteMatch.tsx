import React from "react";
import { ErrorText } from "../../../general/ErrorText";
import styled from "styled-components";
import { MutationButton } from "../../../forms/buttons/MutationButton";
import { Container } from "../../../Container";
import { Match } from "../../../../domain/Match";
import { UseMutationResult } from "react-query";

interface Props {
  match: Match;
  deleteMatchMutation: UseMutationResult<void, unknown, string[], unknown>;
}

export const DeleteMatch: React.FC<Props> = ({ match, deleteMatchMutation }) => {
  return (
    <DeleteMatchContainer
      title="Delete match (Admin only)"
      size="small"
      backgroundColor="lightGrey"
    >
      <p>Click the button to completely remove this match from the database.</p>

      {deleteMatchMutation.isError && (
        <ErrorText>Could not delete te match, please try again later.</ErrorText>
      )}

      <MutationButtonStyled
        mutationStatus={deleteMatchMutation.status}
        onIdleText={"DELETE MATCH"}
        color={"coral"}
        size={"big"}
        onClick={() => deleteMatchMutation.mutate([match.id])}
      />
    </DeleteMatchContainer>
  );
};

const MutationButtonStyled = styled(MutationButton)`
  margin-top: 1.2rem;
`;

const DeleteMatchContainer = styled(Container)`
  margin-top: 2rem;
  margin-bottom: 0;
  flex-direction: column;
`;
