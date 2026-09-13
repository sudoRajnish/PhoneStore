import "./PasswordInput.css";

// Same visual language as TextField, for multi-line input (address, notes).
function TextAreaField({ id, label, value, onChange, error, placeholder, rows = 3 }) {
  return (
    <div className="form-field">
      <div className="form-field__row">
        <label htmlFor={id}>{label}</label>
      </div>

      <div className={`form-field__control form-field__control--textarea ${error ? "has-error" : ""}`}>
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </div>

      {error && (
        <span id={`${id}-error`} className="form-field__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export default TextAreaField;
