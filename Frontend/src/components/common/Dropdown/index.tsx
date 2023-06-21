import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { memo, ReactNode, useMemo } from 'react';
import { SelectChangeEvent } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

type Props = {
  name: string;
  label: string;
  error?: string;
  selected: string;
  disabled?: boolean;
  list: { id: string; name?: string }[];
  handleChange: (event: SelectChangeEvent<string>, child: ReactNode) => void;
};

function DropdownComponent({
  name,
  list,
  label,
  selected,
  error,
  disabled = false,
  handleChange,
}: Props) {
  const items = useMemo(() => {
    return list.map((item, index) => (
      <MenuItem key={index} value={item.id} selected={item.id === selected}>
        {item.name ?? ''}
      </MenuItem>
    ));
  }, [list, selected]);
  return (
    <div className="my-4">
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          disabled={disabled}
          id={name}
          name={name}
          label={label}
          value={selected}
          onChange={handleChange}
          error={Boolean(error)}
        >
          {items}
        </Select>
      </FormControl>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

export const Dropdown = memo(DropdownComponent);
