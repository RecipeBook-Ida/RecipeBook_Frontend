import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

interface ValidatedTextFieldProps {
  label: string;
  validator: any;
  onChange: (newValue: any, isValid: boolean) => void;
  number?: true;
  props?: any;
  submit?: boolean;
}

const ValidatedTextField: React.FC<ValidatedTextFieldProps> = ({
  label,
  validator,
  onChange,
  number,
  props,
  submit,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = number ? +e.target.value : e.target.value;
    const errorMessage = validator(newValue);
    setValue(newValue);
    setError(errorMessage);
    onChange(newValue, !errorMessage);
  };

  return (
    <TextField
      {...props}
      label={label}
      value={value}
      onChange={handleChange}
      error={!!error}
      helperText={error}
      variant="outlined"
      required
      type={number && "number"}
    />
  );
};
export default ValidatedTextField;
