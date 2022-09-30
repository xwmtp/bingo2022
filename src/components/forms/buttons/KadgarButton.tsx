import React from "react";
import styled from "styled-components";
import { MdOutlineLiveTv } from "react-icons/md";
import { IconUrlButton } from "../IconButton";
import { User } from "../../../domain/User";
import { extractTwitchChannel } from "../../../lib/urlHelpers";

interface Props {
  users: User[];
  text?: string;
  className?: string;
}

export const KadgarButton: React.FC<Props> = ({ users, text, className }) => {
  const twitchChannels = users
    .map((user) => extractTwitchChannel(user.twitchChannel ?? ""))
    .filter((twitchChannel): twitchChannel is string => !!twitchChannel);

  const url =
    twitchChannels.length > 0 ? "https://kadgar.net/live/" + twitchChannels.join("/") : undefined;

  return (
    <IconUrlButton
      text={text ?? "Kadgar"}
      Icon={KadgarIcon}
      url={url}
      color={"jeansBlue"}
      className={className}
    />
  );
};

const KadgarIcon = styled(MdOutlineLiveTv)`
  transform: scale(1.2);
`;
