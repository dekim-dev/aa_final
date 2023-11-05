import { TextField } from "@material-ui/core";
import styled, { css } from "styled-components";

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-input {
    height: 1.4rem;
  }
  & .MuiOutlinedInput-root {
    border-radius: 1rem;
    border: 0.4px;
  }
  & .MuiOutlinedInput-root:focus-within .MuiOutlinedInput-notchedOutline {
    border-color: gray;
  }
  & .MuiInputLabel-root.Mui-focused {
    color: #222222;
  }
  & .MuiFormHelperText-root {
    color: ${(props) => (props.isValid ? "black" : "red")};
  }

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
`;

const InputField = ({
  ref,
  name,
  label,
  placeholder,
  value,
  onChange,
  onKeyDown,
  helperText,
  type,
  width,
  height,
  isValid,
}) => {
  return (
    <>
      <StyledTextField
        ref={ref}
        name={name}
        label={label}
        placeholder={placeholder}
        variant="outlined"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        helperText={helperText}
        type={type}
        width={width}
        height={height}
        isValid={isValid}
      />
    </>
  );
};

export default InputField;
