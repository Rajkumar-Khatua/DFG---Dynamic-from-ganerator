const FileUpload = ({ label, value, onChange, error, allowedTypes, sizeLimit }) => {
    const validateFile = (file) => {
      if (!allowedTypes.includes(file.type)) {
        return `Invalid file type. Only ${allowedTypes.join(", ")} are allowed.`;
      }
      if (file.size > sizeLimit) {
        return `File size exceeds the limit of ${sizeLimit / 1024} KB.`;
      }
      return null;
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      const error = validateFile(file);
      if (!error) {
        onChange(file);
      } else {
        onChange(null);
        alert(error);
      }
    };
  
    return (
      <div className="form-field">
        <label>{label}</label>
        <input type="file" onChange={handleFileChange} />
        {value && <span className="file-name">{value.name}</span>}
        {error && <span className="error">{error}</span>}
      </div>
    );
  };

    export default FileUpload;