import React from "react";
import styled from "styled-components";
import { FlexDiv } from "../../divs/FlexDiv";
import { Colors } from "../../../GlobalStyle";

interface Props {
  url: string;
  image: string;
  text: string;
  className?: string;
}

export const ImageBlock: React.FC<Props> = ({ url, image, text, className }) => {
  return (
    <a href={url} target={"_blank"} rel="noreferrer">
      <ImageBlockStyled image={image} className={className}>
        <h2>{text}</h2>
      </ImageBlockStyled>
    </a>
  );
};

const ImageBlockStyled = styled(FlexDiv)<{ image: string }>`
  flex-grow: 1;
  aspect-ratio: 1.3;
  border: 0.12rem solid ${Colors.lightGrey};
  border-radius: 0.6rem;
  box-shadow: 0.3rem 0.3rem 0.3rem ${Colors.darkGrey};
  position: relative;
  background-image: url(${({ image }) => image});
  background-position: center;
`;
