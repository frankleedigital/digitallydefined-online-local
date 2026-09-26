import React from 'react';
import DDLabel from './DDLabel';

/**
 * DDInput — flat brutalist form control. 1px #111, 0 radius, DM Sans.
 */
export default function DDInput({ label, value, onChange, type = 'text', placeholder, required, error, hint, className = '', ...rest }) {
  return (
    <div className={`dd-field ${className}`.trim()}>
      {label ? <DDLabel as="label">{label}</DDLabel> : null}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="dd-input"
        {...rest}
      />
      {hint && !error ? <small className="dd-hint">{hint}</small> : null}
      {error ? <small className="dd-error" role="alert">{error}</small> : null}
    </div>
  );
}