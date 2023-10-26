const Textarea = ({ label, value, onChange, error }) => {
    return (
      <div className="form-field">
        <label>{label}</label>
        <textarea value={value} onChange={(e) => onChange(e.target.value)} />
        {error && <span className="error">{error}</span>}
      </div>
    );
  };
export default Textarea;  