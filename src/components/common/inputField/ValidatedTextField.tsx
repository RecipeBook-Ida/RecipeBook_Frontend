import { Autocomplete, TextField, TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";
import {
  noneValidator,
  requiredValidator,
} from "../../../utils/textFieldValidators";

type ValidatedTextFieldProps = TextFieldProps & {
  label: string;
  validator?: any;
  onChange: (newValue: any, isValid: boolean) => void;
  number?: true;
  submit?: boolean;
  options?: any[];
};

const ValidatedTextField: React.FC<ValidatedTextFieldProps> = ({
  label,
  onChange,
  number,
  submit,
  options,
  required,
  validator = required ? requiredValidator : noneValidator,
  helperText,
  ...props
}) => {
  const [value, setValue] = useState(number ? 0 : "");
  const [option, setOption] = useState(null);
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
          value={option ? option : null}
          onChange={(_e, option: any) => {
            handleChange(
              option ? (typeof option === "object" ? option.id : option) : ""
            );
            setOption(option);
          }}
          renderInput={(params) => (
            <TextField
              {...props}
              {...params}
              label={label}
              error={!!error}
              helperText={error}
              required={required}
            />
          )}
          getOptionLabel={(option: any) =>
            typeof option === "object" ? option.name : option
          }
          options={options}
        ></Autocomplete>
      </>
    );
  }

  return (
    <TextField
      label={label}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      error={!!error}
      helperText={error || helperText}
      variant="outlined"
      required={required}
      type={number && "number"}
      {...props}
    />
  );
};
export default ValidatedTextField;
