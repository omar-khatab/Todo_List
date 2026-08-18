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
import { ToastContext } from '../Context/ToastContext';


// Dialog imports
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// component
import Todo from './Todo';

// other >> uuid (library) to make id automatically for object as we need unique id for every element
import { v4 as uuidv4 } from 'uuid';

// Hooks
import { useContext, useState, useEffect, useMemo } from 'react';


export default function TodoList() {
  const {todos, setTodos} = useContext(TodosContext)
  const {showHideToast} = useContext(ToastContext)
  // state to control on input field and relate it with todos usestate
  const [titleInput, setTitleInput] = useState('')
  // state to handle delete click
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  // state to pass target todo when we want delete it
  // state to handle update click
  const [showUpdateDialog, setShowUpdateDialog] = useState(false)
  const [dialogTodo, setDialogTodo] = useState({})
  // state to filter todos
  const [displayedTodosType, setDisplayedTodosType] = useState("all")

  // variable to control on filter todos
  // const completedTodos = todos.filter((t) => {
  //   return t.isComplete
  // })

// this filter will call , every rerender, and if we have many todos that reach 1000 todos for example this will loop on all todos to filter them
// and this is a problem because looping on big data after every rerender regardless this rerender relate with this higher order function (filter) or not, so we need something work on this filter function, if todos is changed
// hint : filter here is considered computation process >> caching >> here we use useMemo >> used it when we see computed process depends on particular state
// useMemo >> keep last value from last computed process that we did >> caching(memo wising)
// useMemo >> first parameter is function that we put inside it what we need make for it caching(memo wising) and second one is array of dependencies >> work like useEffect, but for computed process
// no rerender except occur change on dependencies in useMemo, so in my useMemo here we put todos as dependencies, so what inside function of useMemo will work in case of loading page and todos is changed
// in the final , usememo make cache for complex computation consume big time or resources of device
const completedTodos = useMemo(() => {
  return todos.filter((t) => {
    return t.isComplete
  })
}, [todos]);


  // const nonCompletedTodos = todos.filter((t) => {
  //   return !t.isComplete
  // })

const nonCompletedTodos = useMemo(() => {
  return todos.filter((t) => {
    return !t.isComplete
  })
}, [todos])

  // control on the todos with filtration buttons
let filterTodos = todos

if (displayedTodosType == "completed") {
  filterTodos = completedTodos
} else if (displayedTodosType == "not-completed") {
  filterTodos = nonCompletedTodos
} else {
  filterTodos = todos
}

// handle delete modal >> we brings function of delete here because we move dialog here >> to make the code more clean
// we pass target (pressed delete icon from it) todo
function openDeleteDialog (todo) {
  // change value wih state to pass it to handleDeleteConfirm to deal with target todo with delete icon to delete this todo
  setDialogTodo(todo)
  setShowDeleteDialog(true)
}

function handleDeleteClose () {
    setShowDeleteDialog(false)
}

function handleDeleteConfirm () {
    const updateTodo = todos.filter((t) => {
        return t.id != dialogTodo.id
  })
  setTodos(updateTodo) 
  // store last update to local storage during deleting   
  localStorage.setItem("todos",JSON.stringify(updateTodo))  
  // close delete dialog after delete process
  setShowDeleteDialog(false)
  // show toast to delet
  showHideToast("تم الحدف بنجاح")
}

// handle update modal
function openUpdateDialog(todo) {
    setDialogTodo(todo)
    setShowUpdateDialog(true)
}
function handleUpdateClose () {
    setShowUpdateDialog(false)
}

function handleUpdateConfirm () {
    const todoUpdate = todos.map((t) => {
        if (t.id == dialogTodo.id) {
            return {...t , title : dialogTodo.title , details : dialogTodo.details}
        } else {
            return t
        }
    })
    setTodos(todoUpdate)
    setShowUpdateDialog(false)
    // store last update to local storage during updating   
    localStorage.setItem("todos",JSON.stringify(todoUpdate))  
    // show toast to update
  showHideToast("تم التحديث بنجاح")
}


// function to handle filter of todos 
function changeDisplayedTodos (e) {
  setDisplayedTodosType(e.target.value)
}

  // handle add todos
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
  setTitleInput("")
  // deal with local storage >> here we use updatedTodos as value not todos value direct because of repeat update of useState problem(need function (parameter) inside set function of useState itself)
  localStorage.setItem("todos",JSON.stringify(updatedTodos))
  // use toast(snackbar shows in left bottom) after add todo
  showHideToast("تمت الإضافة بنجاح")

}

