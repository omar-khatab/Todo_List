import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';



// Icons
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useContext } from 'react';
import { TodosContext } from '../Context/TodosContext';
import { ToastContext } from '../Context/ToastContext';


export default function Todo ({todo , showDelete, showUpdate}) {
    // state to add todo and edit isComplete in object of todos
    const {todos, setTodos} = useContext(TodosContext)
    // state to control on toast when we press on right mark(المهام المنجزة)
    const {showHideToast} = useContext(ToastContext)
// function to handle isComplete in usestate
function handleCheckClick () {
    const updateTodo = todos.map((t) => {
        if (t.id == todo.id) {
      t.isComplete = !t.isComplete
    }
    return t
  })
  setTodos(updateTodo) 
    // to reflect the change of isComplete on local storage >> local storage here don't need useEffect because we use it inside event handler call it or use it in case of enable this event handler like useEffect that
    // enable in particular time(loading page or change dependencies), so localStorage.getItem need useEffect, but localStorage.setItem don't need useEffect because we put it inside event handler
    localStorage.setItem("todos",JSON.stringify(updateTodo))   
    // function to control on toast
    showHideToast("تم التعديل بنجاح")
}


// pass function that deal with delete icon
function handleDeleteClick () {
    showDelete(todo)
}
// pass function that deal with update icon
function handleUpdateClick() {
    showUpdate(todo)
}

        return (
    <>

    
        <Card className='todoCard' sx={{ minWidth: 275 , background : "#283593" , color : 'white', margin: "10px 0" }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid size={8}>
                        <Typography variant="h5" sx={{textAlign : "right", textDecoration : todo.isComplete ? "line-through" : "none"}}>
                            {todo.title}           
                        </Typography>
                        <Typography variant="h6" sx={{textAlign : "right"}}>
                            {todo.details}                            
                        </Typography>   
                    </Grid>
                    {/* Check Icons start */}
                    <Grid size={4}   sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        {/* Check icon to isComplete start */}
                        <IconButton className='iconButton' 
                        style={{
                            // reflect isComplete on ui
                            color : todo.isComplete ? "white"  : "#8bc34a" , 
                            backgroundColor : todo.isComplete ? "#8bc34a" : "white" , 
                            border : "solid #8bc34a 3px"
                        }}
                        onClick={() => {
                            handleCheckClick()
                        }}>
                            <CheckIcon/>
                        </IconButton>
                         {/* Check icon to isComplete end */}
                        {/* handle update click start */}
                        
                        <IconButton className='iconButton' 
                        style={{
                            color : "#1769aa" , 
                            backgroundColor : "white" , 
                            border : "solid #1769aa 3px"
                            }}
                            onClick = {handleUpdateClick}>
                            <ModeEditOutlineOutlinedIcon/>
                        </IconButton>
                        {/* handle update click end */}
                        {/* handle delete click start */}
                        <IconButton className='iconButton' 
                        style={{
                            color : "#b23c17" , 
                            backgroundColor : "white" , 
                            border : "solid #b23c17 3px"
                        }}
                        onClick={handleDeleteClick}>
                            <DeleteOutlineOutlinedIcon/>
                        </IconButton>
                        {/* handle delete click end */}
                    </Grid>
                    {/* Check Icons end */}
                </Grid>
            </CardContent>
        </Card>
    </>
)
}