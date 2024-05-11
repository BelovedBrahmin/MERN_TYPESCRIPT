import React, { useState } from 'react';
import { Button, TableCell, TableRow } from '@mui/material';

type Props = TodoProps & {
  openDialog: (mode: number, todo: ITodo) => void;
  deleteTodo: (_id: string) => void;
};

const Todo: React.FC<Props> = ({ todo, openDialog, deleteTodo }) => {
  // const checkTodo: string = todo.status ? `line-through` : ""
  // Initialize the values of multiple input tags with separate state variables
  const [inputValue1] = useState(todo.name);
  const [inputValue2] = useState(todo.description);

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell align="left" style={{ paddingLeft: '50px' }}>
        <p
          className={todo.status ? `hide-button` : 'Card--button__done'}
          style={{
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
          }}
        >
          {inputValue1}
        </p>
      </TableCell>
      <TableCell align="left" style={{ paddingLeft: '50px' }}>
        <p
          className={todo.status ? `hide-button` : 'Card--button__done'}
          style={{
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
          }}
        >
          {inputValue2}
        </p>
      </TableCell>
      <TableCell align="left" style={{ paddingLeft: '50px' }}>
        <Button
          color="info"
          variant="outlined"
          onClick={() => openDialog(2, todo)}
        >
          Update
        </Button>
      </TableCell>
      <TableCell align="left" style={{ paddingLeft: '50px' }}>
        <Button
          color="warning"
          variant="outlined"
          onClick={() => deleteTodo(todo._id)}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Todo;
