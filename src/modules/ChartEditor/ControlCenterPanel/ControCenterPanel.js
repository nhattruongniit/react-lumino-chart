import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { Button, Tooltip } from "@fluentui/react-components";
import { Rocket24Filled, Add24Filled } from "@fluentui/react-icons";

// components
import PlottedVariableList from './PlottedVariableList';
import ChartForm from './ChartForm';
import IconSimple from '../../../components/IconSimple';

// actions
import { openLauncher } from 'reducer/app.reducer';
import { addTab } from 'reducer/tabs.reducer';

// selectors
import { isLauncherOpenSelector } from 'selectors/app.selector';
import { currentTabSelector } from 'selectors/tabs.selector';

const ControlCenterPanel = () => {
  // states
  const [isExpand, setIsExpand] = useState(true);
  // hooks
  const dispatch = useDispatch();
  // selectors
  const isLauncherOpen = useSelector(isLauncherOpenSelector);
  const currentTab = useSelector(currentTabSelector);

  return (
    <ContainerStyled isExpand={isExpand}>
      <div>
        <Tooltip content="Open Launcher" relationship="label">
          <Button 
            icon={<Rocket24Filled />} 
            size="small" 
            shape="square"
            appearance='primary'
            className="button_launcher"
            disabled={isLauncherOpen}
            onClick={() => dispatch(openLauncher(true))}
          />
        </Tooltip>

        <Tooltip content="Add Tab" relationship="label">
          <Button 
            icon={<Add24Filled />} 
            size="small" 
            shape="square"
            onClick={() => dispatch(addTab())}
          />
        </Tooltip>

        <div className='mt-2'>
          <b>Tab Name:</b> {currentTab?.name || 'N/A>'}
        </div>
        
        
        <div className='sidebar_line' />
      </div>
      <div>
        <div className='sidebar_heading'>
          <span>CONTROL CENTRE</span>
          <IconStyled isExpand={isExpand} onClick={() => setIsExpand(prevState => !prevState)}>
            {isExpand ? <IconSimple icon="ic:baseline-close" width={18} /> : <IconSimple icon="ic:baseline-menu" width={18} />}
          </IconStyled>
        </div>

        <ChartForm />

        <PlottedVariableList />
      </div>
    </ContainerStyled>
  );
};

export default ControlCenterPanel;

const ContainerStyled = styled.div`
  width: ${props => props.isExpand ? '250px' : '35px'};
  padding: ${props => props.isExpand ? '5px' : '5px 0 0'};
  flex-shrink: 0;
  height: calc(100vh - 50px);
  border-right: 1px solid rgb(225, 223, 221);
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
      z-index: 1;
    }
  `}
`;

const IconStyled = styled.div`
  position: absolute;
  right: 0;
  top: ${props => props.isExpand ? '0' : '-60px'};;
  cursor: pointer;
  z-index: 2;
  width: ${props => props.isExpand ? 'auto' : '100%'};
`;
