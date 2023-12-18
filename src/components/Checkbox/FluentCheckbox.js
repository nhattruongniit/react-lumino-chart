import React from 'react';
import clsx from 'clsx';
import { Checkbox } from "@fluentui/react-components";

function FluentCheckbox({ bgColor, pointer, className, ...props }) {
  return (
    <div 
      className={clsx(
        className,
      )}
      style={{ 
        backgroundColor: bgColor || '#fff'
      }}
   >
      <Checkbox 
        {...props}
      />
    </div>
  )
}

export default FluentCheckbox