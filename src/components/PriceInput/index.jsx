import React from 'react';
import TextField from '@mui/material/TextField';

const PriceInput = (props) => {

  return (
    <div>
      <p>{props.text}</p>
      <TextField
        key={props.id}
        onChange={(e) => props.onChange(props.id, e.target.value)}
        placeholder='$0.00'
        variant='filled'
        sx={{ width: '300px'}}
      />
    </div>
  );
};

export default PriceInput;
