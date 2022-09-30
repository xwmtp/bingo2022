import React, { useState } from "react";
import { ErrorText } from "../../../general/ErrorText";
import styled from "styled-components";
import { MutationButton } from "../../../forms/buttons/MutationButton";
import { Container } from "../../../Container";
import { FlexDiv } from "../../../divs/FlexDiv";
import { Match } from "../../../../domain/Match";
import { UseMutationResult } from "react-query";
import { Input } from "../../../forms/Input";
import { UserDisplay } from "../../../UserDisplay";

interface Props {
  match: Match;
  setCustomResultMutation: UseMutationResult<
    void,
    unknown,
    { matchId: string; restreamChannelUrl: string }
  >;
}

export const CustomResult: React.FC<Props> = ({ match, setCustomResultMutation }) => {
  const [resultInputs, setResultInputs] = useState<number[]>(match.entrants.map((_) => 0));

  // todo make result update object
  const updateRestreamMatch = {
    matchId: match.id,
    restreamChannelUrl: "https://twitch.tv/",
  };

  // useEffect(() => {
  //   if (setCustomResultMutation.isError) {
  //     setCustomResultMutation.reset();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [restreamChannel]);

  return (
    <CustomResultContainer
      title="Set custom result (Admin onyl)"
      size="small"
      backgroundColor="lightGrey"
    >
      <p>
        Set a custom race result for each entrant, <strong>in seconds</strong>. Put -1 for a dnf/dq.
      </p>

      {match.entrants.map((entrant, entrantIndex) => {
        return (
          <ResultInputDiv>
            <UserDisplay user={entrant.user} />
            <ResultInput
              type="number"
              maxLength={7}
              value={resultInputs[entrantIndex]}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setResultInputs((prevInputs) =>
                  prevInputs.map((prevInput, index) =>
                    entrantIndex === index ? parseInt(event.target.value) : prevInput
                  )
                )
              }
              placeholder={"1234"}
            />
          </ResultInputDiv>
        );
      })}

      <UpdateRestreamDiv>
        {setCustomResultMutation.isError && (
          <ErrorText>Could not set the restream channel, please try again later.</ErrorText>
        )}
      </UpdateRestreamDiv>

      <MutationButtonStyled
        disabled={!updateRestreamMatch}
        mutationStatus={setCustomResultMutation.status}
        onIdleText={"Record custom result"}
        color={"coral"}
        size={"big"}
        onClick={() => updateRestreamMatch && setCustomResultMutation.mutate(updateRestreamMatch)}
      />
    </CustomResultContainer>
  );
};

const ResultInputDiv = styled(FlexDiv)``;

const ResultInput = styled(Input)`
  margin-top: 0.5rem;
  width: 7rem;
`;

const MutationButtonStyled = styled(MutationButton)`
  margin-top: 1.2rem;
`;

const CustomResultContainer = styled(Container)`
  margin-top: 2rem;
  margin-bottom: 0;
  flex-direction: column;
`;

const UpdateRestreamDiv = styled(FlexDiv)`
  flex-direction: column;
`;
