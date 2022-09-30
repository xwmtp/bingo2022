import ModalExternal, { ModalProps } from "styled-react-modal";
import { Colors } from "../GlobalStyle";
import React from "react";
import styled from "styled-components";
import { Container } from "./Container";

interface Props extends ModalProps {
  onClose: () => void;
  modalTitle?: string;
}

export const Modal: React.FC<Props> = (props) => {
  return (
    <ModalStyled
      {...props}
      allowScroll={true}
      onBackgroundClick={props.onClose}
      onEscapeKeydown={props.onClose}
    >
      <ContainerStyled title={props.modalTitle} size="small" width={"700px"}>
        {props.children}
      </ContainerStyled>
    </ModalStyled>
  );
};

const ModalStyled = ModalExternal.styled`
  position: absolute;
  top: 15%;
  max-height: 75vh;
  border-radius: 0.6rem;
  padding: 1.2rem;
  overflow-y: auto;
  background-color: ${Colors.darkGrey};
`;

const ContainerStyled = styled(Container)`
  margin-bottom: 0;
  max-width: 85vw;
`;
