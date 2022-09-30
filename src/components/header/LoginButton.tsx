import React from "react";
import { RacetimeButton } from "../forms/buttons/RacetimeButton";
import styled from "styled-components";
import { websiteSettings } from "../../Settings";

export const LoginButton: React.FC = () => {
  return (
    <ButtonDiv>
      <RacetimeButton
        text={"Login with racetime.gg"}
        url={websiteSettings.LOGIN_URL}
        sameTab={true}
      >
        Login with racetime.gg
      </RacetimeButton>
    </ButtonDiv>
  );
};

const ButtonDiv = styled.div`
  margin: 0 0.6rem;
`;
