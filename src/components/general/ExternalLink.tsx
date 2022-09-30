import React from "react";
import styled from "styled-components";
import { ColorName, Colors } from "../../GlobalStyle";

interface Props {
  url: string;
  children: React.ReactNode;
  color?: ColorName;
  className?: string;
}

export const ExternalLink: React.FC<Props> = ({ url, color, children, className }) => {
  return (
    <UrlLink
      className={className}
      $color={color}
      href={url}
      target={"_blank"}
      rel="noopener noreferrer"
    >
      {children}
    </UrlLink>
  );
};

const UrlLink = styled.a<{ $color?: ColorName }>`
  font-weight: bold;
  color: ${({ $color }) => ($color ? Colors[$color] : Colors.brighterMossGreen)};
`;
