import React from 'react';
import clsx from 'clsx';
import { Icon } from '@iconify/react';

export function SimpleButton({ text, icon, className, kind, ...props }) {
  return (
    <button
      type='button'
      className={clsx(
        "buttonSimple",
        kind === 'secondary' && 'buttonSimple_secondary',
        kind === 'text' && 'buttonSimple_text',
        className,
      )}
      {...props}
      >
      <span>{text}</span>
      {icon && <Icon icon={icon} width={16} />}
    </button>
  )
}
