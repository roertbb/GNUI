import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import theme from "../../theme";
import { setColor } from "../../utils/setcolor";
import { ToastContainer } from "react-toastify";
import { Button } from "../button";
import { Text } from "../text";
import { Heading } from "../heading";
import { darken } from "polished";
import "react-toastify/dist/ReactToastify.minimal.css";

export type ToastProps = {
  name?: string;
  heading?: string;
  severity?: "danger" | "notification" | "warning" | "success";
  closeToast?: (e: React.MouseEvent) => void;
};

export type MessageProps = {
  heading?: string;
  message?: string;
  closeToast?: (e: React.MouseEvent) => void;
};

const StyledToastContainer = styled.div<ToastProps>`
  .Toastify {
    &__toast {
      position: relative;
      max-width: 320px;
      font-weight: ${theme.fontWeights.medium};
      font-family: ${theme.fonts.body};
      font-size: ${theme.fontSizes.md};
      text-align: left;
      border-radius: ${theme.radiusDefault};
      padding: ${theme.spacing.spacing04};
      box-shadow: ${theme.shadow.shadow04};
      color: ${theme.color.text.invert};
      line-height: 1.5em;
      background-color: ${theme.color.interactive.info};

      ${({ severity }) =>
        severity &&
        css`
          background-color: ${setColor(severity)};
        `}

      p {
        margin: ${theme.spacing.spacing03} 0 0;
        font-size: ${theme.fontSizes.md};
        font-weight: ${theme.fontWeights.regular};
      }
    }
    &__progress-bar {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0.25rem;
      background-color: ${theme.color.interactive.infoActive};
      border-bottom-left-radius: ${theme.radiusDefault};
      border-bottom-right-radius: ${theme.radiusDefault};

      ${({ severity }) =>
        severity &&
        css`
          background-color: ${darken(0.1, setColor(severity))};
        `}
    }
  }
`;

const ToastTitle = styled.div<MessageProps>`
  display: flex;
  align-items: center;
  h5 {
    line-height: 1.5em;
    margin: 0;
    font-weight: ${theme.fontWeights.medium};
  }
  button {
    padding: 0;
    background-color: transparent;
    border: none;
    margin-left: auto;
    svg {
      fill: ${theme.color.text.invert};
    }
    &:focus {
      outline: none;
    }
    &:hover {
      background-color: transparent;

      svg {
        fill: ${theme.color.text.invert};
      }
    }
  }
`;

export const Message: FunctionComponent<MessageProps> = ({
  heading,
  message,
  closeToast,
}) => {
  return (
    <>
      <ToastTitle>
        <Heading level={5} color="white">
          {heading}
        </Heading>
        <Button
          severity="medium"
          icon="close"
          size="sm"
          onClick={closeToast}
        ></Button>
      </ToastTitle>
      {message && <Text>{message}</Text>}
    </>
  );
};

export const Toast: FunctionComponent<ToastProps> = ({ name, severity }) => {
  return (
    <StyledToastContainer id={name} severity={severity}>
      <ToastContainer closeButton={false} />
    </StyledToastContainer>
  );
};
