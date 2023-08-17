import styles from './_index.module.scss';
import TextInput from '../../components/TextInput';
import RadioButtonGroup from '../../components/RadioButtonGroup';
import TableInput from '../../components/TableInput';
import DropdownSelect from '../../components/DropdownSelect';

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

const DynamicForm = ({ inputComponents, handleFormSubmit }) => {

  return (
    <div className={styles['dynamic-form']}>
      {inputComponents.map((component, index) => {
        switch (component.field_type) {
          case 'dropdown':
            return <DropdownSelect
                    id={component.field_id}
                    key={component.field_id}
                    options={component.field_options}
                    placeholder={component.field_placeholder}
                    text={component.field_label}
                    value={component.field_value}
                    />
          case 'text':
            return <TextInput
                    id={component.field_id}
                    key={component.field_id}
                    placeholder={component.field_placeholder ? component.field_placeholder : ''}
                    text={component.field_label}
                    value={component.field_value}
                  />
          case 'radio_group':
            return <RadioButtonGroup
                    id={component.field_id}
                    key={component.field_id}
                    label={component.field_label}
                    options={component.field_options}
                    value={component.field_value}
                  />
          case 'table':
            return <TableInput
                    columns={formatColumns(component.field_columns)}
                    id={component.field_id}
                    key={component.field_id}
                    value={component.field_value}
                   />
          default:
            return null;
        }
      })}
      <button className={styles['submit-btn']} onClick={handleFormSubmit}>Submit</button>
    </div>
  );
};

export default DynamicForm;
