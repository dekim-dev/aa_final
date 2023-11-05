import styled from "styled-components";
import { Link } from "react-router-dom";
import LogoSVG from "../../assets/images/aa_logo.svg";
import SymbolSVG from "../../assets/images/aa_symbol.svg";

const StyledImage = styled.img`
  width: ${(props) => props.width || "8rem"};
  height: ${(props) => props.height || "8rem"};
`;

const Logo = ({ width, height }) => {
  return (
    <Link to="/">
      <StyledImage src={LogoSVG} alt="logo" width={width} height={height} />
    </Link>
  );
};

const Symbol = ({ width, height }) => {
  return (
    <Link to="/">
      <StyledImage src={SymbolSVG} alt="logo" width={width} height={height} />
    </Link>
  );
};

export { Logo, Symbol };
