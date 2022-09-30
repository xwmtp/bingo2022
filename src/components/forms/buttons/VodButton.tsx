import React from "react";
import styled from "styled-components";
import { IconUrlButton } from "../IconButton";
import { MatchResult } from "../../../domain/Match";
import { IoLogoTwitch, IoLogoYoutube } from "react-icons/io";
import { MdOutlineLiveTv } from "react-icons/md";

interface Props {
  text?: string;
  matchResult: MatchResult;
  className?: string;
}

export const VodButton: React.FC<Props> = ({ text, matchResult, className }) => {
  let label =
    (matchResult.restreamChannel || "") +
    (matchResult.restreamer ? ` (hosted by ${matchResult.restreamer.name})` : "");

  if (label.trim() === "") {
    label = matchResult.vodUrl || "";
  }
  const Icon = getIcon(matchResult.vodUrl || "");

  return (
    <IconUrlButton
      label={label}
      text={text ?? "Vod"}
      Icon={Icon}
      url={matchResult?.vodUrl}
      color={"coral"}
      className={className}
    />
  );
};

const getIcon = (vodUrl: string) => {
  const url = vodUrl.toLowerCase();
  if (url.includes("youtu")) {
    return YoutubeIcon;
  }
  if (url.includes("twitch")) {
    return TwitchIcon;
  }
  return TvIcon;
};

const TwitchIcon = styled(IoLogoTwitch)`
  transform: scale(1.2);
`;

const YoutubeIcon = styled(IoLogoYoutube)`
  transform: scale(1.2);
`;

const TvIcon = styled(MdOutlineLiveTv)`
  transform: scale(1.2);
`;
