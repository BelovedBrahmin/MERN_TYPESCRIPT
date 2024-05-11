import React, { useEffect, useState, useRef } from 'react';
import TodoItem from '../../client/src/components/TodoItem';
import { getTodos, addTodo, updateTodo, deleteTodo } from './API';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Grid, TableHead } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faPhone,
  faPencil,
  faContactBook,
  faRemoveFormat,
} from '@fortawesome/free-solid-svg-icons';
import TextField from '@mui/material/TextField';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const App: React.FC = () => {
  useEffect(() => {
    fetchTodos();
  }, []);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const fetchTodos = (): void => {
    console.log('herere');
    getTodos()
      .then(({ data: { todos } }: ITodo[] | any) => {
        console.log(todos, 'YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY');
        setTodos(todos);
      })
      .catch((err: Error) => console.log(err));
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [dialogInputMode, setdialogInputMode] = useState(1);
  const [_id, settodo_id] = useState('');

  // Avoid a layout jump when reaching the last page with empty todos.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - todos.length) : 0;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setInputValue1('');
    setInputValue2('');
    setdialogInputMode(1);
    setOpen(false);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSaveTodo = (formData: ITodo): void => {
    // e.preventDefault()
    console.log('addTodo');
    addTodo(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error('Error! Todo not saved');
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };
  // // Sample updateTodo function
  // const updateTodo = async (updatedTodo) => {
  //   // Your update logic here
  //   return { status: 200, data: { todos: updatedTodo } };
  // };.then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
  const handleUpdateTodo = (todo: ITodo): void => {
    console.log(todo, 'todo');
    updateTodo(todo)
      .then(({ data }: ITodo[] | any) => {
        console.log(todos, 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX');
        setTodos((state) => {
          console.log(state, 'PPPPPPPPPPPPPPPPPPPPPPP');
          return [...data.todos];
        });
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteTodo = (_id: string): void => {
    deleteTodo(_id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Todo not deleted');
        }
        setTodos(data.todos);
      })
      .catch((err) => console.log(err));
  };
  const openDialog = (mode: Number, todo: ITodo) => {
    if (mode === 1) {
      if (buttonRef.current) {
        buttonRef.current.click();
      }
      setdialogInputMode(1);
    } else if (mode === 2) {
      setdialogInputMode(2);

      setInputValue1(todo.name);
      setInputValue2(todo.description);
      if (todo._id !== undefined) settodo_id(todo._id);

      if (buttonRef.current) {
        buttonRef.current.click();
      }
    }
  };

  // Handler function for input 1
  const handleChange1 = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue1(event.target.value);
  };

  // Handler function for input 2
  const handleChange2 = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue2(event.target.value);

    console.log(event.target.value.toString());
    // todo.description = event.target.value.toString();
  };
  const handleOk = () => {
    // handleUpdateTodo()
    console.log(inputValue1, inputValue2);
    let temp: ITodo = {
      _id: _id,
      name: inputValue1,
      description: inputValue2,
      status: true,
    };
    console.log('1++', dialogInputMode);

    // eslint-disable-next-line eqeqeq
    if (dialogInputMode == 1) {
      console.log('1++');
      handleSaveTodo(temp);

      // eslint-disable-next-line eqeqeq
    } else if (dialogInputMode == 2) {
      console.log('2++');
      handleUpdateTodo(temp);
    }
  };
  console.log('XXXXXXXXXXXXXXYYYYYYYYYYYYYYYYY', todos);
  return (
    <main className="App">
      <React.Fragment>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Hi, SuperKingA
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Typography>
              To finish inputting in the input window below and proceed with the
              operation, press the "OK" button. To cancel, press the "Cancel"
              button.
            </Typography>
            <br />
            <br />
            <table>
              <tr>
                <td>
                  {' '}
                  <p style={{ width: '270px', display: 'inline' }}>
                    <FontAwesomeIcon icon={faPhone} />
                    &nbsp;&nbsp;Name:
                  </p>
                </td>
                <td>
                  <TextField
                    required
                    style={{ marginLeft: '20px', width: '350px' }}
                    id="standard-required"
                    label="Required** (Ava Johnso)"
                    defaultValue="Hello World"
                    variant="standard"
                    value={inputValue1}
                    onChange={handleChange1}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <span>
                    <FontAwesomeIcon icon={faUser} />
                    &nbsp;&nbsp;PhoneNumber:
                  </span>
                </td>
                <td>
                  <TextField
                    required
                    style={{ marginLeft: '20px', width: '350px' }}
                    label="Required** ((555) 456-7890)"
                    defaultValue="Hello World"
                    variant="standard"
                    value={inputValue2}
                    onChange={handleChange2}
                  />
                </td>
              </tr>
            </table>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleOk}>
              OK
            </Button>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={6}>
          <div style={{ marginTop: '20vh' }}>
            <center>
              <h1 style={{ fontFamily: 'cursive' }}>
                <FontAwesomeIcon icon={faContactBook} />
                &nbsp;contact Book
              </h1>
            </center>
            <Button
              color="secondary"
              ref={buttonRef}
              variant="outlined"
              onClick={handleClickOpen}
            >
              + Add New
            </Button>
            <br />
            <br />
            {/* <h1>My Todos</h1> */}
            {/* <AddTodo saveTodo={handleSaveTodo} /> */}
            <TableContainer component={Paper} style={{ fontSize: '50px' }}>
              <Table
                sx={{ minWidth: 650 }}
                aria-label="simple table"
                style={{ backgroundColor: 'white' }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="left" style={{ width: '12vw' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <b style={{ fontFamily: 'cursive' }}>
                        <FontAwesomeIcon icon={faUser} />
                        &nbsp;Name
                      </b>
                    </TableCell>
                    <TableCell align="left" style={{ width: '18vw' }}>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <b style={{ fontFamily: 'cursive' }}>
                        <FontAwesomeIcon icon={faPhone} />
                        &nbsp;Phone Number
                      </b>
                    </TableCell>
                    <TableCell align="left">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <b style={{ fontFamily: 'cursive' }}>
                        <FontAwesomeIcon icon={faPencil} />
                        &nbsp;Update
                      </b>
                    </TableCell>
                    <TableCell align="left">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <b style={{ fontFamily: 'cursive' }}>
                        <FontAwesomeIcon icon={faRemoveFormat} />
                        &nbsp;Delete
                      </b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ fontSize: '50px' }}>
                  {/* <AddTodo 
        todo={sampleTodo}
        addTodo={handleSaveTodo}
        deleteTodo={handleDeleteTodo} /> */}
                  {(rowsPerPage > 0
                    ? todos.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : todos
                  ).map((todo) => {
                    // console.log(todo, "BBBXXXX");
                    return (
                      <TodoItem
                        key={'x' + todo._id}
                        openDialog={openDialog}
                        deleteTodo={handleDeleteTodo}
                        todo={todo}
                      />
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: 'All', value: -1 },
                      ]}
                      colSpan={3}
                      count={todos.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      slotProps={{
                        select: {
                          inputProps: {
                            'aria-label': 'rows per page',
                          },
                          native: true,
                        },
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
    </main>
  );
};

export default App;
