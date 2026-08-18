import './App.css'
import TodoList from './Components/TodoList'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TodosContext } from './Context/TodosContext';
import MySnackBar from './Components/MySnackBar';
import { ToastContext } from './Context/ToastContext';

// other >> uuid (library) to make id automatically for object as we need unique id for every element
import { v4 as uuidv4 } from 'uuid';

// Hooks
import { useContext, useState } from 'react';



const initialTodos = [
  {
    // here we use function of uuid to generate unique id for every element we make
    id : uuidv4(),
    title : "قراءة كتاب" ,
    details : "سيبثصبصثبصثبصثببص" ,
    isComplete : false ,
  },
  {
    id : uuidv4(),
    title : "قراءة كتاب" ,
    details : "سيبثصبصثبصثبصثببص" ,
    isComplete : false ,
  },
  {
    id : uuidv4(),
    title : "قراءة كتاب" ,
    details : "سيبثصبصثبصثبصثببص" ,
    isComplete : false ,
  },
]

// inside this object we can control what we want like font family of whole app
const theme = createTheme({
  // method to deal with fonts with material ui by using typography
  typography : {
    fontFamily : 
      // here we put font family name as that exist inside css file (font face) >> this is a mandatory
    ["Cairo"]
  },
  palette : {
    primary : {
      main :"#b33030"
    }
  }
});
function App() {
  // state to control on todos
  const [todos, setTodos] = useState(initialTodos)
  // state to control on snakbar
  const [open, setOpen] = useState(false);
  // state to control on the message that show based on what i do like delete, update or add
  const [message, setMessage] = useState("");

  // function to show snackbar and hide 
  function showHideToast (message) {
    setOpen(true)
    // here show message based on which trigger the message
    setMessage(message)
    setTimeout(() => {
      setOpen(false)
    }, 2000)
  }
  return (
    <>
    {/* ThemeProvider to make font family on whole project, so if we want make anything cover on whole project, we must make ThemeProvider >> in material ui */}
    <ThemeProvider theme={theme}>
      <ToastContext.Provider value={{showHideToast}}>
      {/* if we want tp pass key name like value name, we can write name only one don't key : value */}
      <TodosContext.Provider value={{ todos, setTodos}}>
    {/* hint: there is some code in app.css and index.css */}
      <TodoList/>
      {/* this to show in bottom page when make action on  the todolist like delete, update and add task */}
      <MySnackBar open = {open} message = {message}/>
      </TodosContext.Provider>
      </ToastContext.Provider>
    </ThemeProvider>
    </>
  )
}

export default App
