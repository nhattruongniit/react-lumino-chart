import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

// components
import FluentCheckbox from 'components/Checkbox/FluentCheckbox';

// selectors
import { currentTabSelector } from 'selectors/tabs.selector';

const PlottedVariableList = () => {
  const currentTab = useSelector(currentTabSelector);

  return (
    <>
      <TitleStyled>Selected Variables / Sections</TitleStyled>
      <SelectedStyled>
        {currentTab?.plottedVariables.map((variable) => (
          <React.Fragment key={variable.id}>
            <FluentCheckboxStyled 
              defaultChecked
              id={`section-${variable.id.toString()}`}
              label={variable.full_name}
              pointer={false}
              bgColor={variable.bgColor}
              className="text-white"
            />
          </React.Fragment>
        ))}
      </SelectedStyled>
    </>
  );
};

export default PlottedVariableList;

const TitleStyled = styled.div`
  text-align: left;
  font-size: 12px;
  font-weight: bold;
  color: #161616;
  margin-top: 12px;
`;

const SelectedStyled = styled.div`
  width: 100%;
  height: calc(100vh - 195px);
  overflow-y: auto;
  font-size: 14px;
  margin-top: 10px;
  padding-right: 10px;
`;

const FluentCheckboxStyled = styled(FluentCheckbox)`
  label {
    font-size: 12px;
    line-height: 16px;
  }
`;