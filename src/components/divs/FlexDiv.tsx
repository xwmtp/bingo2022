import styled from "styled-components";
import React from "react";
import { WideScreenOnly } from "./WideScreenOnly";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const FlexDiv: React.FC<Props> = (props) => {
  return (
    <CenteredFlexDiv className={props.className} {...props}>
      {props.children}
    </CenteredFlexDiv>
  );
};

export const WideScreenOnlyFlexDiv: React.FC<Props> = (props) => {
  return (
    <CenteredWideScreenOnlyDiv className={props.className} {...props}>
      {props.children}
    </CenteredWideScreenOnlyDiv>
  );
};

const CenteredFlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CenteredWideScreenOnlyDiv = styled(WideScreenOnly)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
