import styled from "styled-components";
import React from "react";
import { ColorName, Colors } from "../../GlobalStyle";

export interface ButtonProps extends ButtonLayoutProps {
  label?: string;
  onClick?: () => void;
  href?: string;
  sameTab?: boolean;
  className?: string;
}

export interface ButtonLayoutProps {
  color?: ColorName;
  size?: ButtonSize;
  disabled?: boolean;
}

type ButtonSize = "normal" | "big";

export const Button: React.FC<ButtonProps> = ({
  disabled,
  label,
  onClick,
  href,
  sameTab,
  children,
  className,
  color,
  size,
}) => {
  let ButtonStyled = DefaultButton;
  if (disabled) {
    ButtonStyled = DisabledButton;
  }
  return (
    <ButtonStyled
      title={label}
      color={color}
      size={size}
      onClick={onClick}
      href={href}
      target={sameTab ? undefined : "_blank"}
      className={className}
    >
      {children}
    </ButtonStyled>
  );
};

const DefaultButton = styled.a<ButtonLayoutProps>`
  background-color: ${({ color }) => {
    return color ? Colors[color] : "black";
  }};
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: ${({ size }) => height(size || "normal")}rem;
  justify-content: center;
  flex-grow: 1;
  font-size: ${({ size }) => fontSize(size || "normal")}rem;
  padding: 0.3rem 0.6rem;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: 0.1s;

  &:active {
    opacity: 0.7;
  }
`;

const DisabledButton = styled(DefaultButton)`
  --disabled-opacity: 0.3;
  opacity: var(--disabled-opacity);
  cursor: default;

  &:active {
    opacity: var(--disabled-opacity);
  }
`;

// in rem
const fontSize = (size: ButtonSize): number => {
  if (size === "normal") {
    return 0.9;
  }
  if (size === "big") {
    return 1.3;
  }
  return 0.9;
};

// in rem
const height = (size: ButtonSize): number => {
  if (size === "normal") {
    return 1.8;
  }
  if (size === "big") {
    return 2.5;
  }
  return 1.8;
};
