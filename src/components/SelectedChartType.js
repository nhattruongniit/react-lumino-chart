import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Dropdown, Option } from "@fluentui/react-components";

// components
// import { SimpleButton } from 'components/Button/SimpleButton';
// import { SimpleSelect } from 'components/Select/SimpleSelect';

// configs
import { CHART_TYPE } from 'configs/constant';

// reducers
import { setTabChartType } from 'reducer/tabs.reducer';

const options = [
  { value: '', text: 'Please choose...', disabled: true },
  { value: CHART_TYPE.PIE, text: CHART_TYPE.PIE },
  { value: CHART_TYPE.LINE, text: CHART_TYPE.LINE },
]

function SelectedChartType({ tabId }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const onSubmit = () => {
    if(value === '') return;
    dispatch(setTabChartType(tabId, value))
  }

  return (
    <>
      <div className='selectChart'>
        <label id="select-chart-type">Chart Type:</label>
        <Dropdown 
          size="small"
          placeholder='Please choose...'
          id="select-chart-type"
          defaultValue={value}
          onOptionSelect={(_, data) => {
            setValue(data.optionValue)
          }}
          className='capitalize'
        >
          {options.map((option) => (
            <Option key={option.value} value={option.value} disabled={option.disabled}>
              {option.text}
            </Option>
          ))}
        </Dropdown>
        <div className='ml-2'>
          <Button 
            size='small'
            appearance='primary'
            onClick={onSubmit}
            shape="square"
          >
            Submit
          </Button>
        </div>
        
      </div>
      {/* <SimpleSelect
        id="select-chart-type"
        label="Chart Type"
        defaultValue={value}
        options={options}
        onChange={(e) => setValue(e.target.value)}
        renderOption={item => (
          <option disabled={item.disabled} value={item.value}>{item.text}</option>
        )}
      /> */}
    </>
  )
}

export default SelectedChartType;

