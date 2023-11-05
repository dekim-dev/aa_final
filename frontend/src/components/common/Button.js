import { styled, css } from "styled-components";

const Button = styled.button`
  background-color: #ce3c3c;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-size: 1rem;
  font-weight: bold;
  justify-content: center;
  margin: 0;
  min-height: 3rem;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;

  &:hover,
  &:focus {
    background-color: #ce3c3c;
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  }

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    background-color: rgba(206, 60, 60, 0.5);
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    transform: translateY(0);
  }

  /* Use props to dynamically set styles */
  ${(props) =>
    props.width &&
    css`
      width: ${props.width};
    `}

  ${(props) =>
    props.height &&
    css`
      height: ${props.height};
    `}

  ${(props) =>
    props.fontSize &&
    css`
      font-size: ${props.fontSize};
    `}

  ${(props) =>
    props.padding &&
    css`
      padding: ${props.padding};
    `}
`;

export default Button;
