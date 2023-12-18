import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

// components
import IconSimple from '../../../components/IconSimple';

// actions
import { addTab } from 'reducer/tabs.reducer';

// selectors
import { tabsSelector, activeTabIdSelector } from 'selectors/tabs.selector';

// components
import TabItem from './TabItem';

const ChartTab = () => {
  const dispatch = useDispatch();
  const tabs = useSelector(tabsSelector);
  const activeTabId = useSelector(activeTabIdSelector);

  const handleAddTab = useCallback(() => {
    dispatch(addTab());
  }, [dispatch]);

  return (
    <TabsContainer>
      {tabs.map((tabItem) => (
        <TabItem key={tabItem.id} id={tabItem.id} options={tabItem.options} name={tabItem.name} isActive={tabItem.id === activeTabId} />
      ))}
      <AddButton onClick={handleAddTab}>
        <IconSimple icon="ic:baseline-add" />
      </AddButton>
    </TabsContainer>
  );
};

export default ChartTab;

const TabsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  z-index: 50;
  border-bottom: 1px solid rgb(225, 223, 221);
  margin: 0 -10px;
`;

const AddButton = styled.div`
  min-width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    fill: #161616
  }
`;
