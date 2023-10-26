// Import React and useState hook
import React, { useState } from "react";
import "./App.css";

// Define a custom component for each form field type
const TextField = ({ label, value, onChange, error }) => {
  return (
    <div className="form-field">
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
};

const TextArea = ({ label, value, onChange, error }) => {
  return (
    <div className="form-field">
      <label>{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} />
      {error && <span className="error">{error}</span>}
    </div>
  );
};

const Dropdown = ({ label, value, onChange, options, error }) => {
  return (
    <div className="form-field">
      <label>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="type">
        {options.map((option) => (
          <option key={option} value={option} >
            {option}
          </option>
        ))}
      </select>
      {error && <span className="error">{error}</span>}
    </div>
  );
};

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

// Define a custom component for file upload fields
const FileUpload = ({ label, value, onChange, error }) => {
  // Define the allowed file types and size limit (in bytes)
  const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
  const sizeLimit = 1024 * 1024; // 1 MB

  // Define a helper function to validate the file
  const validateFile = (file) => {
    // Check if the file type is allowed
    if (!allowedTypes.includes(file.type)) {
      return `Invalid file type. Only ${allowedTypes.join(", ")} are allowed.`;
    }
    // Check if the file size is within the limit
    if (file.size > sizeLimit) {
      return `File size exceeds the limit of ${sizeLimit / 1024} KB.`;
    }
    // No error
    return null;
  };

  // Define a helper function to handle file change event
  const handleFileChange = (e) => {
    // Get the selected file from the input element
    const file = e.target.files[0];
    // Validate the file
    const error = validateFile(file);
    // If no error, set the value to the file object
    // Otherwise, set the value to null and show the error message
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

// Define a custom component for form field configuration
const FieldConfig = ({ index, config, onConfigChange, onConfigRemove }) => {
  // Define a helper function to handle config change event
  const handleConfigChange = (key, value) => {
    // Create a new config object with the updated key-value pair
    const newConfig = { ...config, [key]: value };
    // Invoke the onConfigChange callback with the new config object
    onConfigChange(newConfig);
  };

  return (
    <div className="field-config">
      <h4>Field {index + 1}</h4>
      <TextField
        label="Label"
        value={config.label}
        onChange={(value) => handleConfigChange("label", value)}
      />
      <Dropdown
        label="Type"
        value={config.type}
        onChange={(value) => handleConfigChange("type", value)}
        options={[
          "text input",
          "text area",
          "dropdown",
          "checkbox",
          "radio button",
          "file upload",
        ]}
      />
      {config.type === "dropdown" || config.type === "radio button" ? (
        <TextArea
          label="Options (comma separated)"
          value={config.options}
          onChange={(value) => handleConfigChange("options", value)}
        />
      ) : null}
      <Checkbox
        label="Required"
        value={config.required}
        onChange={(value) => handleConfigChange("required", value)}
      />
      {config.type === "text input" || config.type === "text area" ? (
        <>
          <TextField
            label="Min length"
            value={config.minLength}
            onChange={(value) => handleConfigChange("minLength", value)}
          />
          <TextField
            label="Max length"
            value={config.maxLength}
            onChange={(value) => handleConfigChange("maxLength", value)}
          />
          <Dropdown
            label="Format"
            value={config.format}
            onChange={(value) => handleConfigChange("format", value)}
            options={["none", "email", "phone number"]}
          />
        </>
      ) : null}
      <button className="remove-button" onClick={onConfigRemove}>
        Remove field
      </button>
    </div>
  );
};

// Define a custom component for form field rendering
const FieldRender = ({ config, value, onValueChange, errors }) => {
  // Define a helper function to parse the options string into an array
  const parseOptions = (options) => {
    return options.split(",").map((option) => option.trim());
  };

  // Render the appropriate component based on the config type
  switch (config.type) {
    case "text input":
      return (
        <TextField
          label={config.label}
          value={value}
          onChange={onValueChange}
          error={errors[config.label]}
        />
      );
    case "text area":
      return (
        <TextArea
          label={config.label}
          value={value}
          onChange={onValueChange}
          error={errors[config.label]}
        />
      );
    case "dropdown":
      return (
        <Dropdown
          label={config.label}
          value={value}
          onChange={onValueChange}
          options={parseOptions(config.options)}
          error={errors[config.label]}
        />
      );
    case "checkbox":
      return (
        <Checkbox
          label={config.label}
          value={value}
          onChange={onValueChange}
          error={errors[config.label]}
        />
      );
    case "radio button":
      return (
        <Radio
          label={config.label}
          value={value}
          onChange={onValueChange}
          options={parseOptions(config.options)}
          error={errors[config.label]}
        />
      );
    case "file upload":
      return (
        <FileUpload
          label={config.label}
          value={value}
          onChange={onValueChange}
          error={errors[config.label]}
        />
      );
    default:
      return null;
  }
};

// Define a custom component for form submission data
const FormSubmission = ({ values }) => {
  return (
    <div className="form-submission">
      <h2>Form Submission Data</h2>
      <table>
        <thead className="form-submission-head">
          <tr className="form-submission-head-val">
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(values).map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{values[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Define the main component for the form generator application
const FormGenerator = () => {
  // Define the state variables for form configurations, values, and errors
  const [configs, setConfigs] = useState([]);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Define a helper function to add a new form field configuration
  const addFieldConfig = () => {
    // Create a new config object with some default values
    const newConfig = {
      label: `Field ${configs.length + 1}`,
      type: "text input",
      options: "",
      required: false,
      minLength: "",
      maxLength: "",
      format: "none",
    };
    // Append the new config object to the configs array and update the state
    setConfigs([...configs, newConfig]);
  };

  // Define a helper function to handle form submission event
  const handleSubmit = (e) => {
    // Prevent the default browser behavior of form submission
    e.preventDefault();
    // Validate the form values and get the errors object
    const errors = validateForm();
    // Update the state with the errors object
    setErrors(errors);
    // Check if there are no errors in the form
    if (Object.keys(errors).length === 0) {
      // Set the submitted state to true and display a success message
      setSubmitted(true);
      alert("Form submitted successfully!");
    }
  };

  // Define a helper function to remove a form field configuration by index
  const removeFieldConfig = (index) => {
    // Filter out the config object at the given index from the configs array and update the state
    setConfigs(configs.filter((_, i) => i !== index));
  };

  // Define a helper function to update a form field configuration by index
  const updateFieldConfig = (index, newConfig) => {
    // Create a new configs array with the updated config object at the given index and
    // update the state
    setConfigs(configs.map((config, i) => (i === index ? newConfig : config)));
  };

  // Define a helper function to handle form value change event by label
  const handleValueChange = (label, value) => {
    // Create a new values object with the updated key-value pair and update the state
    setValues({ ...values, [label]: value });
  };

  // Define a helper function to validate the form values and return an errors object
  const validateForm = () => {
    // Initialize an empty errors object
    const errors = {};
    // Loop through each config object in the configs array
    for (const config of configs) {
      // Get the label, type, required, minLength, maxLength, and format from the config object
      const { label, type, required, minLength, maxLength, format } = config;
      // Get the value from the values object by the label key
      const value = values[label];
      // Check if the field is required and the value is empty or falsy
      if (required && !value) {
        // Set the error message for the field
        errors[label] = "This field is required.";
      }
      // Check if the field is text input or text area and the value is not empty
      if ((type === "text input" || type === "text area") && value) {
        // Check if the value length is less than the minimum length
        if (minLength && value.length < minLength) {
          // Set the error message for the field
          errors[
            label
          ] = `This field must be at least ${minLength} characters long.`;
        }
        // Check if the value length is more than the maximum length
        if (maxLength && value.length > maxLength) {
          // Set the error message for the field
          errors[
            label
          ] = `This field must be no more than ${maxLength} characters long.`;
        }
        // Check if the format is email and the value is not a valid email address
        if (format === "email" && !/^\w+@\w+\.\w+$/.test(value)) {
          // Set the error message for the field
          errors[label] = "This field must be a valid email address.";
        }
        // Check if the format is phone number and the value is not a valid phone number
        if (
          format === "phone number" &&
          !/^\+?\d{10,15}$/.test(value.replace(/\s/g, ""))
        ) {
          // Set the error message for the field
          errors[label] = "This field must be a valid phone number.";
        }
      }
    }
    // Return the errors object
    return errors;
  };

  // Define a helper function to save form configurations as JSON data
  const saveFormConfig = () => {
    // Convert the configs array to a JSON string and store it in a variable
    const jsonConfig = JSON.stringify(configs);
    // Display a success message and log the JSON string to the console
    alert("Form configuration saved as JSON data!");
    console.log(jsonConfig);
  };

  // Define a helper function to load form configurations from JSON data
  const loadFormConfig = () => {
    // Prompt the user to enter a JSON string and store it in a variable
    const jsonConfig = prompt("Enter JSON data for form configuration:");
    try {
      // Parse the JSON string to an array and store it in a variable
      const parsedConfig = JSON.parse(jsonConfig);
      // Check if the parsed array is valid and has at least one element
      if (Array.isArray(parsedConfig) && parsedConfig.length > 0) {
        // Update the state with the parsed array and reset values and errors objects
        setConfigs(parsedConfig);
        setValues({});
        setErrors({});
        // Display a success message
        alert("Form configuration loaded from JSON data!");
      } else {
        // Display an error message
        alert("Invalid JSON data. Please enter a valid array of objects.");
      }
    } catch (error) {
      // Display an error message
      alert("Invalid JSON data. Please enter a valid array of objects.");
    }
  };

  return (
    <div className="form-generator">
      <h1>Dynamic Form Generator</h1>
      <div className="form-config">
        <h2>Form Configuration</h2>
        {configs.map((config, index) => (
          <FieldConfig
            key={index}
            index={index}
            config={config}
            onConfigChange={(newConfig) => updateFieldConfig(index, newConfig)}
            onConfigRemove={() => removeFieldConfig(index)}
            className="form-render-field"
          />
        ))}
        <button className="add-button" onClick={addFieldConfig}>
          Add field
        </button>
        <button className="save-button" onClick={saveFormConfig}>
          Save form configuration as JSON
        </button>
        <button className="load-button" onClick={loadFormConfig}>
          Load form configuration from JSON
        </button>
      </div>
      <div className="form-render">
        <h2>Form Rendering</h2>
        <form onSubmit={handleSubmit}>
          {configs.map((config) => (
            <FieldRender
              key={config.label}
              config={config}
              value={values[config.label]}
              onValueChange={(value) => handleValueChange(config.label, value)}
              errors={errors}
            />
          ))}
          <button className="submit-button" type="submit">
            Submit form
          </button>
        </form>
        {/* Render the form submission data component if submitted is true */}
        {submitted && <FormSubmission values={values} />}
      </div>
    </div>
  );
};

export default FormGenerator;
