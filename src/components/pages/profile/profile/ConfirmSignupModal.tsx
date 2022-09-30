import React from "react";
import { Modal } from "../../../Modal";
import { useMutation, useQueryClient } from "react-query";
import { signUp } from "../../../../api/userApi";
import styled from "styled-components";
import { MutationButton } from "../../../forms/buttons/MutationButton";
import { ErrorText } from "../../../general/ErrorText";
import { NavLink } from "react-router-dom";
import { Colors } from "../../../../GlobalStyle";
import { ExternalLink } from "../../../general/ExternalLink";
import { tournamentSettings } from "../../../../Settings";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const ConfirmSignupModal: React.FC<Props> = ({ visible, onClose }) => {
  const queryClient = useQueryClient();
  const signUpMutation = useMutation(signUp, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
      queryClient.invalidateQueries("allEntrants");
    },
  });

  const internalOnClose = () => {
    signUpMutation.reset();
    onClose();
  };

  return (
    <Modal
      modalTitle={"Sign up for the Bingo tournament"}
      isOpen={visible}
      onClose={internalOnClose}
    >
      <p>
        Before you sign up, make sure to familiarize yourself with the{" "}
        <Link to={"/about"} target={"_blank"} rel="noopener noreferrer">
          tournament rules
        </Link>
        .
      </p>
      <br />

      <p>
        In particular, you should have completed at least 1 regular Bingo race on{" "}
        <ExternalLink
          url={`https://racetime.gg/${tournamentSettings.RACETIME_CATEGORY}/leaderboards`}
        >
          Racetime.gg
        </ExternalLink>{" "}
        before the start of the tournament, for the sake of seeding. If you haven't yet, you may
        join now and complete your first race later as long as it's before the tournament start.
      </p>
      {signUpMutation.isError && <ErrorText>Could not sign up, please try again later.</ErrorText>}
      <ConfirmButton
        mutationStatus={signUpMutation.status}
        onIdleText={"Sign up"}
        color={"brightMossGreen"}
        size={"big"}
        onClick={() => signUpMutation.mutate()}
      />
    </Modal>
  );
};

const ConfirmButton = styled(MutationButton)`
  margin-top: 1.2rem;
`;

const Link = styled(NavLink)`
  font-weight: bold;
  color: ${Colors.brighterMossGreen};
`;
