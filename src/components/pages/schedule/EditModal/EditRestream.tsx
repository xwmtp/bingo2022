import React, { useEffect, useState } from "react";
import { RestreamChannelInputField } from "../../../forms/RestreamChannelInputField";
import { extractTwitchChannel } from "../../../../lib/urlHelpers";
import { ErrorText } from "../../../general/ErrorText";
import styled from "styled-components";
import { MutationButton } from "../../../forms/buttons/MutationButton";
import { Container } from "../../../Container";
import { FlexDiv } from "../../../divs/FlexDiv";
import { Match } from "../../../../domain/Match";
import { UseMutationResult } from "react-query";

interface Props {
  match: Match;
  setRestreamMutation: UseMutationResult<
    void,
    unknown,
    { matchId: string; restreamChannelUrl: string }
  >;
  deleteRestreamMutation: UseMutationResult<void, unknown, string>;
}

export const EditRestream: React.FC<Props> = ({
  match,
  setRestreamMutation,
  deleteRestreamMutation,
}) => {
  const [restreamChannel, setRestreamChannel] = useState<string | undefined>(undefined);

  const isValidInput = !(restreamChannel || "").startsWith("https");

  const updateRestreamMatch = restreamChannel &&
    isValidInput && {
      matchId: match.id,
      restreamChannelUrl: "https://twitch.tv/" + restreamChannel,
    };

  useEffect(() => {
    if (setRestreamMutation.isError) {
      setRestreamMutation.reset();
      deleteRestreamMutation.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restreamChannel]);

  return (
    <EditRestreamContainer
      title="Update restream (Admin only)"
      size="small"
      backgroundColor="lightGrey"
    >
      <p>
        Set a new restream Twitch channel{" "}
        {`(currently: ${match.restreamChannel ?? "no channel set"})`}.
      </p>

      <UpdateRestreamDiv>
        <RestreamChannelInputField
          initialInput={extractTwitchChannel(match.restreamChannel ?? "")}
          onChannelChange={setRestreamChannel}
        />

        {setRestreamMutation.isError && (
          <ErrorText>Could not set the restream channel, please try again later.</ErrorText>
        )}
        {!isValidInput && <ErrorText>Put the channel name only, not a url.</ErrorText>}
      </UpdateRestreamDiv>

      <MutationButtonStyled
        disabled={!updateRestreamMatch}
        mutationStatus={setRestreamMutation.status}
        onIdleText={"Set restream"}
        color={"brightMossGreen"}
        size={"big"}
        onClick={() => updateRestreamMatch && setRestreamMutation.mutate(updateRestreamMatch)}
      />

      <MutationButtonStyled
        disabled={!match.restreamChannel}
        mutationStatus={deleteRestreamMutation.status}
        onIdleText={"Remove restream"}
        color={"coral"}
        size={"big"}
        onClick={() => match.restreamChannel && deleteRestreamMutation.mutate(match.id)}
      />
    </EditRestreamContainer>
  );
};

const MutationButtonStyled = styled(MutationButton)`
  margin-top: 1.2rem;
`;

const EditRestreamContainer = styled(Container)`
  margin-top: 2rem;
  margin-bottom: 0;
  flex-direction: column;
`;

const UpdateRestreamDiv = styled(FlexDiv)`
  flex-direction: column;
`;
