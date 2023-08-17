import { useContext} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { FormContext } from '../../App';

const TableInput = (props) => {
  const { handleChange } = useContext(FormContext)

  return (
    <div>
      <DataGrid
        columns={props.columns}
        editMode='row'
        processRowUpdate={(updatedRow, originalRow) => {
            const currentRows = JSON.parse(JSON.stringify(props.value));
            const newRows = currentRows.map((row) => {
              if (row.id === updatedRow.id) {
                return updatedRow;
              } else {
                return row;
              }
            })
            handleChange(props.id, newRows);
          }
        }
        onProcessRowUpdateError={() => {return }}
        rows={props.value}
      />
    </div>
  )
}

export default TableInput