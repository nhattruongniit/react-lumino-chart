import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

// configs
// import { LINE_CHART_POINT } from 'configs/constant';

// components
import ControlCenterlPanel from './ControlCenterPanel';
import ChartCenterPanel from './ChartCenterPanel';
import VariablePanel from './VariablePanel';
import { SimpleModal } from 'components/Modal/SimpleModal';

// actions
import { setSaveChartModalVisibility } from 'reducer/chartValues.reducer';
import { loadChartData } from 'reducer/tabs.reducer';

// selectors
import { showModalSaveChartSelector } from 'selectors/chartValues.selector';
import { simulatorSelector } from 'selectors/simulator.selector';
import { variablesSelector } from 'selectors/variables.selector'; // real data variable

const ChartEditor = () => {
  const dispatch = useDispatch();
  const showModalSaveChart = useSelector(showModalSaveChartSelector);
  const simulator = useSelector(simulatorSelector);
  const variables = useSelector(variablesSelector);

  // load chart data
  useEffect(() => {
    if(variables.length > 0 && Object.keys(simulator).length > 0) {
      dispatch(loadChartData());
    }
  }, [simulator, variables])

  const closeModalSaveChart = () => {
    dispatch(setSaveChartModalVisibility(false))
  }

  return (
    <div className="chartEditor">

      <ControlCenterlPanel />

      <ChartCenterPanel />

      <VariablePanel />

      {showModalSaveChart && (
        <SimpleModal
          open
          modalHeading='Success'
          primaryButtonText="Ok"
          onRequestClose={closeModalSaveChart}
          hideButtonBottom
        >
          <div>
            You have saved chart successfully!
          </div>
        </SimpleModal>
      )}



      {/* <Portal>
        <ModalStyled>
          <Modal open size="xs" passiveModal modalHeading="Line chart">
            <br />
            <Select light inline defaultValue={dataPoint} id="select-chart-type" labelText="Select Chart" onChange={(e) => setDataPoint(e.target.value)}>
              <SelectItem text="Default" value={LINE_CHART_POINT.DEFAULT} />
              <SelectItem text="Large data-points" value={LINE_CHART_POINT.LARGE_DATA_POINTS} />
            </Select>
            <ButtonStyled>
              <SimpleButton
                text="Submit"
                onClick={onSubmit}
              />
            </ButtonStyled>
          </Modal>
        </ModalStyled>
      </Portal> */}
    </div>
  );
};

export default ChartEditor;

const ModalStyled = styled.div`
  .bx--modal-content {
    margin-bottom: 10px;
  }
`;

const ButtonStyled = styled.div`
  text-align: right;
  margin-top: 20px;
`;
