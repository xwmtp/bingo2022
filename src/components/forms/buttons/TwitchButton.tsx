import React from "react";
import styled from "styled-components";
import { IoLogoTwitch } from "react-icons/io";
import { IconUrlButton } from "../IconButton";

interface Props {
  text?: string;
  url?: string;
  label?: string;
  className?: string;
}

export const TwitchButton: React.FC<Props> = ({ text, url, label, className }) => {
  return (
    <IconUrlButton
      label={label}
      children={url}
      text={text}
      Icon={TwitchIcon}
      url={url}
      color={"twitchPurple"}
      className={className}
    />
  );
};

const TwitchIcon = styled(IoLogoTwitch)`
  transform: scale(1.2);
`;
