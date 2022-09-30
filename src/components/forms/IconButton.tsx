import React from "react";
import { UrlButton } from "./UrlButton";
import { FlexDiv, WideScreenOnlyFlexDiv } from "../divs/FlexDiv";
import styled from "styled-components";
import { Button } from "./Button";
import { ColorName } from "../../GlobalStyle";

interface ContentProps {
  Icon: React.FC;
  text?: string;
}

interface ButtonProps extends ContentProps {
  label?: string;
  color: ColorName;
  className?: string;
}

interface DefaultButtonProps extends ButtonProps {
  onClick?: () => void;
}

interface UrlButtonProps extends ButtonProps {
  url?: string;
}

export const IconButton: React.FC<DefaultButtonProps> = ({
  Icon,
  label,
  color,
  text,
  onClick,
  className,
}) => {
  return (
    <Button label={label} color={color} onClick={onClick} className={className}>
      <IconButtonContent Icon={Icon} text={text} />
    </Button>
  );
};

export const IconUrlButton: React.FC<UrlButtonProps> = ({
  Icon,
  label,
  color,
  text,
  url,
  className,
}) => {
  return (
    <UrlButton label={label} color={color} url={url} className={className}>
      <IconButtonContent Icon={Icon} text={text} />
    </UrlButton>
  );
};

const IconButtonContent: React.FC<ContentProps> = ({ Icon, text }) => {
  return (
    <FlexDiv>
      <Icon />
      {text && <WideScreenOnlyButtonText>{text}</WideScreenOnlyButtonText>}
    </FlexDiv>
  );
};

const WideScreenOnlyButtonText = styled(WideScreenOnlyFlexDiv)`
  margin-left: 0.35rem;
`;
