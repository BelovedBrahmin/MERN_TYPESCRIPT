import { TableCell, TableRow } from '@mui/material';
import React, { useState } from 'react';

type Props = TodoProps & {
  addTodo: (todo: any) => void;
  deleteTodo: (_id: string) => void;
};

const Todo: React.FC<Props> = ({ todo, addTodo, deleteTodo }) => {
  // Initialize the values of multiple input tags with separate state variables
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');

  // Handler function for input 1
  const handleChange1 = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue1(event.target.value);
    todo.name = event.target.value.toString();
  };

  // Handler function for input 2
  const handleChange2 = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue2(event.target.value);
    todo.description = event.target.value.toString();
  };
  const cancel = () => {
    setInputValue1('');
    setInputValue2('');
  };
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell align="center">
        {/* Input tag 1 with initial value and onChange handler */}
        <input
          type="text"
          placeholder="Enter value 1"
          value={inputValue1}
          onChange={handleChange1}
        />
      </TableCell>{' '}
      sdfsdfa{' '}
      <TableCell align="center">
        {/* Input tag 2 with initial value and onChange handler */}
        <input
          type="text"
          placeholder="Enter value 2"
          value={inputValue2}
          onChange={handleChange2}
        />
      </TableCell>
      <TableCell align="center">
        <button
          onClick={() => addTodo(todo)}
          className={todo.status ? `hide-button` : 'Card--button__done'}
        >
          AddNew
        </button>
      </TableCell>
      <TableCell align="center">
        <button onClick={() => cancel()} className="Card--button__delete">
          Cancel
        </button>
      </TableCell>
    </TableRow>
  );
};

export default Todo;
