import places from "../../base/data/places.json";
import { Autocomplete, createFilterOptions, FormControl, InputLabel, MenuItem, TextField } from "@mui/material";

interface SelectProps {
  value: Place | null;
  setValue: (value: Place | null) => void;
}

const MUISelect = ({ value, setValue }: SelectProps) => {

  const handleFilter = (options: Place[], params: any) => {
    /*console.log("options: ", options);
    console.log("params: ", params);*/
    
    const inputValue = params.inputValue.toLowerCase();
    console.log("inputValue: ", inputValue);

    return options.filter((o) =>
      o.title.toLowerCase().includes(inputValue)
    );
  }

  console.log("set", setValue);
  
  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(e, nValue) => {
          setValue(nValue);
        }}
        selectOnFocus
        options={places}
        getOptionLabel={(option) => option.title}
        filterOptions={handleFilter}
        renderInput={(params) => <TextField {...params}
          label="¿A dónde quieres ir?"
          variant="outlined" />}
      />
    </div>
  );
};

interface Place {
  title: string;
}
const Places: Place[] = places;

export default MUISelect;
