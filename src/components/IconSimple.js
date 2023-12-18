import React from 'react'
import clsx from 'clsx';
import { Icon } from '@iconify/react';

function IconSimple({ icon, className, ...props }) {
  return (
    <Icon 
      width={20} 
      icon={icon} 
      className={clsx(
        "cursor-pointer",
        className
      )}
      {...props}
    />
  )
}

export default IconSimple