const Radio = ({ label, value, onChange, options, error }) => {
    return (
      <div className="form-field">
        <label>{label}</label>
        {options.map((option) => (
          <div key={option} className="radio-option">
            <input
              type="radio"
              name={label}
              value={option}
              checked={value === option}
              onChange={(e) => onChange(e.target.value)}
            />
            <span>{option}</span>
          </div>
        ))}
        {error && <span className="error">{error}</span>}
      </div>
    );
  };

export default Radio;