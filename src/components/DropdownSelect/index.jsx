import React, { useState } from 'react';
import Select from 'react-select'

const DropdownSelect = (props) => {

  return (
    <div style={{ width: '50%'}}>
      <p>{props.text}</p>
      <Select options={props.options} onChange={(e) => props.onChange(props.id, e.value)}/>
    </div>
  )
}

export default DropdownSelect