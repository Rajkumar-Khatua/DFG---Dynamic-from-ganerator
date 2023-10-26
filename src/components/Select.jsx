const Select = ({ label, value, onChange, options, error }) => {
    return (
      <div className="form-field">
        <label>{label}</label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="type"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {error && <span className="error">{error}</span>}
      </div>
    );
  };
export default Select;  