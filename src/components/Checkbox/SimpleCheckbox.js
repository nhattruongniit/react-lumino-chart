import React from 'react';
import clsx from 'clsx';

export function SimpleCheckbox({ id = 'default', labelText = 'Checkbox', disabled, pointer = true, checked, bgColor, onChange }) {
  return (
    <div className={clsx(
      "checkboxField",
      !checked && 'noCheck',
      !pointer && 'noPointer'
    )}>
      <input id={id} type="checkbox" checked={checked} onChange={onChange} disabled={disabled} />
      <label
        htmlFor={id}
        className={clsx(
          bgColor && 'bgColor'
        )}
        style={{
          backgroundColor: bgColor || '#fff',
        }}
      >
        <span>{labelText}</span>
      </label>
    </div>
  )
}

