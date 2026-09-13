import "./PasswordInput.css";

// Generic labeled input, reused for the email field here and for other
// text fields (name, phone, etc.) on future pages like Register.
function TextField({ id, label, type = "text", value, onChange, error, placeholder, autoComplete, icon }) {
  return (
    <div className="form-field">
      <div className="form-field__row">
        <label htmlFor={id}>{label}</label>
      </div>

      <div className={`form-field__control ${error ? "has-error" : ""}`}>
        {icon}
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
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

export default TextField;
