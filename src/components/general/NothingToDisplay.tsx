import styled from "styled-components";
import { FlexDiv } from "../divs/FlexDiv";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export const NothingToDisplay: React.FC<Props> = ({ children }) => {
  return <NothingToDisplayStyled>{children}</NothingToDisplayStyled>;
};

const NothingToDisplayStyled = styled(FlexDiv)`
  margin: 0.6rem 0;
`;
