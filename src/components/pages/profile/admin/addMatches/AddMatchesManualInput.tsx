import React, { useState } from "react";
import { UserInputField } from "../../../../forms/UserInputField";
import { UserDisplay } from "../../../../UserDisplay";
import styled from "styled-components";
import { FlexDiv } from "../../../../divs/FlexDiv";
import { Input } from "../../../../forms/Input";
import { Button } from "../../../../forms/Button";
import { User } from "../../../../../domain/User";
import { MatchToAdd } from "../../../../../domain/Match";
import { Block } from "../../../../Block";

interface Props {
  allEntrants: User[];
  maxMatchesReached: boolean;
  addMatches: (matchesToAdd: MatchToAdd[]) => void;
}

export const AddMatchesManualInput: React.FC<Props> = ({
  allEntrants,
  maxMatchesReached,
  addMatches,
}) => {
  const [inputRound, setInputRound] = useState<string>("");

  const [entrant1, setEntrant1] = useState<User | undefined>(undefined);
  const [entrant2, setEntrant2] = useState<User | undefined>(undefined);

  const validManualInput = !!entrant1 && !!inputRound;

  return (
    <ManualInputBlock>
      <Title>Manual Input</Title>
      <InputRow>
        <InputLabel>Round</InputLabel>
        <InputField
          type="text"
          value={inputRound}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setInputRound(event.target.value)
          }
          placeholder={"round"}
        />
        <p>{inputRound}</p>
      </InputRow>

      <InputRow>
        <InputLabel>Entrant 1</InputLabel>
        <UserInputField
          initialInput={""}
          allUsers={allEntrants}
          onUserChange={setEntrant1}
          placeholder="entrant"
        />
        {entrant1 && <UserDisplay user={entrant1} />}
      </InputRow>

      <InputRow>
        <InputLabel>Entrant 2</InputLabel>

        <UserInputField
          initialInput={""}
          allUsers={allEntrants}
          onUserChange={setEntrant2}
          placeholder="entrant"
        />
        {entrant2 && <UserDisplay user={entrant2} />}
      </InputRow>

      <AddMatchButtonDiv>
        <Button
          disabled={!validManualInput || maxMatchesReached}
          color={"coral"}
          onClick={() => {
            validManualInput &&
              addMatches([
                {
                  entrant1: entrant1,
                  entrant2: entrant2,
                  round: inputRound,
                },
              ]);
          }}
        >
          +
        </Button>
      </AddMatchButtonDiv>
    </ManualInputBlock>
  );
};

const ManualInputBlock = styled(Block)`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1rem;
  margin: 0 0 1rem 0;
  align-self: stretch;
`;

const Title = styled.h3`
  margin-bottom: 2rem;
`;

const InputRow = styled(FlexDiv)`
  justify-content: flex-start;
  margin-right: 2rem;
`;

const InputLabel = styled(FlexDiv)`
  width: 5rem;
  justify-content: flex-start;
`;

const InputField = styled(Input)`
  width: 15rem;
  margin-right: 1rem;
  font-size: 1rem;
`;

const AddMatchButtonDiv = styled.div`
  margin-top: 0.5rem;
  align-self: flex-end;
  width: 2rem;
`;
