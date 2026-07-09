import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


// Icons
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useContext , useState } from 'react';
import { TodosContext } from '../Context/TodosContext';



export default function Todo ({todo}) {
    // state to add todo and edit isComplete in object of todos
    const {todos, setTodos} = useContext(TodosContext)

// state to handle delete click
const [showDeleteDialog, setShowDeleteDialog] = useState(false)
// state to handle update click
const [showUpdateDialog, setShowUpdateDialog] = useState(false)
// state to handle update fields
const [updatedTodo, setUpdatedTodo] = useState({title : todo.title , details: todo.details})
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
}

// handle delete modal
function handleDeleteClick () {
    setShowDeleteDialog(true)
}

function handleDeleteClose () {
    setShowDeleteDialog(false)
}
function handleDeleteConfirm () {
    const updateTodo = todos.filter((t) => {
        return t.id != todo.id
  })
  setTodos(updateTodo) 
    // store last update to local storage during deleting   
  localStorage.setItem("todos",JSON.stringify(updateTodo))  
}
// handle update modal
function handleUpdateClick() {
    setShowUpdateDialog(true)
}
function handleUpdateClose () {
    setShowUpdateDialog(false)
}
function handleUpdateConfirm () {
    const todoUpdate = todos.map((t) => {
        if (t.id == todo.id) {
            return {...t , title : updatedTodo.title , details : updatedTodo.details}
        } else {
            return t
        }
    })
    setTodos(todoUpdate)
    setShowUpdateDialog(false)
    // store last update to local storage during updating   
    localStorage.setItem("todos",JSON.stringify(todoUpdate))  
}

        return (
    <>
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
                value = {updatedTodo.title}
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
                    setUpdatedTodo({...updatedTodo , title : e.target.value})
                }}
            />
           <TextField
           value = {updatedTodo.details}
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
                setUpdatedTodo({...updatedTodo , details : e.target.value})
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