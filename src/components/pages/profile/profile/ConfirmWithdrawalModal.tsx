import React from "react";
import { Modal } from "../../../Modal";
import { useMutation, useQueryClient } from "react-query";
import { withdraw } from "../../../../api/userApi";
import styled from "styled-components";
import { MutationButton } from "../../../forms/buttons/MutationButton";
import { ErrorText } from "../../../general/ErrorText";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const ConfirmWithdrawalModal: React.FC<Props> = ({ visible, onClose }) => {
  const queryClient = useQueryClient();
  const withdrawMutation = useMutation(withdraw, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
      internalOnClose();
    },
  });

  const internalOnClose = () => {
    withdrawMutation.reset();
    onClose();
  };

  return (
    <Modal modalTitle={"Withdraw from tournament"} isOpen={visible} onClose={internalOnClose}>
      <p>
        Are you sure you want to withdraw from the tournament? You are able to join again until the
        sign up deadline. Afterwards you cannot rejoin the tournament. Note that you have to alert a
        tournament organizer to withdraw after the deadline has passed.
      </p>
      {withdrawMutation.isError && (
        <ErrorText>Could not withdraw, please try again later.</ErrorText>
      )}

      <ConfirmButton
        mutationStatus={withdrawMutation.status}
        onIdleText={"Withdraw"}
        color={"coral"}
        size={"big"}
        onClick={() => withdrawMutation.mutate()}
      />
    </Modal>
  );
};

const ConfirmButton = styled(MutationButton)`
  margin-top: 1.2rem;
`;
