import { useContext } from 'react'
import Select from 'react-select'
import { FormContext } from '../../App';

const DropdownSelect = (props) => {
  const { handleChange } = useContext(FormContext)

  return (
    <div style={{ width: '50%'}}>
      <p>{props.text}</p>
      <Select
        options={props.options}
        placeholder={props.placeholder}
        onChange={(e) => {
          handleChange(props.id, e.value)
        }}
        value={props.value ? { value: `${props.value}`, label: `${props.value}` } : null}
      />
    </div>
  )
}

export default DropdownSelect