const todoJsx = filterTodos.map((t) => {
    return <Todo key = {t.id} todo = {t} showDelete = {openDeleteDialog} showUpdate = {openUpdateDialog}/>
  })


// this is not allowed because we put use state in opened function , so this will cause infinite loop (rerender) >> this not right way to reflect what inside the local storage to reflect on the ui
// function of usestate must to call inside event handler to don't make this problem >> to solve whole problem we must use useEffect
// useEffect used to deal with things that don't related with components or react(side effect) like api request, local storage or access cookies 
// useEffect also used to do things one time during loading of component then don't call these things another time
// const storageTodos = JSON.parse(localStorage.getItem("todos"))
// setTodos(storageTodos)

// useEffect receive function as first parameter >> inside it will work in every rerender >> in case of we don't write anything inside second parameter and we must know first parameter(function) always will execute 
// during loading page 
// second parameter is an array >> inside him put dependencies(variable or anything can be changed) that if it changes , this will execute first parameter(function)  
// useEffect(() => {
//   console.log("hello useEffect")
// })

// here first parameter(function) will execute during loading page and if titleInput(dependencies) is changed
// useEffect(() => {
//   console.log("hello useEffect")
// },[titleInput])

// now if we put empty array in second parameter >> this will execute first parameter during loading page only
// useEffect(() => {
//   console.log("hello useEffect")
// },[])

// here this is right use of local storage
useEffect(() => {
  // make variable has another value with empty array to avoid error when deployment of project because in first time ther isn't local storage , local storage is existed in first addition of todo
  const storageTodos = JSON.parse(localStorage.getItem("todos")) || []
  setTodos(storageTodos)
},[])

  return (
    <>
    {/* here we make dialog in todoList component to call it one time, not like when we put it in todo component that means every todo has dialog*/}
        {/* Delete modal start */}
          <Dialog style ={{direction : "rtl"}}
        //  open controls on open modal delete or not 
            open = {showDeleteDialog}
            // to close the modal if we press on any place except the modal itself
            onClose={handleDeleteClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            role="alertdialog"
          >
            <DialogTitle id="alert-dialog-title" sx = {{color : "black"}}>
             هل انت متأكد من حذف المهمة ؟
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                لا يمكنك التراحع عن الحذف بعد إلغائه
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleDeleteClose}>
                إغلاق
              </Button>
              <Button 
            // handle to delete todo from delete modal
              onClick={handleDeleteConfirm}
              >نعم , قم بالحذف </Button>
            </DialogActions>
          </Dialog>
        {/* Delete modal end */}
        {/* update modal start */}
    <Dialog style ={{direction : "rtl"}}
    //  open controls on open modal delete or not 
        open = {showUpdateDialog}
        // to close the modal if we press on any place except the modal itself
        onClose={handleUpdateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
        >
        <DialogTitle id="alert-dialog-title" sx = {{color : "black"}}>
            تعديل المهمة       
        </DialogTitle>
        <DialogContent>
           <TextField
                value = {dialogTodo.title}
                autoFocus
                required
                margin="dense"
                id="name"
                name="email"
                label="عنوان المهمة"
                type="email"
                fullWidth
                variant="standard"
                onChange = {(e) => {
                    setDialogTodo({...dialogTodo , title : e.target.value})
                }}
            />
           <TextField
           value = {dialogTodo.details}
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="تفاصيل"
              type="email"
              fullWidth
              variant="standard"
              onChange = {(e) => {
                setDialogTodo({...dialogTodo , details : e.target.value})
              }}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>
            إغلاق
          </Button>
          <Button 
        // handle to update todo from update modal
          onClick={handleUpdateConfirm}>
            تأكيد 
            </Button>
        </DialogActions>
        </Dialog>
          {/* update modal end */}
    <Container maxWidth="sm" >
        <Card sx={{ minWidth: 275, maxHeight: "90vh" , overflowY : "scroll"}}>
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
            value = {displayedTodosType}
            onChange={changeDisplayedTodos}
            color='primary'
          >
            <ToggleButton value="not-completed">الغير منجز</ToggleButton>
            <ToggleButton value="completed">المنجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
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
                                // enable button when write inside the input
                                disabled = {titleInput.length == 0}
                              >
                                إضافة
                              </Button>
                </Grid>
              </Grid>
          {/* Input and Add Todo end */}
          </CardContent>
        </Card>
      </Container>
      </>
  );
}