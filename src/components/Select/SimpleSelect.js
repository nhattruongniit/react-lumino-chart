import React from 'react';
import clsx from 'clsx';

export function SimpleSelect({ options = [], renderOption, label, className, direction = 'row', isDefaultAll = false, width, ...props }) {
  return (
    <div
      className={clsx(
        "select_wrapper",
        direction === 'column' && 'select_wrapper_column',
      )}
      style={{
        width
      }}
    >
      {label && <label>{label}</label>}
      <select
        className={clsx(
          "select_input",
          className,
        )}
        {...props}
      >
        {isDefaultAll && <option value="all">All</option>}
        {options.map((item, index) => (
          <React.Fragment key={index}>{renderOption && renderOption(item)}</React.Fragment>
        ))}
      </select>
    </div>
  )
}
