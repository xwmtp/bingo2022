import React, { useEffect, useState } from "react";
import { useUser } from "../../api/userApi";
import { isAdmin } from "../../domain/User";
import { NothingToDisplay } from "../../components/general/NothingToDisplay";
import { useAllEntrants } from "../../api/entrantsApi";
import { Container } from "../../components/Container";
import styled from "styled-components";
import { FlexDiv } from "../../components/divs/FlexDiv";
import { Margins } from "../../GlobalStyle";
import { PairsList } from "../../components/pages/pairing/PairsList";
import { Button } from "../../components/forms/Button";
import { mapToPairs, Pair } from "../../domain/Pair";
import { PairBlock } from "../../components/pages/pairing/PairBlock";
import { TextAreaInput } from "../../components/forms/TextAreaInput";
import { ErrorText } from "../../components/general/ErrorText";

export const PairingPage: React.FC = () => {
  const { data: user } = useUser();
  const { data: allEntrants } = useAllEntrants();

  const [numberOfVisiblePairs, setNumberOfVisiblePairs] = useState<number>(0);
  const [pairJsonInput, setPairJsonInput] = useState<string>();
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [isJsonError, setIsJsonError] = useState<boolean>(false);

  useEffect(() => {
    setIsJsonError(false);
    try {
      const rawPairs = pairJsonInput && JSON.parse(pairJsonInput);
      const pairs = rawPairs && allEntrants ? mapToPairs(rawPairs, allEntrants) : [];
      setPairs(pairs);
    } catch (error) {
      console.error("Could not parse json: " + error);
      setIsJsonError(true);
    }
  }, [allEntrants, pairJsonInput]);

  if (!user || !isAdmin(user)) {
    return (
      <Container>
        <NothingToDisplay>This page is admin only.</NothingToDisplay>
      </Container>
    );
  }

  if (!allEntrants) {
    return (
      <Container>
        <NothingToDisplay>No entrants found.</NothingToDisplay>
      </Container>
    );
  }

  const nextPair = pairs[numberOfVisiblePairs];

  return (
    <Page>
      <PairsContainer>
        <PairsList pairs={pairs} numberOfVisiblePairs={numberOfVisiblePairs} />
        {pairs.length === 0 && <NothingToDisplay>No pairs to display.</NothingToDisplay>}
      </PairsContainer>

      <ControlContainers>
        <ControlContainer>
          <FlexDiv>
            <ControlButton
              disabled={numberOfVisiblePairs === 0}
              color="coral"
              onClick={() => setNumberOfVisiblePairs(0)}
            >
              Hide all
            </ControlButton>
            <ControlButton
              disabled={!nextPair}
              color="brightMossGreen"
              onClick={() => setNumberOfVisiblePairs(pairs.length)}
            >
              Show all
            </ControlButton>
          </FlexDiv>

          <ControlButton
            disabled={!nextPair}
            color="jeansBlue"
            onClick={() =>
              setNumberOfVisiblePairs((prevState) => Math.min(prevState + 1, pairs.length))
            }
          >
            Next
          </ControlButton>

          {nextPair && <PairBlock pair={nextPair} isVisible={true} direction="column" />}
        </ControlContainer>

        <ControlContainer>
          <TextArea
            value={pairJsonInput}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPairJsonInput(event.target.value)
            }
            placeholder={"Pairs json"}
          />
          {isJsonError && <ErrorText>Invalid pair json input.</ErrorText>}
        </ControlContainer>
      </ControlContainers>
    </Page>
  );
};

const Page = styled(FlexDiv)`
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const PairsContainer = styled(Container)`
  margin-right: ${Margins.container}rem;
`;

const ControlContainers = styled(FlexDiv)`
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
`;

const ControlContainer = styled(Container)`
  width: auto;
  min-width: 25rem;
  margin: 0 1rem 1rem;
`;

const ControlButton = styled(Button)`
  margin-bottom: 2rem;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
`;

const TextArea = styled(TextAreaInput)`
  width: 100%;
  height: 20rem;
`;
