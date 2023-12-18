import React from 'react';
import { Portal } from 'react-portal';

const DefaultPage = ({ message }) => {
  return (
    <Portal>
      <div className='loading_wrapper'>
        {message && <div className='loading_message'>{message}</div>}
        <div className='loading_overlay'>
        <div className="loading_ring"></div>
        </div>
      </div>
    </Portal>
  );
};

export default DefaultPage;
