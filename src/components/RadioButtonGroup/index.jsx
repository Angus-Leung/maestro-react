import { useContext } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { FormContext } from '../../App';

export default function RadioButtonGroup(props) {
  const { handleChange } = useContext(FormContext)
  return (
    <FormControl>
      <FormLabel>{props.label}</FormLabel>
      <RadioGroup onChange={(e) => handleChange(props.id, e.target.value)} row value={props.value}>
        {props.options.map((option, index) => <FormControlLabel key={index} control={<Radio key={index}/>} label={option} value={option} />)}
      </RadioGroup>
    </FormControl>
  );
}