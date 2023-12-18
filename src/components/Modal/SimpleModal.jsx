import React from 'react';
import { Portal } from 'react-portal';
import { Icon } from '@iconify/react';

export function SimpleModal({
  open,
  modalHeading,
  primaryButtonText,
  onRequestClose,
  onRequestSubmit,
  danger,
  size,
  hideButtonBottom = false,
  children,
}) {
  return (
    <Portal>
      <div className={`modal ${open && 'is-visble'}`}>
        <div className={`modal_container ${size}`}>
          <div className='modal_header'>
            <h3>{modalHeading}</h3>
            <button type='button' onClick={onRequestClose}>
              <Icon icon="ic:baseline-close" width={20} />
            </button>
          </div>

          <div className='modal_body'>
            {children}
          </div>

          {hideButtonBottom && (
            <div className='modal_footer'>
              <button
                type='button'
                className='btnCancel'
                onClick={onRequestClose}
              >
                Cancel
              </button>
              <button
                type='button'
                className={`btnOk ${danger ? 'btnDanger' : ''}`}
                onClick={onRequestSubmit}
              >
                  {primaryButtonText}
              </button>
            </div>
          )}
        </div>
      </div>
    </Portal>
  )
}
