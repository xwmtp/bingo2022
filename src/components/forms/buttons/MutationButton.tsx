import React from "react";
import { Button, ButtonProps } from "../Button";
import { QueryStatus } from "react-query";
import styled from "styled-components";
import { Spinner } from "../../general/Spinner";
import { FlexDiv } from "../../divs/FlexDiv";

interface Props extends ButtonProps {
  mutationStatus: QueryStatus;
  onIdleText?: string;
}

export const MutationButton: React.FC<Props> = (props) => {
  const status = props.mutationStatus;

  const buttonDisabled = status === "loading";

  if (status === "loading") {
    return (
      <ButtonDiv className={props.className}>
        <Spinner />
      </ButtonDiv>
    );
  }

  if (status === "success") {
    return <ButtonDiv className={props.className} />;
  }

  return (
    <ButtonDiv className={props.className}>
      <ButtonStyled
        {...props}
        className={undefined}
        disabled={props.disabled}
        onClick={() => {
          if (!buttonDisabled && !props.disabled && props.onClick) {
            props.onClick();
          }
        }}
      >
        {status === "error" ? "Retry" : props.onIdleText || "Confirm"}
      </ButtonStyled>
    </ButtonDiv>
  );
};

const ButtonDiv = styled(FlexDiv)`
  min-width: 10rem;
  min-height: 3rem;
`;

const ButtonStyled = styled(Button)`
  flex-grow: 0;
`;
