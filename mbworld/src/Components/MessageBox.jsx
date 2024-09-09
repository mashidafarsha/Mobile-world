import React from 'react';

const MessageBox = ({ message, type, onClose }) => {
  const boxStyles = {
    padding: '1rem',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const successStyles = {
    ...boxStyles,
    backgroundColor: '#D4EDDA',
    color: '#155724',
    border: '1px solid #C3E6CB',
  };

  const errorStyles = {
    ...boxStyles,
    backgroundColor: '#F8D7DA',
    color: '#721C24',
    border: '1px solid #F5C6CB',
  };

  const styles = type === 'success' ? successStyles : errorStyles;

  return (
    <div style={styles}>
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'inherit',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        &times;
      </button>
    </div>
  );
};

export default MessageBox;

