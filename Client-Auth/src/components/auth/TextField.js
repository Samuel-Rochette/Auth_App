import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        {...input}
        className="form-control"
        style={{ marginBottom: '5px' }}
      />
      <div className="error" style={{ marginBottom: '5px' }}>
        {touched && error}
      </div>
    </div>
  );
};
