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
  const [couponCode, setCouponCode] = useState('')
  const [couponPercentage, setCouponPercentage] = useState(0)
  const [couponFlatValue, setCouponFlatValue] = useState(0)
  const [couponType, setCouponType] = useState('')
  const [couponCategory, setCouponCategory] = useState('');
  const [couponCatNum, setCouponCatNum] = useState();
  const [couponDescription, setCouponDescription] = useState('');
  const [couponGrpType, setcouponGrpType] = useState('');

  const handleCancel = () => {
    // const fileInput = document.querySelector('input[type="file"]');
    // fileInput.value = ''; 
    setCouponCode('');
    setCouponPercentage(0);
    setCouponFlatValue(0);
    setCouponType('');
    setCouponCategory('');
  }

  const handleCouponCode = (e) => {
    setCouponCode(e.target.value)
  }
  const handleCouponPercentage = (e) => {
    setCouponPercentage(e.target.value)
  }
  const handleCouponFlatValue = (e) => {
    setCouponFlatValue(e.target.value)
  }
  const handleCouponType = (e) => {
    setCouponType(e.target.value);

    if(e.target.value === 'percentval'){
        setCouponCatNum(true);
    }else if(e.target.value === 'flatval'){
        setCouponCatNum(false);
    }else{
        setCouponCatNum(null);
    }
  }
  const handleCouponCategory = (e) => {
    setCouponCategory(e.target.value)
  }
  const handleCouponGrpCategory =(e) => {
    setcouponGrpType(e.target.value);
  }
  const handleCouponDescription = (e) => {
    setCouponDescription(e.target.value)
  }


  const uploadCollection = async () => {
    const data = {
        couponCode: couponCode,
        couponPercentage: couponPercentage,
        couponFlatValue: couponFlatValue,
        couponType: couponType,
        couponCategory: couponCategory,
        couponDescription: couponDescription,
        couponGrpType:couponGrpType
    }
    // console.log(data)

    try {
      const response = await axios.post('https://njs.iretiensemble.com/orders/add-coupon', data, {
        headers:{
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201 || response.status === 200) {
        alert('Coupon uploaded successfully');
        handleCancel();
      }
    } catch (error) {
      console.error('Error uploading Coupon:', error);
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
                Coupons Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    {/* <InputLabel id='form-layouts-separator-multiple-select-label'>Coupon Code</InputLabel> */}
                    <TextField fullWidth  value={couponCode} onChange={handleCouponCode} label='Coupon Code' placeholder='IRETI10' />
                </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-multiple-select-label'>Coupon Type</InputLabel>
                    <Select
                        value={couponType}
                        onChange={handleCouponType}
                        id='form-layouts-separator-multiple-select'
                        labelId='form-layouts-separator-multiple-select-label'
                        input={<OutlinedInput label='Language' id='select-multiple-language' />}
                    >
                      <MenuItem value='flatval'>Discount In Flat Values</MenuItem>
                      <MenuItem value='percentval'>Discount In Percentage</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-multiple-select-label'>Coupon Group Type</InputLabel>
                    <Select
                        value={couponGrpType}
                        onChange={handleCouponGrpCategory}
                        id='form-layouts-separator-multiple-select'
                        labelId='form-layouts-separator-multiple-select-label'
                        input={<OutlinedInput label='Language' id='select-multiple-language' />}
                    >
                      <MenuItem value='friendsfamily'>Family & Friends</MenuItem>
                      <MenuItem value='commonuser'>Common User</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            {!couponCatNum && <Grid item xs={12} sm={6}>
              <TextField fullWidth type='number' value={couponFlatValue} onChange={handleCouponFlatValue} label='Coupon Discount Flat Value' placeholder='₹ 100' />
            </Grid>}
            {couponCatNum && <Grid item xs={12} sm={6}>
              <TextField fullWidth type='number' value={couponPercentage} onChange={handleCouponPercentage} label='Coupon Percentage Value' placeholder='10%' />
            </Grid>}
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-multiple-select-label'>Coupon Category</InputLabel>
                    <Select
                    // multiple
                    value={couponCategory}
                    onChange={handleCouponCategory}
                    id='form-layouts-separator-multiple-select'
                    labelId='form-layouts-separator-multiple-select-label'
                    input={<OutlinedInput label='Language' id='select-multiple-language' />}
                    >
                        <MenuItem value='all'>ANY</MenuItem>
                        <MenuItem value='6000to9000'>MID RANGE</MenuItem>
                        <MenuItem value='9000above'>HIGH RANGE</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
                <TextField
                    fullWidth
                    multiline
                    // disabled={stateReadOnly1?true:false}
                    value={couponDescription}
                    onChange={handleCouponDescription}
                    minRows={3}
                    label='Coupon Description Info.'
                    placeholder={'Coupon Description'}
                    // sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                        </InputAdornment>
                    )
                    }}
                />
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button onClick={uploadCollection} size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Upload Coupon
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
