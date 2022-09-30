import React, { useCallback, useEffect, useState } from "react";
import { ErrorText } from "../../../../general/ErrorText";
import styled from "styled-components";
import { Button } from "../../../../forms/Button";
import { TextAreaInput } from "../../../../forms/TextAreaInput";
import { mapToPairs } from "../../../../../domain/Pair";
import { User } from "../../../../../domain/User";
import { MatchToAdd } from "../../../../../domain/Match";
import { FlexDiv } from "../../../../divs/FlexDiv";
import { Input } from "../../../../forms/Input";
import { Block } from "../../../../Block";

interface Props {
  allEntrants: User[];
  maxMatchesReached: boolean;
  addMatches: (matchesToAdd: MatchToAdd[]) => void;
}

export const AddMatchesJsonInput: React.FC<Props> = ({
  allEntrants,
  maxMatchesReached,
  addMatches,
}) => {
  const [inputRound, setInputRound] = useState<string>("");

  const [matchesJsonInput, setMatchesJsonInput] = useState<string>();
  const [isJsonError, setIsJsonError] = useState<boolean>(false);

  console.log(isJsonError);

  const isValidInput = !!matchesJsonInput && !isJsonError && inputRound;

  useEffect(() => {
    setIsJsonError(false);
  }, [matchesJsonInput]);

  const parseMatchesJson = useCallback(() => {
    const rawPairs = matchesJsonInput && JSON.parse(matchesJsonInput);
    const pairs = rawPairs && allEntrants ? mapToPairs(rawPairs, allEntrants) : [];
    return pairs.map((pair) => {
      if (!pair[0] && !pair[1]) {
        throw Error("Cannot add json match where both players are missing");
      }
      return {
        entrant1: pair[0]?.user,
        entrant2: pair[1]?.user,
        round: inputRound,
      };
    });
  }, [allEntrants, inputRound, matchesJsonInput]);

  const addJsonMatches = useCallback(() => {
    console.log("parsing");
    try {
      const newMatchesToAdd = parseMatchesJson();
      addMatches(newMatchesToAdd);
    } catch (error) {
      console.error("Could not parse json: " + error);
      setIsJsonError(true);
    }
  }, [addMatches, parseMatchesJson]);

  return (
    <JsonInputBlock>
      <Title>Json Input</Title>
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
      </InputRow>

      <TextArea
        value={matchesJsonInput}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setMatchesJsonInput(event.target.value)
        }
        placeholder={JSON.stringify(
          [
            { id: "7pyXGzr3kqBMngyE", points: 6, tourney_points: 6, seed: 939 },
            { id: "lYOPkWLNa1P3K0O1", points: 6, tourney_points: 6, seed: 482 },
          ],
          null,
          1
        )}
      />
      {isJsonError && <ErrorText>Invalid pair json input.</ErrorText>}
      <AddMatchButton
        disabled={!isValidInput || maxMatchesReached}
        color={"coral"}
        onClick={() => isValidInput && addJsonMatches()}
      >
        +
      </AddMatchButton>
    </JsonInputBlock>
  );
};

const JsonInputBlock = styled(Block)`
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  padding: 1rem;
  margin: 0 0 1rem 0;
`;

const Title = styled.h3`
  margin-bottom: 0.5rem;
`;

const AddMatchButton = styled(Button)`
  margin-top: 0.5rem;
  width: 2rem;
  align-self: flex-end;
`;

const InputField = styled(Input)`
  width: 16rem;
  font-size: 1rem;
`;

const TextArea = styled(TextAreaInput)`
  font-size: 0.8rem;
  width: 21rem;
  height: 7.9rem;
`;

const InputRow = styled(FlexDiv)`
  justify-content: flex-start;
`;

const InputLabel = styled(FlexDiv)`
  width: 5rem;
  justify-content: flex-start;
`;
