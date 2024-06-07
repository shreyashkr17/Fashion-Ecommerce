import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import CCard from '@coreui/react/src/components/card/CCard'
import {CCard, CCardBody, CCardImage, CCardText, CCardTitle, CButton} from "@coreui/react"
import '@coreui/coreui/dist/css/coreui.min.css'
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
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const fetchPosts = async ()=>{
      try {
        const response = await axios.get('https://njs.iretiensemble.com/posts/get-all-posts');

        if(response.status === 200 ||response.status === 201){
          // console.log(response.data.posts)
          setBlog(response.data.posts)
        }else{
          console.log('error')
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchPosts();
  });

  const deletePost = async (slug) => {
    const data = {slug:slug}
    try {
      const response = await axios.post('https://njs.iretiensemble.com/posts/delete-post', data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if(response.status === 200 || response.status === 201){
        // console.log(response.data)
        alert('Post deleted successfully');
        setBlog(prevState => prevState.filter(item => item.slug !== slug))
      }else{
        console.log('Error deleting post:', response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }


  const [open, setOpen] = useState(false);
  const [selectBlogs, setSelectBlogs] = useState(null);

  const handleOpen = (post) => {
    // console.log(post)
    setOpen(true);
    setSelectBlogs(post);
  }

  const handleClose = () => {
    setOpen(false);
  }

  // const [postId, setPostId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitle = (e) => {
    setTitle(e.target.value);
  }

  const handleContent = (e) => {
    setContent(e.target.value);
  }

  const handleUpdateBlogs = async (postId) => {
    const data = {postId:postId, title:title, content:content}
    try {
      const response = await axios.post('https://njs.iretiensemble.com/posts/update-post', data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if(response.status === 200 || response.status === 201){
        // console.log(response.data)
        alert('Post updated successfully');
        setTitle('');
        setContent('');
        setOpen(false);
      }else{
        console.log('Error updating post:', response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='CardsContainer'>
    {blog.length !== 0 ? (
      blog.map((post, index) => {
      return (
        <>
        <CCard style={{ width: '18rem', marginTop:"20px"  }}>
          <CCardImage orientation="top" src={post.image[0]} style={{width:"100px", backgroundSize:"cover"}}/>
          <CCardBody>
            <CCardTitle>{post.title}</CCardTitle>
            <CCardText>
              {post.content.split(' ').slice(0, 20).join(' ')}
            </CCardText>
            <CButton onClick={() => handleOpen(post)} color="secondary" href="#" style={{marginRight:"10px"}}>Update Post</CButton>
            <CButton onClick={() => deletePost(post.slug)}  color="danger" href="#">Delete Post</CButton>
          </CCardBody>
        </CCard>

        {open && selectBlogs && (
          <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {/* {selectBlogs.title} */}
              <TextField value={title} onChange={handleTitle} style={{ width:"100%"}} label='Blog Title' placeholder={selectBlogs.title}/>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                value={content}
                onChange={handleContent}
                fullWidth
                multiline
                minRows={5}
                label='Blog Content'
                placeholder={selectBlogs.content}
                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
              />
              </Typography>
              <CardActions>
                <Button onClick={()=>handleUpdateBlogs(selectBlogs.postId)} size='large' type='submit' style={{width:"100%"}} variant='contained'>
                  Update Blog
                </Button>
              </CardActions>
            </Box>
          </Modal>
        )}
        </>
      )
    })):(
      <div>
        <h1>No Blogs  Lists</h1>
      </div>
    )}
  </div>
  )
}

export default cardslist
