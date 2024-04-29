import { TextField } from "@mui/material";
import { useState } from "react";

interface ValidatedTextFieldProps {
  label: string;
  validator: any;
  onChange: any;
}

const ValidatedTextField: React.FC<ValidatedTextFieldProps> = ({
  label,
  validator,
  onChange,
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const errorMessage = validator(newValue);
    setValue(newValue);
    setError(errorMessage);
    onChange(!errorMessage);
  };

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      error={!!error}
      helperText={error}
    />
  );
};
export default ValidatedTextField;
