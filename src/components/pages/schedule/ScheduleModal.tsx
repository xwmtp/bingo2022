import React, { useState } from "react";
import styled from "styled-components";
import { DateTime } from "luxon";
import { FlexDiv } from "../../divs/FlexDiv";
import { DateTimeInput } from "../../forms/DateTimeInput";
import { Modal } from "../../Modal";
import { useMutation, useQueryClient } from "react-query";
import { updateMatchTime } from "../../../api/matchesApi";
import { MutationButton } from "../../forms/buttons/MutationButton";
import { UnscheduledMatch } from "../../../domain/Match";
import { ErrorText } from "../../general/ErrorText";
import { MatchDisplay } from "../../MatchDisplay";

interface Props {
  match: UnscheduledMatch;
  visible: boolean;
  onClose: () => void;
}

export const ScheduleModal: React.FC<Props> = ({ match, visible, onClose }) => {
  const initialDateTime = DateTime.local().plus({ day: 1 }).startOf("day").plus({ hour: 20 });
  const [dateTimeInput, setDateTimeInput] = useState<DateTime>(initialDateTime);

  const queryClient = useQueryClient();
  const matchMutation = useMutation(updateMatchTime, {
    onSuccess: () => {
      queryClient.invalidateQueries("allMatches");
      onClose();
    },
  });

  const updateMatch = {
    matchId: match.id,
    newTime: dateTimeInput,
  };

  const internalOnClose = () => {
    matchMutation.reset();
    onClose();
  };

  const validInput = dateTimeInput > DateTime.local();

  return (
    <Modal modalTitle={"Pick date & time"} isOpen={visible} onClose={internalOnClose}>
      <ContainerContents>
        <MatchDisplay match={match} />

        <p>
          {`Please schedule your match after agreeing on a time with your
            opponent. Your detected timezone is ${DateTime.local().toFormat(
              "ZZZZ"
            )} (${DateTime.local().toFormat("ZZZZZ")}).`}
        </p>

        <DateTimeInput dateTime={dateTimeInput} setDateTime={setDateTimeInput} />

        <p>Schedule match for:</p>
        <h4>{dateTimeInput.toLocaleString(DateTime.DATETIME_FULL)}</h4>

        {matchMutation.isError && (
          <ErrorText>Could not schedule the match, please try again later.</ErrorText>
        )}

        <ConfirmButton
          disabled={!validInput}
          mutationStatus={matchMutation.status}
          color={"brightMossGreen"}
          size={"big"}
          onClick={() => validInput && matchMutation.mutate(updateMatch)}
        />
      </ContainerContents>
    </Modal>
  );
};

const ContainerContents = styled(FlexDiv)`
  display: flex;
  flex-direction: column;
`;

const ConfirmButton = styled(MutationButton)`
  margin-top: 1.2rem;
`;
