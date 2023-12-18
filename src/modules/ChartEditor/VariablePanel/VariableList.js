import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

// components
import FluentCheckbox from 'components/Checkbox/FluentCheckbox';

// selector
import { variablesSelector } from 'selectors/variables.selector'; // real data variable
import { currentTabSelector } from 'selectors/tabs.selector';

const VariablePanel = ({ handleToggleVariable }) => {
  const variables = useSelector(variablesSelector);
  const currentTab = useSelector(currentTabSelector);

  if(!currentTab) return null;

  return (
    <VariableStyled key={currentTab.id}>
      {variables.length > 0 ? (
        variables.map((variable) => {
          return (
            <React.Fragment key={variable.id}>
              <FluentCheckboxStyled 
                id={`variable-panel-checkbox-${variable.id.toString()}`}
                label={variable.full_name}
                defaultChecked={currentTab.selectedPlottedVariable[variable.id]}
                onChange={() => handleToggleVariable(variable.id)}
              />
            </React.Fragment>
          );
        })) : (
          <span className="bx-text-default">No available variable</span>
        )
      }
    </VariableStyled>
  );
};

export default VariablePanel;

const VariableStyled = styled.div`
  width: 100%;
  height: calc(100vh - 220px);
  overflow-y: auto;
  font-size: 12px;
  margin: 20px 0 15px 0;

  & > div + div {
    margin-bottom: 5px;
  }
`;

const FluentCheckboxStyled = styled(FluentCheckbox)`
  label {
    font-size: 12px;
    line-height: 16px;
  }
`;