import './App.css'
import TodoList from './Components/TodoList'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TodosContext } from './Context/TodosContext';

// other >> uuid (library) to make id automatically for object as we need unique id for every element
import { v4 as uuidv4 } from 'uuid';

// Hooks
import { useState } from 'react';

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
  }
});
function App() {
    // state to control on todos
  const [todos, setTodos] = useState(initialTodos)
  return (
    <>
    {/* ThemeProvider to make font family on whole project, so if we want make anything cover on whole project, we must make ThemeProvider >> in material ui */}
    <ThemeProvider theme={theme}>
      {/* if we want tp pass key name like value name, we can write name only one don't key : value */}
      <TodosContext.Provider value={{ todos, setTodos}}>
    {/* hint: there is some code in app.css and index.css */}
      <TodoList/>
      </TodosContext.Provider>
    </ThemeProvider>
    </>
  )
}

export default App
