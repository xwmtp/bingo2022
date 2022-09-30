import React from "react";
import { Modal } from "../../../../Modal";
import { MatchesToAddList } from "./MatchesToAddList";
import styled from "styled-components";
import { MatchToAdd } from "../../../../../domain/Match";
import { addMatches } from "../../../../../api/matchesApi";
import { useMutation, useQueryClient } from "react-query";
import { MutationButton } from "../../../../forms/buttons/MutationButton";
import { ErrorText } from "../../../../general/ErrorText";

interface Props {
  matchesToAdd: MatchToAdd[];
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ConfirmMatchesToAddModal: React.FC<Props> = ({
  matchesToAdd,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const queryClient = useQueryClient();
  const addMatchesMutation = useMutation(addMatches, {
    onSuccess: (data) => {
      // successful mutation
      if (data.length === matchesToAdd.length) {
        queryClient.invalidateQueries("allMatches");
        onSuccess();
        onClose();
      }
    },
  });

  const internalOnClose = () => {
    addMatchesMutation.reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={internalOnClose}>
      <ModalContent>
        <p>{`Are you sure you want to add these ${matchesToAdd.length} match${
          matchesToAdd.length > 1 ? "es" : ""
        }?`}</p>
        <MatchesToAdd matchesToAdd={matchesToAdd} />

        {addMatchesMutation.isError && <ErrorText>Something went wrong</ErrorText>}

        <MutationButtonStyled
          mutationStatus={addMatchesMutation.status}
          onIdleText="Confirm"
          color={"brightMossGreen"}
          size={"big"}
          onClick={() => addMatchesMutation.mutate(matchesToAdd)}
        />
      </ModalContent>
    </Modal>
  );
};

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MatchesToAdd = styled(MatchesToAddList)`
  margin-top: 1rem;
`;

const MutationButtonStyled = styled(MutationButton)`
  margin-top: 1.2rem;
`;
