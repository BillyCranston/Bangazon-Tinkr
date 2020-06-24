import React from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';

const SuccessToast = (props) => {
  return (
    <div>
      <div className="p-3 bg-dark my-2 rounded">
        <Toast>
          <ToastHeader>
            Reactstrap
          </ToastHeader>
          <ToastBody>
            This is a toast on a dark background — check it out!
          </ToastBody>
        </Toast>
      </div>
    </div>
  );
};

export default SuccessToast;
