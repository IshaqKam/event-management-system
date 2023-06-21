import { ChangeEvent, memo } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

type Props = {
  name?: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
};

const FormControlCheckBoxComponent = ({
  name,
  label,
  checked,
  onChange,
  disabled = false,
}: Props) => {
  return (
    <FormControl component="fieldset">
      <FormGroup aria-label="position" row>
        <FormControlLabel
          name={name}
          disabled={disabled}
          labelPlacement="end"
          control={<Checkbox checked={checked} onChange={onChange} />}
          label={label}
        />
      </FormGroup>
    </FormControl>
  );
};

export const FormControlCheckBox = memo(FormControlCheckBoxComponent);
