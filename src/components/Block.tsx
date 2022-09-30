import React from "react";
import styled from "styled-components";
import { FlexDiv } from "./divs/FlexDiv";
import { Colors, ScreenWidths } from "../GlobalStyle";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Block: React.FC<Props> = (props) => {
  return (
    <BlockStyled className={props.className} {...props}>
      {props.children}
    </BlockStyled>
  );
};

const BlockStyled = styled(FlexDiv)`
  justify-content: space-between;
  background-color: ${Colors.lightGrey};
  border-radius: 0.6rem;
  padding: 0.5rem 2rem;
  margin-top: 0.6rem;
  font-size: 1.1rem;

  @media (min-width: ${ScreenWidths.phone + 1}px) and (max-width: ${ScreenWidths.tablet}px) {
    padding: 0.6rem 1.2rem;
  }
`;
