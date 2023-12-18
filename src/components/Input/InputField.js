import React from 'react';
import clsx from 'clsx';
import { Icon } from '@iconify/react';

export function InputField({ label, icon, direction = 'row', width, ...props }) {
  return (
    <div
      className={clsx(
        "inputField_wrapper",
        direction === 'column' && 'inputField_wrapper_column',
      )}
      style={{
        width
      }}
    >
      {label && (
        <div className='inputField_label'>
         {label}
        </div>
      )}

      <div
        className='inputField_content'
        style={{
          backgroundColor: 'transparent'
        }}
      >
        {icon && <Icon icon={icon} width={20} />}
        <input {...props} />
      </div>

    </div>
  )
}
