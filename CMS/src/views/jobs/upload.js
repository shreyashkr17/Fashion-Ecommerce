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

import MessageOutline from 'mdi-material-ui/MessageOutline'
import Select from '@mui/material/Select'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Job Posting Date' autoComplete='off' />
});

function titleToSlug(title){
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

const FormLayoutsSeparator = () => {

  const parseJobQualifications = (inputString) => {
    const qualificationsArray = inputString.slice(1, -1).split('","');
    return qualificationsArray;
  };
  // ** States
  const [jobTitle, setJobTitle] = useState('');
  const [slug,setSlug] = useState('')
  const [jobLocation, setJobLocation] = useState('');
  const [jobCategory, setJobCategory] = useState('');
  const [jobCategoryType, setJobCategoryType] = useState('');
  const [jobSummary, setJobSummary] = useState('');
  const [jobResponsibilities, setJobResponsibilities] = useState('');
  const [basicQualifications, setBasicQualifications] = useState('');
  const [jobQualifications, setJobQualifications] = useState('');
  const [jobFormLink, setJobFormLink] = useState('');
  const [jobOpenings, setJobOpenings] = useState(0);


  const handleJobTitleChange = (e) => {
    setJobTitle(e.target.value);
  }

  const handleSlugChange = (e) => {
    setSlug(e.target.value);
  }

  const handleJobLocationChange = (e) => {
    setJobLocation(e.target.value);
  }

  const handleJobSummaryChange = (e) => {
    setJobSummary(e.target.value);
  }

  const handleJobResponsibilitiesChange = (e) => {
    setJobResponsibilities(e.target.value);
  }

  const handleBasicQualificationsChange = (e) => {
    setBasicQualifications(e.target.value);
  }

  const handleJobQualificationsChange = (e) => {
    setJobQualifications(parseJobQualifications(e.target.value));
  }

  const handleJobFormLinkChange = (e) => {
    setJobFormLink(e.target.value);
  }

  const handleJobOpeningsChange = (e) => {
    setJobOpenings(e.target.value);
  }
  // useEffect(() => {
  //   console.log(jobQualifications);
  // }, [jobQualifications])


  const handleCategoryChangeCategory = (event) => {
    // const selectedCategory = event.target.value;
    // const newSelectedCategories = jobCategory.map((category) => ({
    //   name: category,
    //   slug: category.toLowerCase().replace(/\s+/g, '-'),
    //   _typename:"Category"
    // }));
    setJobCategory(event.target.value);
  }
  const handleCategoryChangeType = (event) => {
    // const selectedCategory = event.target.value;
    // const newSelectedCategories = jobCategoryType.map((category) => ({
    //   name: category,
    //   slug: category.toLowerCase().replace(/\s+/g, '-'),
    //   _typename:"Type"
    // }));
    setJobCategoryType(event.target.value);
  }

  const handelReset = () => {
    setJobTitle('');
    setSlug('');
    setJobLocation('');
    setJobCategory('');
    setJobCategoryType('');
    setJobSummary('');
    setJobResponsibilities('');
    setBasicQualifications('');
    setJobQualifications('');
    setJobFormLink('');
    setJobOpenings(0);
  }

  const handleSubmit = async () => {
    try {
      const date = new Date().toISOString().split('T')[0];

      try {
        const jobData = {
          jobTitle:jobTitle,
          slug:slug,
          jobLocation:jobLocation,
          jobCategory:[{"name":jobCategory, "slug":titleToSlug(jobCategory), "_typename":"Type"}, {"name":jobCategoryType, "slug":titleToSlug(jobCategoryType), "_typename":"Category"}],
          jobDesc:[
            {"Job Summary":jobSummary},
            {"Key Job Responsibilities":jobResponsibilities},
            {"Basic Qualifications":basicQualifications}
          ],
          openings:jobOpenings,
          jobQualifications:jobQualifications,
          jobForm:jobFormLink,
          postedDate:date
        }

        const response = await axios.post('https://njs.iretiensemble.com/jobs/job-post', jobData, {
          headers: {
            'Content-Type': 'application/json',
          }
        })

        if(response.status === 200 || response.status === 201){
          alert("Job Uploaded Successfully");
          handelReset();
          // console.log('Job Uploaded');
        }
      } catch (error) {
        console.log(error);
      }

      // console.log(jobData);
    } catch (error) {
      console.log(error);
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
                Job Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField value={jobTitle} onChange={handleJobTitleChange} fullWidth label='Job Title' placeholder='carterLeonard' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField value={slug} onChange={handleSlugChange} fullWidth label='Job Slug' placeholder='e.g. software-engineer-internship' />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-multiple-select-label'>Job Location</InputLabel>
                    <Select
                      // multiple
                      value={jobLocation}
                      onChange={handleJobLocationChange}
                      id='form-layouts-separator-multiple-select'
                      labelId='form-layouts-separator-multiple-select-label'
                      input={<OutlinedInput label='Language' id='select-multiple-language' />}
                    >
                      <MenuItem value='Bangalore, KA, IND'>Bangalore, KA, IND</MenuItem>
                      <MenuItem value='Hyderabad, TL, IND'>Hyderabad, TL, IND</MenuItem>
                      <MenuItem value='Chennai, TN, IND'>Chennai, TN, IND</MenuItem>
                      <MenuItem value='Gurugram, HR, IND'>Gurugram, HR, IND</MenuItem>
                      <MenuItem value='Kolkata, WB, IND'>Kolkata, WB, IND</MenuItem>
                      <MenuItem></MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-multiple-select-label'>Job Category</InputLabel>
                    <Select
                      value={jobCategory}
                      onChange={handleCategoryChangeCategory}
                      id='form-layouts-separator-multiple-select'
                      labelId='form-layouts-separator-multiple-select-label'
                      input={<OutlinedInput label='Language' id='select-multiple-language' />}
                    >
                      <MenuItem value='Software Engineering'>Software Engineering</MenuItem>
                      <MenuItem value='Sales Administrative'>Sales Administrative</MenuItem>
                      <MenuItem value='Business Analyst'>Business Analyst</MenuItem>
                      <MenuItem value='UI/UX Designer'>UI/UX Designer</MenuItem>
                      <MenuItem value='Executive Management'>Executive Management</MenuItem>
                      <MenuItem></MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-multiple-select-label'>Job Type</InputLabel>
                    <Select
                      value={jobCategoryType}
                      onChange={handleCategoryChangeType}
                      id='form-layouts-separator-multiple-select'
                      labelId='form-layouts-separator-multiple-select-label'
                      input={<OutlinedInput label='Language' id='select-multiple-language' />}
                    >
                      <MenuItem value='Full Time'>Full Time</MenuItem>
                      <MenuItem value='Part Time'>Part Time</MenuItem>
                      <MenuItem value='Internship'>Internship</MenuItem>
                      <MenuItem></MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>
            <Grid item xs={12} sm={12}>
                <TextField
                    fullWidth
                    value={jobSummary}
                    onChange={handleJobSummaryChange}
                    multiline
                    minRows={3}
                    label='Job Summary'
                    placeholder='Job Summary'
                    sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                        {/* <MessageOutline /> */}
                        </InputAdornment>
                    )
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <TextField
                    fullWidth
                    value={jobResponsibilities}
                    onChange={handleJobResponsibilitiesChange}
                    multiline
                    minRows={3}
                    label='Key Job Responsibilities'
                    placeholder='Job Responsibilities'
                    sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                        {/* <MessageOutline /> */}
                        </InputAdornment>
                    )
                    }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
                <TextField
                    fullWidth
                    multiline
                    value={basicQualifications}
                    onChange={handleBasicQualificationsChange}
                    minRows={3}
                    label='Basic Qualifications'
                    placeholder='Basic Qualifications'
                    sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                        {/* <MessageOutline /> */}
                        </InputAdornment>
                    )
                    }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
                <TextField
                    fullWidth
                    multiline
                    value={jobQualifications}
                    onChange={handleJobQualificationsChange}
                    minRows={3}
                    label='Job Qualifications'
                    placeholder='Job Qualifications'
                    sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                        {/* <MessageOutline /> */}
                        </InputAdornment>
                    )
                    }}
              />
            </Grid>
            {/* <Grid item xs={12} sm={12}>
              <TextField fullWidth placeholder='Carter' variant="outlined" type="file" inputProps={{multiple: true}} />
            </Grid> */}
            <Grid item xs={12} sm={12}>
              <TextField value={jobFormLink} onChange={handleJobFormLinkChange} fullWidth  label='URL Link' placeholder='Job Form Link' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField value={jobOpenings} onChange={handleJobOpeningsChange} fullWidth type='number' label='Openings' placeholder='Job Openings' />
            </Grid>
            
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button onClick={handleSubmit} size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Job Upload
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
