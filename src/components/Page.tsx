import React from "react";
import styled from "styled-components";
import { FlexDiv } from "./divs/FlexDiv";
import { ScreenWidths } from "../GlobalStyle";

interface Props {
  width?: number | "100%";
}

export const Page: React.FC<Props> = ({ width, children }) => {
  return (
    <PageStyled id="page" $width={width || 1000}>
      {children}
    </PageStyled>
  );
};

const PageStyled = styled(FlexDiv)<{ $width: number | "100%" }>`
  width: ${({ $width }) => ($width === "100%" ? $width : `${$width}px`)};
  max-width: 90vw;
  flex-direction: column;
  justify-content: start;
  flex-grow: 1;

  @media (max-width: ${ScreenWidths.phone}px) {
    max-width: 95vw;
  }
`;
