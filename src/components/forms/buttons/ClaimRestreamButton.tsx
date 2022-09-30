import React, { useState } from "react";
import { IconButton } from "../IconButton";
import styled from "styled-components";
import { IoLogoTwitch } from "react-icons/io";
import { ClaimRestreamModal } from "../../pages/schedule/ClaimRestreamModal";
import { Match } from "../../../domain/Match";

interface Props {
  match: Match;
  className?: string;
}

export const ClaimRestreamButton: React.FC<Props> = ({ match, className }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <IconButton
        label={match.restreamChannel ?? "Claim"}
        text="Claim"
        Icon={TwitchIcon}
        onClick={() => setShowModal(true)}
        color={"brightTwitchPurple"}
        className={className}
      />
      <ClaimRestreamModal match={match} visible={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

const TwitchIcon = styled(IoLogoTwitch)`
  transform: scale(1.2);
`;
