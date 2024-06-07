import React, {useEffect, useState} from 'react'
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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function cardslist() {
  const [collectionDetail, setCollectionDetail] = useState([]);

  useEffect(() => {
    const collectionFetch = async () => {
      try {
        const response = await axios.get('https://njs.iretiensemble.com/collections/get-collection');

        if (response.status === 200) {
          setCollectionDetail(response.data.collections);
        }else{
          console.log('Error');
        }
      } catch (error) {
        console.error('Error fetching collection:', error);
      }
    }

    collectionFetch();
  },[])

  const deleteCollection = async (id) =>{
    try {
      const data = {collectionId:id}
      const response = await axios.post('https://njs.iretiensemble.com/collections/delete-collection', data);

      if(response.status === 200){
        alert('Collection deleted successfully');
        setCollectionDetail(prevState => prevState.filter(item => item.collectionId !== id));
      }else{
        console.log('Error deleting collection:', response.data);
      }
    } catch (error) {
      console.error('Error deleting collection:', error);
    }
  }

  // console.log(collectionDetail.map((collection) => {
  //   return (
  //     console.log(collection)
  //   )
  // }));

  const [updateModal, setUpdateModal] = useState(false);
  const [selectedCol, setSelectedCol] = useState(null);

  const handleOpen = (collection) => {
    // console.log(collection);
    setUpdateModal(true);
    setSelectedCol(collection);
  }
  const handleClose = () => {
    setUpdateModal(false);
  }

  const [collectionTitle, setCollectionTitle] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');
  // const [open, setOpen] = useState(false);
  const [collectionSubName, setCollectionSubName] = useState('');
  const [collectionId, setCollectionId] = useState('');

  const handleCollectionTitle = (e) => {
    setCollectionTitle(e.target.value)
  }

  const handleCollectionDescription = (e) => {
    setCollectionDescription(e.target.value)
  }

  const handleCollectionSubName = (e) => {
    setCollectionSubName(e.target.value)
  }

  const handleUpdateCollection = async (id) => {
    const data = {
      collectionId: id,
      collectionTitle: collectionTitle,
      collectionDescription: collectionDescription,
      collectionSubName: collectionSubName
    }
    try {
      const response = await axios.post('https://njs.iretiensemble.com/collections/update-collection', data);
      if(response.status === 200 || response.status === 201){
        // console.log(response.data)
        alert('Collection updated successfully');
        setUpdateModal(false);
      }
    } catch (error) {
      console.error('Error updating collection:', error);
    }
  }


  return (
    <div className='CardsContainer2'>
      {collectionDetail.length !== 0? (
        collectionDetail.map((collection) => {
          return (
            <>
            <CCard style={{ width: '20rem', marginTop:"20px", cursor:"pointer"}} >
              <CCardImage orientation="top" src={collection.collectionSrcURl} />
              <CCardBody >
                <div style={{marginBottom:"10px"}} >
                <CCardTitle>{collection.collectionTitle}</CCardTitle>
                <CCardText>
                  {collection.colectionDescription.split(' ').slice(0, 30).join(' ')}...
                </CCardText>
                </div>
                <CButton onClick={() => handleOpen(collection)} color="secondary" href="#" style={{marginRight:"10px"}}>Update Details</CButton>
                <CButton color="danger" href="#" onClick={()=>deleteCollection(collection.collectionId)}>Delete Post</CButton>
              </CCardBody>
            </CCard>
            {updateModal && selectedCol && (
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    <TextField value={collectionTitle} onChange={handleCollectionTitle} style={{ width:"100%"}} label='Collection Title' placeholder={selectedCol.collectionTitle}/>
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <TextField
                      value={collectionDescription}
                      onChange={handleCollectionDescription}
                      fullWidth
                      multiline
                      minRows={5}
                      label='Collection Description'
                      placeholder={selectedCol.colectionDescription}
                      sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                    />
                  </Typography>
                  <InputLabel style={{marginTop:"10px", width:"100%"}} id='form-layouts-separator-multiple-select-label'>Collection Sub Name</InputLabel>
                  <Select
                    value={collectionSubName}
                    onChange={handleCollectionSubName}
                    style={{marginTop:"10px", width:"100%"}}
                    input={<OutlinedInput label='Language' id='select-multiple-language' />}
                  >
                    <MenuItem value='ss2024'>Summer Season 2024</MenuItem>
                    <MenuItem value='af2024'>Autumn Fall 2024</MenuItem>
                    <MenuItem value='ws2024'>Winter Season 2024</MenuItem>
                  </Select>
                  <CardActions>
                    <Button onClick={()=>handleUpdateCollection(selectedCol.collectionId)} size='large' type='submit' style={{width:"100%"}} variant='contained'>
                      Update Collections
                    </Button>
                  </CardActions>
                </Box>
              </Modal>
            )}
            {/* {open && collectionch && (
                <Modal
                  open={open}
                  onClose={handleCloseModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      {collectionch.collectionTitle}
                    </Typography>
                    <Typography>
                      <strong>{collectionch.collectionName}</strong>-{collectionch.collectionSubName}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      {collectionch.colectionDescription}
                    </Typography>
                    <Typography>
                      <img src={collectionch.collectionSrcURl} alt="collection" style={{width:"100%", marginTop:"10px"}}/>
                    </Typography>
                  </Box>
                </Modal>
            )} */}
            </>
          )
        })):(
          <div>
            <h1>No Collection Lists</h1>
          </div>
        )
      }
  </div>
  )
}

export default cardslist
