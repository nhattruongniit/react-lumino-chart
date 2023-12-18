import React from 'react';
import styled from 'styled-components';

// assets
import LogoImage from 'assets/images/logo.svg';

// components
import Heading from './Heading';

export default function Header() {
  return (
    <HeaderStyled>
      <HeaderLogo>
        <img src={LogoImage} alt="Logo" title="Logo" />
        <Heading text="CHART EDITOR" />
      </HeaderLogo>
    </HeaderStyled>
  );
}

const HeaderStyled = styled.div`
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgb(225, 223, 221);
  padding-right: 10px;
`;

const HeaderLogo = styled.div`
  padding-left: 5.5px;
  padding-right: 5.5px;
  margin-right: 25px;
  display: flex;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
`;

const ThemeStyled = styled.div`
  cursor: pointer;
`
