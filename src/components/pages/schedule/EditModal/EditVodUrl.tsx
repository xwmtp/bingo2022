import React, { useEffect, useState } from "react";
import { Input } from "../../../forms/Input";
import { ErrorText } from "../../../general/ErrorText";
import styled from "styled-components";
import { Container } from "../../../Container";
import { FlexDiv } from "../../../divs/FlexDiv";
import { MutationButton } from "../../../forms/buttons/MutationButton";
import { UseMutationResult } from "react-query";
import { Match } from "../../../../domain/Match";

interface Props {
  match: Match;
  setVodMutation: UseMutationResult<void, unknown, { matchId: string; vodUrl: string }>;
  deleteVodMutation: UseMutationResult<void, unknown, string>;
}

export const EditVodUrl: React.FC<Props> = ({ match, setVodMutation, deleteVodMutation }) => {
  const [vodUrl, setVodUrl] = useState<string | undefined>(undefined);

  const isValidInput = vodUrl?.startsWith("https://");

  const updateVodMatch = !!vodUrl &&
    isValidInput && {
      matchId: match.id,
      vodUrl: vodUrl,
    };

  useEffect(() => {
    if (setVodMutation.isError) {
      setVodMutation.reset();
      deleteVodMutation.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vodUrl]);

  return (
    <EditVodContainer title="Update vod (Admin only)" size="small" backgroundColor="lightGrey">
      <p>Set the vod url {`(currently: ${match.vodUrl ?? "no vod url set"})`}.</p>

      <EditVodDiv>
        <VodInputField
          type="text"
          maxLength={60}
          value={vodUrl ?? ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setVodUrl(event.target.value)}
          placeholder={"https://twitch.tv/videos/123"}
        />

        {setVodMutation.isError && (
          <ErrorText>Could not set the vod url, please try again later.</ErrorText>
        )}
      </EditVodDiv>

      <MutationButtonStyled
        disabled={!updateVodMatch}
        mutationStatus={setVodMutation.status}
        onIdleText={"Set vod"}
        color={"brightMossGreen"}
        size={"big"}
        onClick={() => updateVodMatch && setVodMutation.mutate(updateVodMatch)}
      />

      <MutationButtonStyled
        disabled={!match.vodUrl}
        mutationStatus={deleteVodMutation.status}
        onIdleText={"Remove vod"}
        color={"coral"}
        size={"big"}
        onClick={() => match.vodUrl && deleteVodMutation.mutate(match.id)}
      />
    </EditVodContainer>
  );
};

const MutationButtonStyled = styled(MutationButton)`
  margin-top: 1.2rem;
`;

const EditVodContainer = styled(Container)`
  margin-top: 2rem;
  margin-bottom: 0;
  flex-direction: column;
`;

const EditVodDiv = styled(FlexDiv)`
  flex-direction: column;
`;

const VodInputField = styled(Input)`
  width: 20rem;
  margin: 0.7rem 0;
  font-size: 1rem;
`;
