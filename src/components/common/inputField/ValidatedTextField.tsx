import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";

interface ValidatedTextFieldProps {
  label: string;
  validator: any;
  onChange: (newValue: any, isValid: boolean) => void;
  number?: true;
  props?: any;
  submit?: boolean;
  options?: any[];
}

const ValidatedTextField: React.FC<ValidatedTextFieldProps> = ({
  label,
  validator,
  onChange,
  number,
  props,
  submit,
  options,
}) => {
  const [value, setValue] = useState(number ? 0 : "");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!value && submit) {
      const errorMessage = validator(value);
      setError(errorMessage);
      onChange(value, !errorMessage);
    }
  }, [submit]);

  const handleChange = (value: string) => {
    const newValue = number ? +value : value;
    const errorMessage = validator(newValue);
    setValue(newValue);
    setError(errorMessage);
    onChange(value, !errorMessage);
  };

  if (options) {
    return (
      <>
        <Autocomplete
          id={label}
          value={value !== "" ? value : null}
          onChange={(e, newValue: string | null) => {
            handleChange(newValue ? newValue : "");
          }}
          renderInput={(params) => (
            <TextField
              {...props}
              {...params}
              label={label}
              value={value}
              error={!!error}
              helperText={error}
              variant="outlined"
              required
              type={number && "number"}
            />
          )}
          options={options}
        ></Autocomplete>
      </>
    );
  }

  return (
    <TextField
      {...props}
      label={label}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      error={!!error}
      helperText={error}
      variant="outlined"
      required
      type={number && "number"}
    />
  );
};
export default ValidatedTextField;
