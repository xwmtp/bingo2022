import React from "react";
import { User } from "../domain/User";
import styled from "styled-components";
import { Avatar } from "./Avatar";
import { truncateString } from "../lib/stringHelpers";
import { FlexDiv } from "./divs/FlexDiv";
import { WideScreenOnly } from "./divs/WideScreenOnly";

type Size = "huge" | "big" | "normal" | "small";

interface Props {
  user: User;
  size?: Size;
  removeNamePadding?: boolean;
  wideScreenOnlyAvatar?: boolean;
  wideScreenOnlyName?: boolean;
  className?: string;
}

export const UserDisplay: React.FC<Props> = ({
                                               user,
                                               size,
                                               wideScreenOnlyAvatar,
                                               wideScreenOnlyName,
                                               removeNamePadding,
                                               className
                                             }) => {
  const sizes = sizeSettings[size || "normal"];
  const AvatarWrapper = wideScreenOnlyAvatar ? WideScreenOnly : React.Fragment;
  const NameWrapper = wideScreenOnlyName ? WideScreenOnly : React.Fragment;
  const EmptySpaceWrapper =
    wideScreenOnlyAvatar || wideScreenOnlyName ? WideScreenOnly : React.Fragment;

  return (
    <UserStyled className={className}>
      <AvatarWrapper>
        <Avatar user={user} sizeRem={sizes.avatar} />
      </AvatarWrapper>

      <EmptySpaceWrapper>
        <EmptySpace $width={sizes.avatar * 0.375} />
      </EmptySpaceWrapper>

      <NameWrapper>
        <Name $fontSize={sizes.font} $removeNamePadding={removeNamePadding}>
          {truncateString(user?.name || "", 18)}
        </Name>
      </NameWrapper>
    </UserStyled>
  );
};

const sizeSettings: {
  [size in Size]: { avatar: number; font: number };
} = {
  huge: {
    avatar: 3,
    font: 1.5
  },
  big: {
    avatar: 2.1,
    font: 1
  },
  normal: {
    avatar: 1.6,
    font: 1
  },
  small: {
    avatar: 1.4,
    font: 0.85
  }
};

const EmptySpace = styled.div<{ $width: number }>`
  flex-shrink: 0;
  width: ${({ $width }) => $width}rem;
`;

const UserStyled = styled(FlexDiv)`
  justify-content: start;
  min-width: 0;
`;

const Name = styled.p<{ $fontSize: number; $removeNamePadding?: boolean }>`
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${({ $fontSize }) => $fontSize}rem;
  min-width: ${({ $removeNamePadding, $fontSize }) =>
          $removeNamePadding ? "1rem" : `${$fontSize * 10}rem`};
`;
