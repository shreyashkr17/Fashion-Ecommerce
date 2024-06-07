// ** React Imports
import { forwardRef, useState, useEffect } from 'react'
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

import MessageOutline from 'mdi-material-ui/MessageOutline'
import Select from '@mui/material/Select'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Post Date' autoComplete='off' />
})

function titleToSlug(title){
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

const FormLayoutsSeparator = () => {
  // ** States
  const [date, setDate] = useState(null)

  const [values, setValues] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  

  const [title, setTitles] = useState('');
  const [type, setType] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [comments, setComments] = useState(0);
  // const [files, setFiles] = useState([])

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    const newSelectedCategories = selectedCategory.map((category) => ({
      name: category,
      slug: category.toLowerCase().replace(/\s+/g, '-'),
    }));
    setSelectedCategories(newSelectedCategories);
  }

  const handleTitleChange = (e)=>{
    setTitles(e.target.value)
  }

  const handleTypeChange = (e)=>{
    setType(e.target.value)
  }

  const handleAuthorChange = (e)=>{
    setAuthor(e.target.value)
  }

  const handleContentChange = (e)=>{
    setContent(e.target.value)
  }

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFiles(files);
  };

  useEffect(()=>{
    // console.log(selectedCategories)
    // console.log(files)
  },[selectedCategories, files]);

  const handleCancel = ()=> {
    const fileInput = document.querySelector('input[type="file"]');
    fileInput.value = '';
    setTitles('');
    setType('');
    setAuthor('');
    setContent('');
    setFiles([]);
    setSelectedCategories([]);
    setComments(0);
  }

  
  // console.log(slug)

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('type', type);
    formData.append('author', author);
    formData.append('content', content);
    formData.append('blog_categories', JSON.stringify(selectedCategories));
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    const slug = titleToSlug(title);
    formData.append('slug', slug);
    const date = new Date().toISOString().split('T')[0];
    // console.log(date)
    formData.append('date', date);
    formData.append('comments', comments);

    try {
      const response = await axios.post('https://njs.iretiensemble.com/posts/upload-post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if(response.status === 200 ||response.status === 201){
        alert("Post uploaded successfully")
        handleCancel();
        // console.log(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <Card>
      {/* <CardHeader title='Multi Column with Form Separator' titleTypographyProps={{ variant: 'h6' }} /> */}
      {/* <Divider sx={{ margin: 0 }} /> */}
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Post Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField value={title} onChange={handleTitleChange} fullWidth label='Post Title' placeholder='carterLeonard' />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-multiple-select-label'>Post Type</InputLabel>
                    <Select
                      value={type}
                      onChange={handleTypeChange}
                      id='form-layouts-separator-multiple-select'
                      labelId='form-layouts-separator-multiple-select-label'
                      input={<OutlinedInput label='Language' id='select-multiple-language' />}
                    >
                    <MenuItem value='English'>Image Post</MenuItem>
                    <MenuItem value='French'>Video Post</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth value={author} onChange={handleAuthorChange} label='Post Author' placeholder='carterLeonard' />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                id='form-layouts-separator-date'
                onChange={date => setDate(date)}
              />
            </Grid> */}
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>
            <Grid item xs={12} sm={12}>
                <TextField
                    fullWidth
                    multiline
                    minRows={5}
                    value={content}
                    onChange={handleContentChange}
                    label='Blog Content'
                    placeholder='Content...'
                    sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                        </InputAdornment>
                    )
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField fullWidth placeholder='Carter' variant="outlined" type="file" inputProps={{multiple: true}} onChange={handleFileChange} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Blog Categories</InputLabel>
                <Select
                  multiple
                  label='Category'
                  value={selectedCategories.map((category) => category.name)}
                  onChange={handleCategoryChange}
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value='Shopping'>Shopping</MenuItem>
                  <MenuItem value='Fashion'>Fashion</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button onClick={handleSubmit} size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Submit
          </Button>
          <Button size='large' color='secondary' variant='outlined'>
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormLayoutsSeparator
