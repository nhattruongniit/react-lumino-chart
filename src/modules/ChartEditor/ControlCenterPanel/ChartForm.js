import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Dropdown, Option, Input, Button } from "@fluentui/react-components";

// configs
import * as CONSTANTS from 'configs/constant';

// components
// import { SimpleButton } from 'components/Button/SimpleButton';
// import { SimpleSelect } from 'components/Select/SimpleSelect';
// import { InputField } from 'components/Input/InputField';

// actions
import { submitForm, setDateLineChart, setDatePieChart, saveChart } from 'reducer/tabs.reducer';

// selectors
import { currentTabSelector } from 'selectors/tabs.selector';

const ChartForm = () => {
  const dispatch = useDispatch();
  const currentTab = useSelector(currentTabSelector);
  const showDatetime = currentTab?.chartType === CONSTANTS.CHART_TYPE.PIE || currentTab?.chartType === 'radar';

  console.log('currentTab: ', currentTab)

  return (
    <>
      <div>

        {currentTab?.chartType === CONSTANTS.CHART_TYPE.PIE && (
          <div className='flex items-center justify-between'>
            <label 
              id="select-variables-type"
              className='block text-small shrink-0'
              style={{ width: 38 }}
            >
              <b>Type</b>
            </label>
            <Dropdown 
              size="small"
              style={{ minWidth: '84%' }}
              id="select-variables-type"
              defaultValue="simple"
              onOptionSelect={(_, data) => {
                console.log('select-variables-type: ', data.optionValue)
              }}
              className='capitalize'
            >
              {CONSTANTS.CHART_FORM_TYPES.map(item => (
                { value: item, text: item }
              )).map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.text}
                </Option>
              ))}
            </Dropdown>
          </div>
          // <SimpleSelect
          //   id="select-variables-type"
          //   label="Type"
          //   options={CONSTANTS.CHART_FORM_TYPES.map(item => (
          //     { value: item, text: item }
          //   ))}
          //   onChange={(e) => console.log('select-variables-type: ', e.target.value)}
          //   renderOption={item => (
          //     <option value={item.value}>{item.text}</option>
          //   )}
          //   direction="column"
          //   width="25%"
          // />
        )}

        {showDatetime && (
          <>
            <div className='flex items-center justify-between'>
              <div className='my-2 text-small shrink-0' style={{ width: 38 }}><b>Date</b></div>
              <div className='chartForm flex items-center justify-between'>
                <Input 
                  size='small'
                  type="number"
                  placeholder="mm"
                  value={currentTab?.month}
                  onChange={(e) => dispatch(setDatePieChart('month', e.target.value, currentTab?.id))}
                  className="p-0 mr-2"
                />
                <Input 
                  size='small'
                  type="number"
                  placeholder="dd"
                  value={currentTab?.date}
                  onChange={(e) => dispatch(setDatePieChart('date', e.target.value, currentTab?.id))}
                  className="p-0"
                />
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <div className='my-2 text-small shrink-0' style={{ width: 38 }}><b>Time</b></div>
              <div className='chartForm flex items-center justify-between'>
                <Input 
                  size='small'
                  type="number"
                  placeholder="hh"
                  value={currentTab?.hour}
                  onChange={(e) => dispatch(setDatePieChart('hour', e.target.value, currentTab?.id))}
                  className="p-0 mr-2"
                />
                <Input 
                  size='small'
                  type="number"
                  placeholder="mm"
                  value={currentTab?.minute}
                  onChange={(e) => dispatch(setDatePieChart('minute', e.target.value, currentTab?.id))}
                  className="p-0"
                />
              </div>
            </div>
            {/* <InputField
              type="number"
              label="Date"
              placeholder="mm"
              direction='column'
              value={currentTab?.month}
              onChange={(e) => dispatch(setDatePieChart('month', e.target.value, currentTab?.id))}
              style={{
                height: 'auto',
              }}
              width="20%"
            /> */}

            {/* <InputField
              type="number"
              placeholder="dd"
              direction='column'
              value={currentTab?.date}
              onChange={(e) => dispatch(setDatePieChart('date', e.target.value, currentTab?.id))}
              style={{
                height: 'auto',
              }}
              width="20%"
            /> */}

            {/* <InputField
              type="number"
              placeholder="hh"
              label="Time"
              direction='column'
              value={currentTab?.hour}
              onChange={(e) => dispatch(setDatePieChart('hour', e.target.value, currentTab?.id))}
              style={{
                height: 'auto',
              }}
              width="20%"
            />

            <InputField
              type="number"
              placeholder="mm"
              direction='column'
              value={currentTab?.minute}
              onChange={(e) => dispatch(setDatePieChart('minute', e.target.value, currentTab?.id))}
              style={{
                height: 'auto',
              }}
              width="20%"
            /> */}
          </>
        )}

        {/* {currentTab?.chartType === CONSTANTS.CHART_TYPE.LINE && currentTab?.maxDate !== '' && currentTab?.minDate !== '' && (
          <>
            <DatePicker
              light
              id="chart-range"
              name="datePicker"
              datePickerType="range"
              dateFormat="d/m/Y"
              minDate={currentTab?.minDate}
              maxDate={currentTab?.maxDate}
              onChange={(dates) => {
                dispatch(setDateLineChart('startDate', dates[0], currentTab?.id));
                if (dates.length > 1) dispatch(setDateLineChart('endDate', dates[1], currentTab?.id));
              }}
            >
              <DatePickerInput id="chart-range-start" labelText="Start" value={moment(currentTab?.startDate).format('DD/MM/YYYY')} />
              <DatePickerInput id="chart-range-end" labelText="End" value={moment(currentTab?.endDate).format('DD/MM/YYYY')} />
            </DatePicker>
          </>
        )} */}

        {currentTab?.chartType === CONSTANTS.CHART_TYPE.LINE && (
          <div className='w-full'>
            <label id="select-line-step" className='block mb-2'><b>Units</b></label>
            <Dropdown 
              size="small"
              style={{ minWidth: '100%' }}
              id="select-line-step"
              defaultValue={currentTab?.steps}
              onOptionSelect={(_, data) => {
                dispatch(setDateLineChart('steps', data.optionValue, currentTab?.id))
              }}
              className='capitalize'
            >
              {CONSTANTS.CHART_FORM_STEPS.map(item => (
                { value: item, text: item }
              )).map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.text}
                </Option>
              ))}
            </Dropdown>
          </div>
          // <SimpleSelect
          //   id="select-line-step"
          //   label="Steps"
          //   defaultValue={currentTab?.steps}
          //   options={CONSTANTS.CHART_FORM_STEPS.map(item => (
          //     { value: item, text: item }
          //   ))}
          //   onChange={(e) => dispatch(setDateLineChart('steps', e.target.value, currentTab?.id))}
          //   renderOption={item => (
          //     <option value={item.value}>{item.text}</option>
          //   )}
          //   direction="column"
          //   width="35%"
          // />
        )}

      </div>
      {currentTab?.chartType === CONSTANTS.CHART_TYPE.LINE  && (
        <SectionStyled>
          <>
            <div className='w-full'>
              <label id="select-point-type" className='block mb-2'><b>Max Number of Data Points</b></label>
              <Dropdown 
                size='small'
                style={{ minWidth: '100%' }}
                id="select-point-type"
                defaultValue={CONSTANTS.CHART_FORM_POINTS[0]}
                onOptionSelect={(_, data) => {
                  console.log('data: ', data)
                  dispatch(setDateLineChart('maximumDatePoints', Number(data.optionValue), currentTab?.id))
                }}
                className='capitalize'
              >
                {CONSTANTS.CHART_FORM_POINTS.map(item => (
                  { value: item, text: item.toString() }
                )).map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.text}
                  </Option>
                ))}
              </Dropdown>
            </div>
            {/* <SimpleSelect
              id="select-point-type"
              label="Max Number of Data Points"
              defaultValue={CONSTANTS.CHART_FORM_POINTS[0]}
              options={CONSTANTS.CHART_FORM_POINTS.map(item => (
                { value: item, text: item }
              ))}
              onChange={(e) => dispatch(setDateLineChart('maximumDatePoints', Number(e.target.value), currentTab?.id))}
              renderOption={item => (
                <option value={item.value}>{item.text}</option>
              )}
              direction="column"
            /> */}
          </>
        </SectionStyled>
      )}
      
      <ActionField>

        <Button 
          size='small'
          shape="square"
          disabled={!(currentTab?.state?.chartValues?.length > 0)} 
          onClick={() => dispatch(saveChart())}
        >
          Save Chart
        </Button>
        <Button 
          size="small"
          shape="square"
          disabled={!currentTab || currentTab?.plottedVariables.length === 0 || currentTab?.chartType === ''} 
          appearance='primary'
          onClick={() => dispatch(submitForm(currentTab?.chartType))}
        >
          Apply
        </Button>

        {/* <SimpleButton
          text="Save Chart"
          kind="text"
          disabled={!(currentTab?.state?.chartValues?.length > 0)}
          onClick={() => dispatch(saveChart())}
        /> */}

        {/* <SimpleButton
          text="Apply"
          kind="text"
          disabled={currentTab?.chartType === ''}
          onClick={() => dispatch(submitForm(currentTab?.chartType))}
        /> */}

        {/* <SimpleButton
          text="Reset"
          kind="text"
          onClick={handleClear}
        /> */}
      </ActionField>
    </>
  );
};

export default ChartForm;

const SectionStyled = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;

const ActionField = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;

  button + button {
    margin-left: 10px;
  }
`;
