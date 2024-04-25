import { MenuItem, TextField } from "@mui/material";

interface RecipeFormProps {}

const RecipeForm: React.FC<RecipeFormProps> = ({}) => {

    const currencies = [
        {
          value: 'USD',
          label: '$',
        },
        {
          value: 'EUR',
          label: '€',
        },
        {
          value: 'BTC',
          label: '฿',
        },
        {
          value: 'JPY',
          label: '¥',
        },
      ];


  return (
    <div className=" bg-bookBase-regular w-full h-80 p-5">
      <TextField id="title" label="Tittel" variant="outlined" />
      <TextField id="description" label="Beskrivelse" multiline fullWidth maxRows={4} />
      <TextField id="cooktime" label="Tid" type="number" variant="outlined" />
      <TextField id="cuisine" label="Matrett" variant="outlined" />
      <TextField id="type" label="Type" variant="outlined" />

      <TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue="EUR"
          helperText="Please select your currency"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
    </div>
  );
};
export default RecipeForm;
