import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { Dropdown, Option } from "@fluentui/react-components";

// components
import VariableList from './VariableList';
import IconSimple from '../../../components/IconSimple';
// import { SimpleSelect } from 'components/Select/SimpleSelect';

// actions
import { setFilter, resetFilter, togglePlottedVariable } from 'reducer/variables.reducer';

// selector
import { unitsSelector } from 'selectors/variables.selector';
import { simulatorSelector } from 'selectors/simulator.selector';
import { InputField } from 'components/Input/InputField';

// run mockData
import { APP_ENV } from '../../../App';

const steps = ['all', 'detailed', 'timestep', 'hourly', 'daily', 'monthly', 'runperiod', 'environment', 'annual'];
const optionsUnits = ['C', 'hr']

const VariablePanel = () => {
  const dispatch = useDispatch();
  const units = APP_ENV === 'localhost' ? optionsUnits : useSelector(unitsSelector);
  const simulator = useSelector(simulatorSelector);
  const [isExpand, setIsExpand] = useState(true);

  const onSearch = (value) => {
    if (value.trim() === '') {
      dispatch(resetFilter());
      return;
    }
    dispatch(setFilter('keyword', value));
  };

  const onFilter = (value, type) => {
    if (value === 'all') {
      dispatch(resetFilter());
      return;
    }

    dispatch(setFilter(type, value));
  };

  const handleToggleVariable = (variableId) => {
    dispatch(togglePlottedVariable(variableId));
  };

  return (
    <ContainerStyled isExpand={isExpand}>
      <div className='sidebar_heading'>
        <span>VARIABLES</span>
        <IconStyled isExpand={isExpand} onClick={() => setIsExpand(prevState => !prevState)}>
          {isExpand ? <IconSimple icon="ic:baseline-close" width={18} /> : <IconSimple icon="ic:baseline-menu" width={18} />}
        </IconStyled>
      </div>

      <FilterStyled>
        <div className='selectVariables'>
          <label id="select-variables-step"><b>Step</b></label>
          <Dropdown 
            size='small'
            style={{ minWidth: '100%' }}
            id="select-variables-step"
            defaultValue="all"
            onOptionSelect={(_, data) => {
              onFilter(data.optionValue, 'step')
            }}
          >
            {steps.map(step => (
              { value: step, text: step }
            )).map((option) => (
              <Option key={option.value} value={option.value}>
                {option.text}
              </Option>
            ))}
          </Dropdown>
        </div>
        <div className='selectVariables'>
          <label id="select-variables-units"><b>Units</b></label>
          <Dropdown 
            size="small"
            style={{ minWidth: '100%' }}
            id="select-variables-units"
            defaultValue="all"
            onOptionSelect={(_, data) => {
              onFilter(data.optionValue, 'units')
            }}
          >
            <Option value='all'>
              All
            </Option>
            {units.map(unit => (
              { value: unit, text: unit }
            )).map((option) => (
              <Option key={option.value} value={option.value}>
                {option.text}
              </Option>
            ))}
          </Dropdown>
        </div>
       
        {/* <SimpleSelect
          id="select-variables-step"
          label="Step"
          options={steps.map(step => (
            { value: step, text: step }
          ))}
          onChange={(e) => {
            console.log('step', e)
            onFilter(e, 'step')
          }}
          renderOption={item => (
            <option value={item.value}>{item.text}</option>
          )}
          direction="column"
        /> */}

        {/* <SimpleSelect
          id="select-variables-units"
          label="Units"
          isDefaultAll
          options={units.map(unit => (
            { value: unit, text: unit }
          ))}
          onChange={(e) => onFilter(e, 'units')}
          renderOption={item => (
            <option value={item.value}>{item.text}</option>
          )}
          direction="column"
        /> */}

      </FilterStyled>
      <br />

      <InputField
        icon="ic:outline-search"
        type="text"
        placeholder="Search"
        onChange={(e) => onSearch(e.target.value)}
      />

      <SimulationNameStyled>{simulator.simulation_name}</SimulationNameStyled>

      <VariableList handleToggleVariable={handleToggleVariable} />

    </ContainerStyled>
  );
};

export default VariablePanel;

const ContainerStyled = styled.div`
  width: ${props => props.isExpand ? '400px' : '50px'};
  padding: ${props => props.isExpand ? '5px' : '5px 0 0'};
  height: calc(100vh - 50px);
  border-left: 1px solid rgb(225, 223, 221);
  z-index: 1;
  position: relative;
  overflow: hidden;

  ${props => !props.isExpand && css `
    &:before {
      content: '';
      background-color: #fff;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      position: absolute;
      z-index: 3;
    }
  `}
`;

const IconStyled = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  z-index: 4;
  width: ${props => props.isExpand ? 'auto' : '100%'};
`;

const FilterStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SimulationNameStyled = styled.div`
  font-weight: bold;
  margin-top: 20px;
`
