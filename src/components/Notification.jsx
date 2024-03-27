import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = ({ timeAndSpaceComplexity }) => {
  const handleClose = () => {
    toast.dismiss();
  };

  return (
    <div>
      <div>{timeAndSpaceComplexity}</div>
      <button
        onClick={handleClose}
        style={{ borderRadius: "8px", fontWeight: "bold" }}
      >
        Close
      </button>
    </div>
  );
};

export default Notification;
