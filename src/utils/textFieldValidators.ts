export const nameValidator = (value: string) => {
  if (value.length < 3) return "Name must be at least 3 characters long";
  if (value.length > 20) return "Name must be less than 20 characters long";
  if (!/^[a-zA-Z ]+$/.test(value))
    return "Name must contain only letters and spaces";
  return requiredValidator(value);
};
export const emailValidator = (value: string) => {
  if (!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(value))
    return "Invalid email address";
  return requiredValidator(value);
};

export const posNumberValidator = (value: number) => {
  if (value < 1) return "Must be positive number above 0";
  return requiredValidator(value);
};

export const requiredValidator = (value: string | number) => {
  if (value) return false;
  return "Required!";
};
