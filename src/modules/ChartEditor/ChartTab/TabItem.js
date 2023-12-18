import React from 'react';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';

// components
import TabItemPopover from './TabItemPopover';
import PopoverButton from 'components/PopoverButton';
import IconSimple from '../../../components/IconSimple';

// actions
import { switchTab, closeTab } from 'reducer/tabs.reducer';

const TabItem = ({ id, name, options, isActive }) => {
  const dispatch = useDispatch();

  const handleSetActiveTab = () => {
    dispatch(switchTab(id));
  };

  const handleCloseTab = () => {
    dispatch(closeTab(id));
  };

  return (
    <TabItemContainerStyled isActive={isActive}>
      <PopoverButton
        popoverPosition="tabMenu"
        popoverHeight="auto"
        icon={<IconSimple icon="carbon:overflow-menu-vertical" width={15} />}
        content={<TabItemPopover tabId={id} options={options} />}
      />
      <TabNameStyled onClick={handleSetActiveTab}>{name}</TabNameStyled>
      <IconSimple icon="ic:baseline-close" width={15} onClick={handleCloseTab} />
    </TabItemContainerStyled>
  );
};

export default TabItem;

const TabItemContainerStyled = styled.div`
  position: relative;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 50px;
  height: 50px;
  min-width: 150px;
  cursor: pointer;
  ackground-color: var(--cds-layer-accent);

  ${(props) =>
    props.isActive &&
    css`
      z-index: 10;
      background-color: #fff;
      box-shadow: inset 0 -2px 0 0 var(--cds-border-interactive,#0f62fe);
      svg {
        fill: #161616
      }
    `}
`;

const TabNameStyled = styled.div`
  text-align: center;
  flex-grow: 1;
  align-self: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #161616;
`;
