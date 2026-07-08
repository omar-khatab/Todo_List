import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { TodosContext } from '../Context/TodosContext';

// component
import Todo from './Todo';

// other >> uuid (library) to make id automatically for object as we need unique id for every element
import { v4 as uuidv4 } from 'uuid';

// Hooks
import { useContext, useState } from 'react';


export default function TodoList() {
  const {todos, setTodos} = useContext(TodosContext)
  // state to control on input field and relate it with todos usestate
  const [titleInput, setTitleInput] = useState('')
  const todoJsx = todos.map((t) => {
    return <Todo key = {t.id} todo = {t} />
  })



function handleAddClick () {
  const newTodo = {
    id : uuidv4(),
    title : titleInput,
    details : '',
    isComplete : false,
  }

  // todos.push(newTodo) >> not allowed >> mutation and rerender in usestate
  const updatedTodos = [...todos, newTodo]
    setTodos(updatedTodos)
  // to empty input field after add todo
  setTitleInput('')

  // deal with local storage >> here we use updatedTodos as value not todos value direct because of repeat update of usestate problem(need function (parameter) inside set function of usestate itself)
  localStorage.setItem("todos",JSON.stringify(updatedTodos))
}

// this is not allowed because we put use state in opened function , so this will cause infinite loop (rerender) >> this not right way to reflect what inside the local storage to reflect on the ui
// function of usestate must to call inside event handler to don't make this problem >> to solve whole problem we must use useEffect
// const storageTodos = JSON.parse(localStorage.getItem("todos"))
// setTodos(storageTodos)

  return (
    <Container maxWidth="sm" >
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            {/* here we can use fontWeight because we know this in css file in font face */}
            <Typography variant="h2" sx={{color: "black" , fontWeight: "bold"}}>
              مهامى
            </Typography>
          <Divider style={{background: "lightblue"}}/>
          {/* Toggle menu start */}
          <ToggleButtonGroup
          style={{direction: "ltr", margin : "30px 0 "}}
          exclusive
            aria-label="Platform"
          >
            <ToggleButton value="ios">الغير منجز</ToggleButton>
            <ToggleButton value="android">المنجز</ToggleButton>
            <ToggleButton value="web">الكل</ToggleButton>
          </ToggleButtonGroup>
          {/* toggle menu end */}
          {/* All Todos start */}
          {todoJsx}
          {/* All Todos end */}
          {/* Input and Add Todo start */}
              <Grid container spacing={2} style = {{marginTop : "20px"}}>
                <Grid size={8}>
                              <TextField id="outlined-basic" label="عنوان المهمة" variant="outlined" style={{width: "100%"}} value = {titleInput}
                              onChange = {(e) => {
                                setTitleInput(e.target.value)
                              }}/>

                </Grid>
                <Grid size={4}>
                              <Button variant="contained" style={{height : "100%" , width : "100%"}} 
                                onClick={handleAddClick}
                              >إضافة</Button>
                </Grid>
              </Grid>
          {/* Input and Add Todo end */}
          </CardContent>
        </Card>
      </Container>
  );
}