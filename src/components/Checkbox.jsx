const Checkbox = ({ label, value, onChange, error }) => {
    return (
      <div className="form-field">
        <label>{label}</label>
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        {error && <span className="error">{error}</span>}
      </div>
    );
  };

export default Checkbox;