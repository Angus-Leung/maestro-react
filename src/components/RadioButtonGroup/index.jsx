import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioButtonGroup(props) {
  return (
    <FormControl>
      <FormLabel>{props.label}</FormLabel>
      <RadioGroup onChange={(e) => props.onChange(props.id, e.target.value)} row>
        {props.options.map((option, index) => <FormControlLabel key={index} control={<Radio key={index}/>} label={option} value={option} />)}
      </RadioGroup>
    </FormControl>
  );
}