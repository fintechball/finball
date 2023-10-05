import { message } from "antd";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

const Error = (message : string) => toast.error(message);
const Success = (message : string) => toast.success(message);
const Celebrate = (message : string) => toast(message, {
  icon: '🎉',
});
const Normal = (message : string) => toast(message);

function Toast() {
    return (
        <Toaster position="bottom-center" reverseOrder={false} 
        toastOptions={{
          className: '',
          style: {
            marginBottom : "60px"
          },
        }}
      />
    )
}

export default Toast;
export {Error, Success, Celebrate, Normal};