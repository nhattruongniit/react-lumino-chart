import React from 'react';
import styled from 'styled-components';

// components
// import ChartTab from './ChartTab';
// import ChartCarbon from './ChartCarbon';
import LuminoLayout from './LuminoLayout';

const ChartCenterPanel = () => {
  return (
    <div className="luminoArea">
       <LuminoLayout />

      {/* <ChartTab />
      <ContentStyled>
        <ChartCarbon />
      </ContentStyled> */}
    </div>
  );
};

export default ChartCenterPanel;

const ContentStyled = styled.div`
  flex-grow: 1;
  z-index: 9;
  display: flex;
  padding: 10px ;
  position: relative;
`;
