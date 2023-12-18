import React from 'react';
import styled, { css } from 'styled-components';
import { Dropdown, Option } from "@fluentui/react-components";

// components
import { SimpleSelect } from 'components/Select/SimpleSelect';

export default function SelectPage({ pages, activePage, setActivePage}) {

  const handlePreviousPage = () => {
    if (activePage > 0) setActivePage(activePage - 1);
  };

  const handleNextPage = () => {
    if (activePage < pages.length - 1) setActivePage(activePage + 1);
  };

  return (
    <ContainerStyled>
      <ArrowStyled onClick={handlePreviousPage}>
        <ButtonStyled direction="left" type="button" />
      </ArrowStyled>
      <SelectStyled>
        <Dropdown 
          size="small"
          style={{ minWidth: '100%' }}
          id="select-pages-line-chart"
          value={pages[activePage]}
          onOptionSelect={(_, data) => {
            setActivePage(Number(data.optionValue))
          }}
        >
          {pages.map((name, index) => (
            { value: index, text: name }
          )).map((option) => (
            <Option key={option.value} value={option.value}>
              {option.text}
            </Option>
          ))}
        </Dropdown>

        {/* <SimpleSelect
          id="select-units"
          options={pages}
          value={pages[activePage]}
          onChange={e => setActivePage(Number(e.target.value))}
          renderOption={item => (
            <option value={item}>{item}</option>
          )}
          direction="column"
        /> */}
      </SelectStyled>
      <ArrowStyled onClick={handleNextPage}>
        <ButtonStyled direction="right" type="button" />
      </ArrowStyled>
    </ContainerStyled>
  );
}

const ContainerStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  width: 200px;
  margin: 0 auto;
`;

const SelectStyled = styled.div`
  border-top: 1px solid #dfe3e6;
  border-bottom: 1px solid #dfe3e6;
  width: 60%;
`;

const ArrowStyled = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #dfe3e6;
  width: 40px;
  justify-content: center;
  cursor: pointer;
`;

const ButtonStyled = styled.button`
  border: solid #76818a;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 4px;
  background-color: transparent;
  outline: 0;
  cursor: pointer;

  ${(props) =>
    props.direction === 'left' &&
    css`
      transform: rotate(135deg);
      -webkit-transform: rotate(135deg);
    `}

  ${(props) =>
    props.direction === 'right' &&
    css`
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
    `}
`;
