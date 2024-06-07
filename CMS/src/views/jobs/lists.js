import React, {useState, useEffect} from 'react'
import axios from 'axios'
// import CCard from '@coreui/react/src/components/card/CCard'
import {CCard, CCardBody, CCardImage, CCardText, CCardTitle, CButton} from "@coreui/react"
import '@coreui/coreui/dist/css/coreui.min.css'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function cardslist() {

  const [jobList,setJobDetail] = useState([]);

  useEffect(() => {
    const fetChJobs = async () => {
      try {
        const response = await axios.get('https://njs.iretiensemble.com/jobs/get-all-job')

        if(response.status === 201 || response.status === 200){
          setJobDetail(response.data.jobs)
        }else{
          console.log('Error fetching data')
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetChJobs();
  }, [jobList]);

  const deleteJobs = async (slug) => {
    // console.log(slug)
    // const data = {slug:slug};
    try {
      const response = await axios.delete('https://njs.iretiensemble.com/jobs/delete-job-by-slug', {
        data:{slug},
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if(response.status === 201 || response.status === 200){
        // console.log('Job Deleted')
        setJobDetail(prevJobList => prevJobList.filter(job => job.slug !== slug));
      }else{
        console.log('Error Deleting Job')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const truncateSummary = (summary) => {
    if (typeof summary !== 'string' || !summary) {
      return ''; // or handle the error as appropriate
    }
    // Split the summary into words
    const words = summary.split(' ');
    // Take the first 100 words
    const truncatedSummary = words.slice(0, 25).join(' ');
    if (words.length > 10) {
      return truncatedSummary + '...';
    }
    return truncatedSummary;
  };


  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleJob = (job) => {
    // console.log(job);
    setSelectedJob(job);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const [jobLocation, setJobLocation] = useState('');
  const [jobSummary, setJobSummary] = useState('');
  const [jobResponsibilities, setJobResponsibilities] = useState('');
  const [basicQualifications, setBasicQualifications] = useState('');
  const [jobQualifications, setJobQualifications] = useState('');
  const [jobOpenings, setJobOpenings] = useState(0);
  const [jobUrl, setJobUrl] = useState('');

  const handleJobLocationChange = (e) => {
    setJobLocation(e.target.value);
  }

  const handleJobOpeningsChange = (e) => {
    setJobOpenings(e.target.value);
  }

  const handleJobUrlChange = (e) => {
    setJobUrl(e.target.value);
  }


  const handleSubmit = async(jobId) => {
    const data = {
      jobId,
      jobLocation:jobLocation,
      openings:jobOpenings,
      jobForm:jobUrl
    }
    // console.log(data)

    try {
      const response = await axios.post('https://njs.iretiensemble.com/jobs/update-job', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if(response.status === 200 || response.status === 201){
        // console.log(response.data)
        alert('Job Updated Successfully')
        setJobLocation('');
        setJobOpenings(0);
        setJobUrl('');
        setOpen(false);
      }else{
        console.log('Error updating job:', response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <div className='CardsContainer'>
      
      {jobList.length !== 0? (
        jobList.map((job) => {
          return (
            <>
            <CCard className="text-center" style={{width: '18rem', marginTop:"5px"}}>
              <CCardBody>
              <CCardTitle>{job.jobTitle}</CCardTitle>
              <CCardText>{truncateSummary(job.jobDesc[0]['Job Summary'])}</CCardText>
              <CButton onClick={() => handleJob(job)} color="primary" href="#">Update Job Post</CButton>
              <CButton onClick={()=>deleteJobs(job.slug)} style={{marginTop:"5px"}} color="danger" href="#">Delete Job</CButton>
              </CCardBody>
            </CCard>

            {open && selectedJob && (
              <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={12}>
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
                      <TextField value={jobUrl} onChange={handleJobUrlChange} fullWidth  label='URL Link' placeholder='Job Form Link' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField value={jobOpenings} onChange={handleJobOpeningsChange}  fullWidth type='number' label='Openings' placeholder='Job Openings' />
                    </Grid>
                    <CardActions>
                      <Button onClick={() => handleSubmit(selectedJob.jobId)}  size='medium' type='submit' style={{width:"100%"}} variant='contained'>
                        Job Update
                      </Button>
                    </CardActions>
                  </Grid>
                </Box>
              </Modal>
            )}
            </>
          )
        })):(
          <div>
            <h1>No Jobs Lists</h1>
          </div>
        )
      }  
  </div>
  )
}

export default cardslist
