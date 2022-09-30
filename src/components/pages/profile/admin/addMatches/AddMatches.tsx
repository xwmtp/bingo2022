import React, { useState } from "react";
import styled from "styled-components";
import { FlexDiv } from "../../../../divs/FlexDiv";
import { Button } from "../../../../forms/Button";
import { MatchesToAddList } from "./MatchesToAddList";
import { ConfirmMatchesToAddModal } from "./ConfirmMatchesToAddModal";
import { MatchToAdd } from "../../../../../domain/Match";
import { useAllEntrants } from "../../../../../api/entrantsApi";
import { Spinner } from "../../../../general/Spinner";
import { AddMatchesManualInput } from "./AddMatchesManualInput";
import { AddMatchesJsonInput } from "./AddMatchesJsonInput";

const maxMatchesAtOnce = 50;

export const AddMatches: React.FC = () => {
  const { data: allEntrants, isError, isSuccess } = useAllEntrants();
  const [matchesToAdd, setMatchesToAdd] = useState<MatchToAdd[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const maxMatchesReached = matchesToAdd.length > maxMatchesAtOnce;

  if (isError) {
    return <p>Could not load entrants</p>;
  }
  if (!isSuccess) {
    return <Spinner size="small" />;
  }

  const addMatches = (matches: MatchToAdd[]) => {
    setMatchesToAdd((prevMatches) => [...prevMatches, ...matches]);
  };

  const removeMatch = (index: number) => {
    setMatchesToAdd((matches) => [
      ...matches.slice(0, index),
      ...matches.slice(index + 1, matches.length),
    ]);
  };

  return (
    <AddMatchesDiv>
      <MatchInputs>
        <AddMatchesManualInput
          allEntrants={allEntrants}
          maxMatchesReached={matchesToAdd.length > maxMatchesAtOnce}
          addMatches={addMatches}
        />

        <AddMatchesJsonInput
          allEntrants={allEntrants}
          maxMatchesReached={maxMatchesReached}
          addMatches={addMatches}
        />
      </MatchInputs>

      {matchesToAdd.length > 0 && <h3>Matches to add</h3>}

      <MatchesToAdd matchesToAdd={matchesToAdd} onRemoveMatch={removeMatch} />
      {matchesToAdd.length > 0 && (
        <AddMatchesButton color={"brightMossGreen"} onClick={() => setShowConfirmModal(true)}>
          {`Add ${matchesToAdd.length} match${matchesToAdd.length > 1 ? "es" : ""}`}
        </AddMatchesButton>
      )}

      <ConfirmMatchesToAddModal
        matchesToAdd={matchesToAdd}
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onSuccess={() => setMatchesToAdd([])}
      />
    </AddMatchesDiv>
  );
};

const AddMatchesDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const MatchInputs = styled(FlexDiv)`
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const MatchesToAdd = styled(MatchesToAddList)`
  margin-top: 1rem;
`;

const AddMatchesButton = styled(Button)`
  margin-top: 1rem;
  width: 8rem;
`;
