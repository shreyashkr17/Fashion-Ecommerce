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
import {ThreeDots} from 'react-loader-spinner'



const FormLayoutsSeparator = () => {
  // ** States
  const [collectionName, setCollectionName] = useState('')
  const [collectionSubName, setCollectionSubName] = useState('')
  const [collectionTitle, setCollectionTitle] = useState('')
  const [collectionType, setCollectionType] = useState('')
  const [collectionDescription, setCollectionDescription] = useState('')
  const [file, setFile] = useState(null);
  const [loader, setLoader] = useState(false);

  const handleCancel = () => {
    const fileInput = document.querySelector('input[type="file"]');
    fileInput.value = ''; 
    setCollectionName('');
    setCollectionSubName('');
    setCollectionTitle('');
    setCollectionType('');
    setCollectionDescription('');
    setFile(null); 
  }

  const handleCollectionName = (e) => {
    setCollectionName(e.target.value)
  }
  const handleCollectionSubName = (e) => {
    setCollectionSubName(e.target.value)
  }
  const handleCollectionTitle = (e) => {
    setCollectionTitle(e.target.value)
  }
  const handleCollectionType = (e) => {
    setCollectionType(e.target.value)
  }
  const handleCollectionDescription = (e) => {
    setCollectionDescription(e.target.value)
  }
  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  useEffect(() => {
    console.log(collectionName, collectionSubName, collectionTitle, collectionType, collectionDescription, file)
  },[file])

  const uploadCollection = async () => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('collectionName', collectionName)
    formData.append('collectionSubName', collectionSubName)
    formData.append('collectionTitle', collectionTitle)
    formData.append('collectionType', collectionType)
    formData.append('collectionDescription', collectionDescription)
    

    if (collectionName === '' || collectionSubName=== '' || collectionTitle=== '' || collectionType=== '' || collectionDescription=== '' || file=== null) {
      alert('Please fill in all fields and select a file.');
      return;
    }
    // console.log(formData)

    try {
      setLoader(true);
      const response = await axios.post('https://njs.iretiensemble.com/collections/post-collection', formData, {
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        setLoader(false);
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
      
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Collections Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-multiple-select-label'>Collection Name</InputLabel>
                    <Select
                    // multiple
                    value={collectionName}
                    onChange={handleCollectionName}
                    id='form-layouts-separator-multiple-select'
                    labelId='form-layouts-separator-multiple-select-label'
                    input={<OutlinedInput label='Language' id='select-multiple-language' />}
                    >
                      <MenuItem value='BySeasons'>By Seasons</MenuItem>
                      <MenuItem value='Harshita'>Harshita X AFRA</MenuItem>
                      <MenuItem></MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-multiple-select-label'>Collection Sub Name</InputLabel>
                    <Select
                    // multiple
                    value={collectionSubName}
                    onChange={handleCollectionSubName}
                    id='form-layouts-separator-multiple-select'
                    labelId='form-layouts-separator-multiple-select-label'
                    input={<OutlinedInput label='Language' id='select-multiple-language' />}
                    >
                      <MenuItem value='ss2024'>Summer Season 2024</MenuItem>
                      <MenuItem value='SemiColon'>AFRA</MenuItem>
                      <MenuItem></MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth  value={collectionTitle} onChange={handleCollectionTitle} label='Collection Title' placeholder='carterLeonard' />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-multiple-select-label'>Collection Category</InputLabel>
                    <Select
                    // multiple
                    value={collectionType}
                    onChange={handleCollectionType}
                    id='form-layouts-separator-multiple-select'
                    labelId='form-layouts-separator-multiple-select-label'
                    input={<OutlinedInput label='Language' id='select-multiple-language' />}
                    >
                      <MenuItem value='image'>Images</MenuItem>
                      <MenuItem value='video'>Videos</MenuItem>
                      <MenuItem></MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>
            <Grid item xs={12} sm={12}>
                <TextField
                  value={collectionDescription}
                  onChange={handleCollectionDescription}
                  fullWidth
                  multiline
                  minRows={5}
                  label='Collection Description'
                  placeholder='Description'
                  sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                  InputProps={{
                  startAdornment: (
                      <InputAdornment position='start'>
                      </InputAdornment>
                  )}}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField onChange={handleFile} fullWidth type='file'  label='' placeholder='Job Form Link' />
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button onClick={uploadCollection} size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            {loader? <ThreeDots color='white' height="24" width="40"/>:"Upload Collections"}
          </Button>
          <Button onClick={handleCancel} size='large' color='secondary' variant='outlined'>
            Cancel
          </Button>
        </CardActions>
      
    </Card>
    {/* <ToastContainer /> */}
    </>
  )
}

export default FormLayoutsSeparator
