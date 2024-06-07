// ** React Imports
import { forwardRef, useEffect, useState } from 'react'
import axios from 'axios'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'



const FormLayoutsSeparator = () => {
  // ** States
  const [postlink, setPostlink] = useState('')
  const [postedBy, setPostedBy] = useState('');
  const [file,setFile] = useState(null);

  const handleCancel = () => {
    const fileInput = document.querySelector('input[type="file"]');
    fileInput.value = ''; 
    setPostlink('');
    setPostedBy('');
    setFile(null); 
  }

  const handlePostlink = (e) => {
    setPostlink(e.target.value)
  }
  const handlePostedBy = (e) => {
    setPostedBy(e.target.value)
  }
  
  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  // useEffect(() => {
  //   console.log(file)
  // },[file])

  const uploadCollection = async () => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('postlink', postlink)
    formData.append('postedBy', postedBy)
    

    if (collectionName === '' || collectionSubName=== '' || collectionTitle=== '' || collectionType=== '' || collectionDescription=== '' || file=== null) {
      alert('Please fill in all fields and select a file.');
      return;
    }
    // console.log(formData)

    try {
      const response = await axios.post('https://njs.iretiensemble.com/instagram/upload-instagram', formData, {
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        alert('Collection uploaded successfully');
        handleCancel();
      }
    } catch (error) {
      console.error('Error uploading collection:', error);
    }
  }

  return (
    <>
    <Card>
      {/* <ToastContainer /> */}
      <form>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Instagram Post Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth  value={postlink} onChange={handlePostlink} label='Instagram Post Link' placeholder='carterLeonard' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth  value={postedBy} onChange={handlePostedBy} label='Instagram Posted By' placeholder='posted' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField type='file' fullWidth  value={file} onChange={handleFile} />
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button onClick={uploadCollection} size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Upload Instagram Post
          </Button>
          <Button onClick={handleCancel} size='large' color='secondary' variant='outlined'>
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
    {/* <ToastContainer /> */}
    </>
  )
}

export default FormLayoutsSeparator
