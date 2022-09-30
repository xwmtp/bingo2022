import React from "react";
import { TwitchButton } from "./TwitchButton";
import { User } from "../../../domain/User";

interface Props {
  restreamer?: User;
  restreamChannel?: string;
  className?: string;
}

export const RestreamButton: React.FC<Props> = ({ restreamer, restreamChannel, className }) => {
  const label = (restreamChannel || "") + (restreamer ? ` (hosted by ${restreamer.name})` : "");
  return <TwitchButton label={label} text="Restream" url={restreamChannel} className={className} />;
};
