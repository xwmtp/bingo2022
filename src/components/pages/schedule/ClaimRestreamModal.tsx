import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FlexDiv } from "../../divs/FlexDiv";
import { Modal } from "../../Modal";
import { useMutation, useQueryClient } from "react-query";
import { updateMatchRestream } from "../../../api/matchesApi";
import { Match } from "../../../domain/Match";
import { MutationButton } from "../../forms/buttons/MutationButton";
import { ErrorText } from "../../general/ErrorText";
import { MatchDisplay } from "../../MatchDisplay";
import { RestreamChannelInputField } from "../../forms/RestreamChannelInputField";

interface Props {
  match: Match;
  visible: boolean;
  onClose: () => void;
}

export const ClaimRestreamModal: React.FC<Props> = ({ match, visible, onClose }) => {
  const [restreamChannel, setRestreamChannel] = useState<string | undefined>(undefined);

  const queryClient = useQueryClient();
  const updateRestreamMutation = useMutation(updateMatchRestream, {
    onSuccess: () => {
      queryClient.invalidateQueries("allMatches");
      onClose();
    },
  });

  const updateRestreamMatch = restreamChannel && {
    matchId: match.id,
    restreamChannelUrl: "https://twitch.tv/" + restreamChannel,
  };

  const internalOnClose = () => {
    updateRestreamMutation.reset();
    onClose();
  };

  useEffect(() => {
    if (updateRestreamMutation.isError) {
      updateRestreamMutation.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restreamChannel]);

  return (
    <Modal modalTitle={"Set restream channel of match"} isOpen={visible} onClose={internalOnClose}>
      <ContainerContents>
        <MatchDisplay match={match} />

        <p>
          If you're planning to organise a restream for this match, enter the name of the Twitch
          channel it will be broadcast on.
        </p>

        <RestreamChannelInputField initialInput={""} onChannelChange={setRestreamChannel} />

        {updateRestreamMutation.isError && (
          <ErrorText>Could not set the restream channel, please try again later.</ErrorText>
        )}

        <MutationButtonStyled
          disabled={!updateRestreamMatch}
          mutationStatus={updateRestreamMutation.status}
          onIdleText={"Set restream"}
          color={"brightMossGreen"}
          size={"big"}
          onClick={() => updateRestreamMatch && updateRestreamMutation.mutate(updateRestreamMatch)}
        />
      </ContainerContents>
    </Modal>
  );
};

const ContainerContents = styled(FlexDiv)`
  display: flex;
  flex-direction: column;
`;

const MutationButtonStyled = styled(MutationButton)`
  margin-top: 1.2rem;
`;
