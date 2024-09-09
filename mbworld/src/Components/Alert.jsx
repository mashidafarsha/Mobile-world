import React from "react";
import { Alert } from "flowbite-react";
export function AlertComponent({ showAlert, onDismiss }) {
    return (
      <>
        {showAlert && (
          <Alert color="success" onDismiss={onDismiss}>
            <span className="font-medium">Success!</span> Product updated successfully.
          </Alert>
        )}
      </>
    );
  }
export default AlertComponent;
