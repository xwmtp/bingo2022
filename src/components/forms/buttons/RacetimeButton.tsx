import React from "react";
import { UrlButton } from "../UrlButton";
import { ReactComponent as LogoRacetimeSvg } from "../../../assets/racetimeGG-favicon.svg";
import styled from "styled-components";
import { WideScreenOnly } from "../../divs/WideScreenOnly";

interface Props {
  text?: string;
  url?: string;
  sameTab?: boolean;
  className?: string;
}

export const RacetimeButton: React.FC<Props> = ({ text, url, sameTab, className }) => {
  return (
    <UrlButton
      disabled={!url}
      color={"racetimeDarkGrey"}
      url={url}
      sameTab={sameTab}
      className={className}
    >
      <RacetimeLogo />
      {text && <WideScreenOnlyButtonText>{text}</WideScreenOnlyButtonText>}
    </UrlButton>
  );
};

const WideScreenOnlyButtonText = styled(WideScreenOnly)`
  font-family: Roboto Slab, serif;
  color: white;
  margin-left: 0.3rem;
`;

const RacetimeLogo = styled(LogoRacetimeSvg)`
  height: 1rem;
  fill: white;
`;
