import React, { useState } from "react";
import styled from "styled-components";
import { DateTime } from "luxon";
import { FlexDiv } from "../../../divs/FlexDiv";
import { DateTimeInput } from "../../../forms/DateTimeInput";
import { Modal } from "../../../Modal";
import { useMutation, useQueryClient } from "react-query";
import {
  deleteMatches,
  removeMatchRestream,
  removeMatchVod,
  updateMatchRestream,
  updateMatchTime,
  updateMatchVod,
} from "../../../../api/matchesApi";
import { ScheduledMatch } from "../../../../domain/Match";
import { MutationButton } from "../../../forms/buttons/MutationButton";
import { useUser } from "../../../../api/userApi";
import { isAdmin } from "../../../../domain/User";
import { ErrorText } from "../../../general/ErrorText";
import { MatchDisplay } from "../../../MatchDisplay";
import { EditRestream } from "./EditRestream";
import { DeleteMatch } from "./DeleteMatch";
import { EditVodUrl } from "./EditVodUrl";

interface Props {
  match: ScheduledMatch;
  visible: boolean;
  onClose: () => void;
}

export const EditModal: React.FC<Props> = ({ match, visible, onClose }) => {
  const [dateTimeInput, setDateTimeInput] = useState<DateTime>(match.scheduledTime);

  const validDateTimeInput = dateTimeInput > DateTime.local();

  const { data: user } = useUser();

  const queryClient = useQueryClient();
  const onMutationSucces = async () => {
    await queryClient.invalidateQueries("allMatches");
    onClose();
  };

  const updateTimeMutation = useMutation(updateMatchTime, { onSuccess: onMutationSucces });
  const deleteMatchMutation = useMutation(deleteMatches, { onSuccess: onMutationSucces });

  const setRestreamMutation = useMutation(updateMatchRestream, { onSuccess: onMutationSucces });
  const deleteRestreamMutation = useMutation(removeMatchRestream, { onSuccess: onMutationSucces });

  const setVodMutation = useMutation(updateMatchVod, { onSuccess: onMutationSucces });
  const deleteVodMutation = useMutation(removeMatchVod, { onSuccess: onMutationSucces });

  const updateTimeMatch = {
    matchId: match.id,
    newTime: dateTimeInput,
  };

  const internalOnClose = () => {
    updateTimeMutation.reset();
    deleteMatchMutation.reset();
    setRestreamMutation.reset();
    deleteRestreamMutation.reset();
    setVodMutation.reset();
    deleteVodMutation.reset();
    onClose();
  };

  return (
    <Modal modalTitle={"Change date & time"} isOpen={visible} onClose={internalOnClose}>
      <ContainerContents>
        <MatchDisplay match={match} />

        <p>
          {`Please only change the date and time your match after agreeing with your
            opponent. Your detected timezone is ${DateTime.local().toFormat(
              "ZZZZ"
            )} (${DateTime.local().toFormat("ZZZZZ")}).`}
        </p>

        <DateTimeInput dateTime={dateTimeInput} setDateTime={setDateTimeInput} />

        <p>New date & time:</p>
        <h4>{dateTimeInput.toLocaleString(DateTime.DATETIME_FULL)}</h4>

        {updateTimeMutation.isError && (
          <ErrorText>Could not update the time, please try again later.</ErrorText>
        )}

        <MutationButtonStyled
          disabled={!validDateTimeInput}
          mutationStatus={updateTimeMutation.status}
          onIdleText={"Change"}
          color={"brightMossGreen"}
          size={"big"}
          onClick={() => validDateTimeInput && updateTimeMutation.mutate(updateTimeMatch)}
        />

        {!!user && isAdmin(user) && (
          <>
            <EditRestream
              match={match}
              setRestreamMutation={setRestreamMutation}
              deleteRestreamMutation={deleteRestreamMutation}
            />
            <EditVodUrl
              match={match}
              setVodMutation={setVodMutation}
              deleteVodMutation={deleteVodMutation}
            />
            <DeleteMatch match={match} deleteMatchMutation={deleteMatchMutation} />
          </>
        )}
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
