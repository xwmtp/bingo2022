import React from "react";
import { ImageBlock } from "./ImageBlock";
import styled from "styled-components";

export const PreviousYears: React.FC = () => {
  return (
    <>
      <ImageBlockBottomMargin
        text={"2021"}
        url={"https://xwmtp.github.io/bingo2021/"}
        image={
          "https://raw.githubusercontent.com/xwmtp/bingo2022/assets/images/previousYears/2021/background_480p.png"
        }
      />
      <ImageBlock
        text={"2020"}
        url={"https://xwmtp.github.io/bingo2020/"}
        image={
          "https://raw.githubusercontent.com/xwmtp/bingo2022/assets/images/previousYears/2020/background_480p.png"
        }
      />
    </>
  );
};

const ImageBlockBottomMargin = styled(ImageBlock)`
  margin-bottom: 1.2rem;
`;
