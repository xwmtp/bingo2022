import React, { useState } from "react";
import { Container } from "../../../Container";
import styled from "styled-components";
import { FlexDiv } from "../../../divs/FlexDiv";
import { Button } from "../../../forms/Button";
import { ConfirmSignupModal } from "./ConfirmSignupModal";

export const SignUp: React.FC = () => {
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);

  return (
    <Container>
      <SignUpDiv>
        <h4>Sign up for the 2022 OoT Bingo Tournament is now open! </h4>
        <SignupButton size="big" color={"brightMossGreen"} onClick={() => setShowSignUpModal(true)}>
          Sign up
        </SignupButton>
      </SignUpDiv>

      <ConfirmSignupModal visible={showSignUpModal} onClose={() => setShowSignUpModal(false)} />
    </Container>
  );
};

const SignUpDiv = styled(FlexDiv)`
  flex-direction: column;
`;

const SignupButton = styled(Button)`
  margin-top: 1rem;
`;
