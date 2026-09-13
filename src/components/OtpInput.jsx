import { useRef } from "react";
import "./OtpInput.css";

// Controlled 6-box OTP input. `value` is a plain string (e.g. "123" while
// typing, "123456" once complete); `onChange` receives the updated string.
function OtpInput({ value, onChange, length = 6, error, disabled }) {
  const inputRefs = useRef([]);
  const digits = value.padEnd(length, " ").split("").map((c) => (c === " " ? "" : c));

  const setDigit = (index, char) => {
    const next = digits.slice();
    next[index] = char;
    onChange(next.join("").trimEnd());
  };

  const handleChange = (index) => (event) => {
    const char = event.target.value.replace(/[^0-9]/g, "").slice(-1);
    setDigit(index, char);
    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index) => (event) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    const pasted = event.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length);
    if (!pasted) return;
    event.preventDefault();
    onChange(pasted);
    const lastIndex = Math.min(pasted.length, length) - 1;
    inputRefs.current[lastIndex]?.focus();
  };

  return (
    <div>
      <div className={`otp-input ${error ? "has-error" : ""}`} onPaste={handlePaste}>
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digits[index]}
            onChange={handleChange(index)}
            onKeyDown={handleKeyDown(index)}
            disabled={disabled}
            aria-label={`Digit ${index + 1} of ${length}`}
          />
        ))}
      </div>
      {error && (
        <span className="otp-input__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export default OtpInput;
