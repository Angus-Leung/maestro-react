import {useState, useCallback, useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';

const TableInput = ({ apiRef, columns, id }) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const emptyRows = [];
    for (let i=0; i < 5; i++) {
      let row = {}
      columns.forEach(column => {
        if (column.field === 'id') {
          row[column.field] = i;
        } else {
          row[column.field] = ''
        }
      })
      emptyRows.push(row);
    }
    setRows(emptyRows);
  }, [columns])

  const handleProcessRowUpdate = useCallback((updatedRow, originalRow) => {
    // Find the index of the row that was edited
    const rowIndex = rows.findIndex((row) => row.id === updatedRow.id);

    // Replace the old row with the updated row
    const updatedRows = [...rows];
    updatedRows[rowIndex] = updatedRow;

    // Update the state with the new rows
    setRows(updatedRows);

    // Return the updated row to update the internal state of the DataGrid
    return updatedRow;
  }, [rows]);

  return (
    <div>
      <DataGrid
        apiRef={apiRef}
        columns={columns}
        editMode='row'
        processRowUpdate={handleProcessRowUpdate}
        onProcessRowUpdateError={(err) => console.log(err)}
        rows={rows}
      />
    </div>
  )
}

export default TableInput