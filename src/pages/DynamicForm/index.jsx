import styles from './_index.module.scss';
import PriceInput from '../../components/PriceInput';
import RadioButtonGroup from '../../components/RadioButtonGroup';
import TableInput from '../../components/TableInput';
import { useGridApiRef } from '@mui/x-data-grid';
import DropdownSelect from '../../components/DropdownSelect';
import _ from 'lodash';

const formatColumns = (rawColumns) => {
  const formattedColumns = rawColumns.map((column) => {
    let newColumn = {}
    newColumn['field'] = column.name.toLowerCase();
    newColumn['headerName'] = column.name;
    newColumn['type'] = column.type;
    newColumn['editable'] = column.editable;
    newColumn['width'] = column.width ? column.width : 100;
    return newColumn;
  })
  return formattedColumns;
}

const DynamicForm = ({ inputComponents, handleFormSubmit, setFormData }) => {

  const handleInputChange = (id, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const apiRef = useGridApiRef();

  const handleSubmit = async () => {
    // Get table data
    if (Object.keys(apiRef.current).length !== 0) {
      const rowIds = apiRef.current.getAllRowIds();
      const rowData = [];
      for (let id in rowIds) {
        rowData.push(apiRef.current.getRow(id));
      }

      await setFormData((prevFormData) => ({
        ...prevFormData,
        'table-input': rowData,
      }));
    }
    handleFormSubmit();

  }

  return (
    <div className={styles['dynamic-form']}>
      {inputComponents.map((input, index) => {
        switch (input.type) {
          case 'dropdownInput':
            return <DropdownSelect id={input.key} key={input.key} onChange={handleInputChange} options={input.options} text={input.text}/>
          case 'priceInput':
            return <PriceInput id={input.key} key={input.key} onChange={handleInputChange} text={input.text}/>
          case 'radioGroup':
            return <RadioButtonGroup id={input.key} key={input.key} label={input.label} onChange={handleInputChange} options={input.options}/>
          case 'tableInput':
            return <TableInput apiRef={apiRef} columns={formatColumns(input.columns)} id={input.key} key={input.key} />
          default:
            return null;
        }
      })}
      <button className={styles['submit-btn']} onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default DynamicForm;
