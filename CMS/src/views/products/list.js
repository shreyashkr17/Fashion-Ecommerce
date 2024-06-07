import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import CCard from '@coreui/react/src/components/card/CCard'
import {CCard, CCardBody, CCardImage, CCardText, CCardTitle, CButton} from "@coreui/react"
import '@coreui/coreui/dist/css/coreui.min.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Padding } from '@mui/icons-material';
import Grid from '@mui/material/Grid'
import { Card } from '@mui/material';
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function cardslist({handleDeleteProduct}) {

  const [productDetails, setProductDetails] = useState([]);
  const [detailModal, setDetailModal] = useState(false);
  const [selectProduct, setSElectedProduct] = useState(null);
  
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [allProductNames,setAllProductNames] = useState();

  const [productAddInfo, setProductAddInfo] = useState('');

  const handleOpen = (product) => {
    // console.log(product)
    setSElectedProduct(product);
    setDetailModal(true);
  }

  const handleRelatedProductInfo = (e) => {
    const selectedProduct = e.target.value;
    const newRelatedProducts = selectedProduct.map((productName) =>({
      name: productName,
      slug: allProductNames.find(product => product.productName === productName)?.productSlug || "",
    }));
    setRelatedProduct(newRelatedProducts);
  }

  useEffect(() => {
    const fetchProductNames = async () => {
      try {
        const response = await axios.get('https://njs.iretiensemble.com/products/get-all-product-names', {
          headers:{
            'Content-Type': 'application/json',
          }
        });

        if(response.status === 200 || response.status === 201){
          // console.log(response.data.productDetails)
          setAllProductNames(response.data.productDetails);
        }else{
          // console.log(response.data);
          setAllProductNames([]);
        }
      } catch (error) {
        console.log(error);
        setAllProductNames([]);
      }
    };

    fetchProductNames();
  },[])

  const handleClose = () => {
    setDetailModal(false);
  }

  useEffect(() => {
    const fetchProductDetails = async() => {
      try {
        const response = await axios.get('https://njs.iretiensemble.com/products/get-all-products');

        if(response.status === 200 || response.status === 201){
          // console.log('Product Details:', response.data.products)
          setProductDetails(response.data.products);
        }else{
          console.log('Error fetching Details.');
        }
      } catch (error) {
        console.log('Error fetching Details.', error);
      }
    }

    fetchProductDetails();
  },[]);

  const handleUpdateProduct = async (productId) => {
    const data = {productId, relatedProduct, productAddInfo}
    try {
      const response = await axios.post('https://njs.iretiensemble.com/products/update-related-product', data, {
        headers:{
          'Content-Type': 'application/json',
        }
      });

      if(response.status === 200 || response.status === 201){
        // console.log('Product Updated:', response.data.message);
        alert('Product Updated:', response.data.message);
        setProductAddInfo('');
        setAllProductNames([]);
        setDetailModal(false);
      }
    } catch (error) {
      alert('Product Not Updated Successfully');
      console.log('Error Updating Product.', error);
    }
  }

  return (
    <div className='CardsContainer2'>
      {productDetails.length  !== 0 ?
        (productDetails.map((product) => {
          return (
            <>
              <CCard style={{ width: '20rem', marginTop:"20px", cursor:"pointer"}} onClick={()=>handleOpen(product)}>
                {/* <CCardImage orientation="top" src="https://images.unsplash.com/photo-1712415341931-96aff76a42e9?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" /> */}
                <CCardBody>
                  <CCardTitle>{product.productName}</CCardTitle>
                  <CCardText>
                    {product.productshortDesc.split(' ').slice(0, 20).join(' ')}...
                  </CCardText>
                  {product.productSalePrice>0 ?(<><CCardText style={{fontSize:"0.85rem", color:"grey"}}>
                    <del>₹ {product.productPrice}</del>
                  </CCardText>
                  <CCardText>
                    <strong>₹ {product.productsalePrice}</strong>
                  </CCardText></>):(<><CCardText style={{fontSize:"0.85rem", color:"grey"}}>
                    <strong>₹ {product.productPrice}</strong>
                  </CCardText></>)}
                  <CButton color="secondary" href="#" style={{marginRight:"10px"}}>Update Details</CButton>
                  <CButton onClick={() => handleDeleteProduct(product.productSlug)}  color="danger" href="#">Delete Post</CButton>
                </CCardBody>
              </CCard>

              {detailModal && selectProduct && (
                <Modal open={detailModal} onClose={handleClose} aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      {selectProduct.productName}
                    </Typography>
                    <Grid container spacing={5}>
                      <Grid item xs={12} sm={12}>
                        <FormControl fullWidth>
                          <InputLabel id='form-layouts-separator-multiple-select-label'>Related Products</InputLabel>
                          <Select
                            multiple
                            onChange={handleRelatedProductInfo}
                            placeholder={ `${relatedProduct.map((category) => category.name)}` }
                            value={relatedProduct.map(product => product.name)}
                            id='form-layouts-separator-multiple-select'
                            labelId='form-layouts-separator-multiple-select-label'
                            input={<OutlinedInput label='Language' id='select-multiple-language' />}
                          >
                            {allProductNames && allProductNames.map((product, index) => (
                              <MenuItem key={index} value={product.productName}>
                                {product.productName !== selectProduct.productName && product.productName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          fullWidth
                          multiline
                          minRows={3}
                          value={productAddInfo}
                          onChange={(e) => setProductAddInfo(e.target.value)}
                          label='Product Descriptions'
                          InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Button onClick={() => handleUpdateProduct(selectProduct.productId)} className='mt-3' variant='contained'>Update Details</Button>
                  </Box>
                </Modal>
              )}
            </>
          )
      })):(
        <div>
          <h2>No Product Listed</h2>
        </div>
      )}
  </div>
  )
}

export default cardslist
