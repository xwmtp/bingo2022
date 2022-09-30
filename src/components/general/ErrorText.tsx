import React from "react";
import styled from "styled-components";
import { Colors } from "../../GlobalStyle";

interface Props {
  children: string;
}

export const ErrorText: React.FC<Props> = ({ children }) => {
  return <ErrorStyled>{children}</ErrorStyled>;
};

const ErrorStyled = styled.p`
  color: ${Colors.brightCoral};
  margin: 0.3rem 0;
`;
