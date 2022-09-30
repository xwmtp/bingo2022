import React from "react";
import styled from "styled-components";

export const Spinner: React.FC<{ size?: "normal" | "small" }> = ({ size }) => {
  if (size === "small") {
    return <SpinnerSmall />;
  }
  return <SpinnerRegular />;
};

const SpinnerRegular = styled.div`
  &,
  &:after {
    border-radius: 100%;
    width: 2.3rem;
    height: 2.3rem;
  }

  & {
    margin: auto;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    --spinner-thickness-normal: 0.45rem;
    border-top: var(--spinner-thickness-normal) solid rgba(154, 203, 185, 0.2);
    border-right: var(--spinner-thickness-normal) solid rgba(154, 203, 185, 0.2);
    border-bottom: var(--spinner-thickness-normal) solid rgba(154, 203, 185, 0.2);
    border-left: var(--spinner-thickness-normal) solid #9acbb9;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
  }

  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

const SpinnerSmall = styled(SpinnerRegular)`
  &,
  &:after {
    width: 1.5rem;
    height: 1.5rem;
  }

  & {
    --spinner-thickness-small: 0.3rem;
    border-top: var(--spinner-thickness-small) solid rgba(154, 203, 185, 0.2);
    border-right: var(--spinner-thickness-small) solid rgba(154, 203, 185, 0.2);
    border-bottom: var(--spinner-thickness-small) solid rgba(154, 203, 185, 0.2);
    border-left: var(--spinner-thickness-small) solid #9acbb9;
  }
`;
