import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function MySnackBar ({open, message}) {


  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        message="This Snackbar will be dismissed in 5 seconds."
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}