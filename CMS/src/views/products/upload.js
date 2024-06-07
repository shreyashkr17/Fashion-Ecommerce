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
import { ColorPicker } from 'primereact/colorpicker'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import colorNamer from 'color-namer'
import {ThreeDots} from 'react-loader-spinner'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { set } from 'nprogress'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Job Posting Date' autoComplete='off' />
});

function titleToSlug(title){
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

function hexToColorName(hexcolor){
  const colorInfo = colorNamer(hexcolor);
  const colorName = colorInfo.basic[0].name;
  return colorName.charAt(0).toUpperCase()+colorName.slice(1);;
}
function sizeToSlug(size) {
  switch (size.toLowerCase()) {
      case 'small':
          return 'sm';
      case 'medium':
          return 'md';
      case 'large':
          return 'lg';
      case 'extralarge':
          return 'xl';
      case 'extrasmall':
          return 'xs';
      default:
          return size.toLowerCase();
  }
}

function combineSizeAndQuantity(sizeArray, quantity) {
  const parsedQuantity = parseInt(quantity, 10); 
  return sizeArray.map(sizeItem => ({
    ...sizeItem,
    quantity: parsedQuantity
  }));
}

const FormLayoutsSeparator = ({handleListChange}) => {
  // ** States
  const [language, setLanguage] = useState([])
  const [date, setDate] = useState(null)

  const [values, setValues] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })
  // Handle Select
  const handleSelectChange = event => {
    setLanguage(event.target.value)
  }
  const [loader, setLoader] = useState(false);
  const [productName, setProductName] = useState('');
  const [productSlug, setProductSlug] = useState('');
  const [productshortDesc, setProductShortDesc] = useState('');
  const [productAddInfo, setProductAddInfo] = useState('');
  // const [productShippingInfo, setProductShippingInfo] = useState('');
  //const [relatedProducts, setRelatedProducts] = useState([]);
  const [productFeaturing, setProductFeaturing] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productSalePrice, setProductSalePrice] = useState(0);
  const [productCategory, setProductCategory] = useState([]);
  const [productOccasion, setProductOccasion]= useState([]);
  const [productMaterial, setProductMaterial] = useState([]);
  const [productBrands, setProductBrands] = useState([]);

  const [productTop, setProductTop] = useState(false);
  const [productNew, setProductNew] = useState(false);
  const [producEmbroidered, setProducEmbroidered] = useState(false);

  const [productSell, setProductSell] = useState('');
  const [productSold, setProductSold] = useState(false);
  const [productUntill, setProductUntill] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);

  const [stateProductSm, setStateProductSm] = useState(false);

  const [files, setFiles]=  useState([]);
  const [smDimension,setSmDimension]=useState('');
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [stateProductVariant, setStateProductVariant] = useState(false);
  const [color, setColor] = useState('');
  const [color_name, setColor_name] = useState('');
  const [price, setPrice] = useState(0);
  const [sizes, setSizes] = useState([]);
  const [quantity, setQuantity]=  useState(0);

  const [stateUploadLgPic, setUploadLgPic] = useState(false);
  const [variantSlug, setVariantSlug] = useState('');
  const [lgDimension, setLgDimensions] = useState('')
  const [lgWidth, setLgWidth] = useState(0);
  const [lgHeight, setLgHeight] = useState(0);
  const [lgFiles, setLgFiles] = useState([]);
  
  const [stateReadOnly1, setReadOnly1] = useState(false);
  const [stateReadOnly2, setReadOnly2] = useState(false);
  const [stateReadOnly3, setReadOnly3] = useState(false);


  const [allProductNames,setAllProductNames] = useState();

  const handleProductnameChange = (e) => {
    setProductName(e.target.value);
    setProductSlug(titleToSlug(e.target.value));
  }

  const handleProductShortDesc = (e) => {
    setProductShortDesc(e.target.value);
  }

  const handleProductPrice = (e) => {
    setProductPrice(e.target.value);
  }

  const handleProductSalePrice = (e) => {
    setProductSalePrice(e.target.value);
  }

  const handleProductFeaturing = (e) => {
    setProductFeaturing(e.target.value);
    const selectedFeature = e.target.value;
    switch(selectedFeature){
      case 'New':
        setProductNew(true);
        setProductTop(false);
        setProducEmbroidered(false);
        break;
      case 'Top':
        setProductNew(false);
        setProductTop(true);
        setProducEmbroidered(false);
        break;
      case 'Embroidered':
        setProductNew(false);
        setProductTop(false);
        setProducEmbroidered(true);
        break;
      default:
        setProductNew(false);
        setProductTop(false);
        setProducEmbroidered(false);
    }
  }

  const handleProductCategory = (e) => {
    const productCategory = e.target.value;
    const newSelectedCategories = productCategory.map((category) => ({
      name: category,
      slug: category.toLowerCase().replace(/\s+/g, '-'),
    }));
    setProductCategory(newSelectedCategories);
  }

  const handleProductOccasion = (e) => {
    const productOccasion = e.target.value;
    const newSelectedOccasion = productOccasion.map((occasion) => ({
      name:occasion,
      slug:occasion.toLowerCase().replace(/\s+/g, '-'),
    }));

    setProductOccasion(newSelectedOccasion);
  }

  const handleProductMaterial = (e) =>{
    const productMaterial = e.target.value;
    const newSelectedMaterial = productMaterial.map((material) => ({
      name:material,
      slug:material.toLowerCase().replace(/\s+/g,'-'),
    }));

    setProductMaterial(newSelectedMaterial)
  }

  const handleProductBrands = (e) => {
    const selectedBrands = e.target.value; // Array of selected values
    const newBrandCategory = selectedBrands.map((brand) => ({
      name: brand,
      slug: brand.toLowerCase().replace(/\s+/g, '-'),
    }));

    setProductBrands(newBrandCategory);
  }
  const handleRelatedProductInfo = (e) => {
    const selectedProduct = e.target.value;
    const newRelatedProducts = selectedProduct.map((productName) =>({
      name: productName,
      slug: allProductNames.find(product => product.productName === productName)?.productSlug || "",
    }));
    setRelatedProduct(newRelatedProducts);
  }

  const handleProductSold = (e) => {
    setProductSell(e.target.value);
    const x = e.target.value;
    switch(x){
      case 'Yes':
        setProductSold(true);
        break;
      case 'No':
        setProductSold(false);
        break;
      default:
        setProductSold(false);
    }
  }



  //handle Reset Function for Large Pics
  const handleResetUploadLgPics = () => {
    const specificInput = document.getElementById('PrdocutLgPics');
    if(specificInput){
      specificInput.value = '';
    }

    setLgHeight(0);
    setLgWidth(0);
    setLgDimensions('');
    setLgFiles([]);
  }
  // Handle Reset Function For ADD Variant
  const handleResetAddVariant = () => {
    setSizes([]);
    setQuantity(0);
    setPrice(0);
    setColor('');
    setColor_name('');
  }
  // Handle Reset Function For All Product
  const handleReset = () =>{
    setProductName('');
    setProductSlug('');
    setProductShortDesc('');
    setProductAddInfo('');
    setProductMaterial([]);
    setProductOccasion([]);
    setProductPrice(0);
    setProductSalePrice(0);
    setProductCategory([]);
    setProductBrands([]);
    setProductTop(false);
    setProductNew(false);
    setProducEmbroidered(false);
    setProductFeaturing('');
    setProductSell('');
    setProductSold(false);
    setProductUntill(null);
    setFiles([]);
    setSmDimension('');
    setWidth(0);
    setHeight(0);
    setReadOnly1(false);
    setReadOnly2(false);
    setReadOnly3(false);
    setUploadLgPic(false);
    setVariantSlug('');
    setLgFiles([]);
    setLgWidth(0);
    setLgHeight(0);
    setLgDimensions('');
    setReadOnly1(false);
    setReadOnly2(false);
    setReadOnly3(false);
    setUploadLgPic(false);
    setStateProductVariant(false);
    setStateProductSm(false);
    handleListChange();
  }




  const handleSubmit = async () => {
    
    const data = {
      userId:'093f8ba9-63e0-4546-a117-6d3137ffbff7',
      productName,
      productSlug,
      productshortDesc,
      productSold,
      productTop,
      productNew,
      relatedProducts:relatedProduct,
      productAddInfo:productAddInfo,
      // productShippingInfo:productShippingInfo,
      producEmbroidered,
      productPrice,
      productsalePrice:productSalePrice,
      productCategory,
      productOccasion,
      productMaterial,
      productBrands,
      productUntill
    }
    // console.log(data)
    try {
      setLoader(true);
      const response = await axios.post('https://njs.iretiensemble.com/products/upload-product', data,{
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if(response.status ===200 || response.status ===201){
        setLoader(false);
        alert("Product uploaded successfully");
        handleListChange();
        setReadOnly1(true);
        setStateProductSm(true);
      }else{
        setLoader(false)
        console.log(response.data);
      }
    } catch (error) {
      setLoader(false)
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchAllNames = async () => {
      try {
        setLoader(true);
        const response = await axios.get('https://njs.iretiensemble.com/products/get-all-product-names', {
          headers:{
            'Content-Type': 'application/json',
          }
        });

        if(response.status === 200 || response.status === 201){
          // console.log(response.data.productDetails)
          setLoader(false);
          setAllProductNames(response.data.productDetails);
        }else{
          // console.log(response.data);
          setAllProductNames([]);
        }
      } catch (error) {
        console.log(error);
        setAllProductNames([]);
        setLoader(false)
      }
    }
    fetchAllNames();
  },[])
 
  const handleProductFiles = (e) => {
    const files = e.target.files;
    setFiles(files);
  }

  const handleSmDimensions = (e) => {
    setSmDimension(e.target.value);
    const [width, height] = e.target.value.split('X');
    setWidth(width);
    setHeight(height);
  }

  

  const handleSmProductSubmit = async () => {
    const formData = new FormData();
    formData.append('productSlug', productSlug);
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    formData.append('width', width);
    formData.append('height', height);
    try {
      setLoader(true);
      const response = await axios.post('https://njs.iretiensemble.com/products/upload-sm-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if(response.status === 200 ||response.status === 201){
        setLoader(false);
        alert("Small Thumbnail uploaded successfully")
        setReadOnly2(true);
        setStateProductVariant(true)
      }
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  const handleColorChange = (e) => {
    setColor(e.target.value);
    setColor_name(hexToColorName(e.target.value))
  }

  const handleSizeChange = (e) => {
    const sizes = e.target.value
    const newSizes = sizes.map((item) => ({
      name: item,
      slug: sizeToSlug(item),
    }))
    setSizes(newSizes)
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value)
  }

  const handleVariantPriceChange = (e) => {
    setPrice(e.target.value)
  }

  const handleProductVariant = async()=>{
    
    const variantData = {
      productSlug,
      color,
      color_name,
      price,
      size:combineSizeAndQuantity(sizes, quantity)
    }


    try {
      setLoader(true);
      const response = await axios.post('https://njs.iretiensemble.com/products/add-variant-product', variantData,{
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if(response.status === 200 ||response.status === 201){
        setLoader(false);
        setReadOnly3(true);
        setUploadLgPic(true);
        setVariantSlug(response.data.newVariant.variantSlug);
      }
    } catch (error) {
      setLoader(false);
      console.log(error)
    }
  }


  const handleLgProductFiles = (e) => {
    const files = e.target.files;
    setLgFiles(files);
  }

  const handleLgDimensions = (e) => {
    setLgDimensions(e.target.value);
    const [width, height] = e.target.value.split('X');
    setLgWidth(width);
    setLgHeight(height);
  }

  const handleProductAddInfo = (e) =>{
    setProductAddInfo(e.target.value);
  }

  // const handleProductShippingInfo = (e) =>{
  //   setProductShippingInfo(e.target.value);
  // }

  
  // const handleSizeChange = (e) => {
  //   const sizes = e.target.value
  //   const newSizes = sizes.map((item) => ({
  //     name: item,
  //     slug: sizeToSlug(item),
  //   }))
  //   setSizes(newSizes)
  // };

 
  const handleUploadedLargePic = async() => {
    

    const formData = new FormData();
    formData.append('variantSlug', variantSlug);
    formData.append('productSlug', productSlug);
    for (let i = 0; i < lgFiles.length; i++) {
      formData.append('files', lgFiles[i]);
    }
    formData.append('width', lgWidth);
    formData.append('height', lgHeight);

    try {
      setLoader(true);
      const response = await axios.post('https://njs.iretiensemble.com/products/upload-lg-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      if(response.status ===200 || response.status ===201){
        setLoader(false);
        alert("Large Picture uploaded successfully")
        handleResetUploadLgPics();
      }
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  const handleAddNewVariant=()=>{
    setReadOnly3(false);
    setUploadLgPic(false);
    handleResetUploadLgPics();
    handleResetAddVariant();
  }
  return (
    <Card>
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <TextField fullWidth value={productName} disabled={stateReadOnly1?true:false} onChange={handleProductnameChange}  label='Product Title' placeholder={stateReadOnly1 ? `${productName}`:'Product Title'} />
            </Grid>
            <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-multiple-select-label'>Product Brands</InputLabel>
                    <Select
                      multiple
                      disabled={stateReadOnly1? true:false}
                      value={productBrands.map((brand) => brand.name)}
                      onChange={handleProductBrands}
                      placeholder={stateReadOnly1 ? `${productBrands.map((brand) => brand.name)}`:''}
                      id='form-layouts-separator-multiple-select'
                      labelId='form-layouts-separator-multiple-select-label'
                      input={<OutlinedInput label='Language' id='select-multiple-language' />}
                    >
                      <MenuItem value='Feature 21'>Feature 21</MenuItem>
                      <MenuItem value='H&M'>H&M</MenuItem>
                      <MenuItem value='Dior'>DIOR</MenuItem>
                      <MenuItem></MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
                <TextField
                    fullWidth
                    multiline
                    disabled={stateReadOnly1?true:false}
                    value={productshortDesc}
                    onChange={handleProductShortDesc}
                    minRows={3}
                    label='Product Descriptions'
                    placeholder={stateReadOnly1? `${productshortDesc}`:'Product Descriptions'}
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
                <TextField
                    fullWidth
                    multiline
                    disabled={stateReadOnly1?true:false}
                    value={productAddInfo}
                    onChange={handleProductAddInfo}
                    minRows={3}
                    label='Product Additional Info.'
                    placeholder={stateReadOnly1? `${productshortDesc}`:'Product Descriptions'}
                    sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                        </InputAdornment>
                    )
                    }}
                />
            </Grid>
            {/* <Grid item xs={12} sm={12}>
                <TextField
                    fullWidth
                    multiline
                    disabled={stateReadOnly1?true:false}
                    value={productShippingInfo}
                    onChange={handleProductShippingInfo}
                    minRows={3}
                    label='Product Shipping Info'
                    placeholder={stateReadOnly1? `${productshortDesc}`:'Product Shipping Descriptions'}
                    sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                        </InputAdornment>
                    )
                    }}
                />
            </Grid>  */}
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-multiple-select-label'>Product Featuring</InputLabel>
                    <Select
                    // multiple
                      disabled={stateReadOnly1? true:false}
                      placeholder={stateReadOnly1 ? `${productFeaturing}`:''}
                      value={productFeaturing}
                      onChange={handleProductFeaturing}
                      id='form-layouts-separator-multiple-select'
                      labelId='form-layouts-separator-multiple-select-label'
                      input={<OutlinedInput label='Language' id='select-multiple-language' />}
                    >
                      <MenuItem value='New'>New</MenuItem>
                      <MenuItem value='Top'>Top</MenuItem>
                      <MenuItem value='Embroidered'>Hand Embroidered</MenuItem>
                      <MenuItem></MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-multiple-select-label'>Product Category</InputLabel>
                    <Select
                      multiple
                      disabled={stateReadOnly1? true:false}
                      placeholder={stateReadOnly1 ? `${productCategory.map((category) => category.name)}`:''}
                      value={productCategory.map((category) => category.name)}
                      onChange={handleProductCategory}
                      id='form-layouts-separator-multiple-select'
                      labelId='form-layouts-separator-multiple-select-label'
                      input={<OutlinedInput label='Language' id='select-multiple-language' />}
                    >
                      <MenuItem value='Women'>Women</MenuItem>
                      <MenuItem value='Clothings'>Clothings</MenuItem>
                      <MenuItem value='Fashion'>Fashion</MenuItem>
                      <MenuItem value='New Categories'>New Categories</MenuItem>
                      <MenuItem value='All'>All</MenuItem>
                      <MenuItem value='Topwear'>Topwear</MenuItem>
                      <MenuItem value='Tops'>Tops</MenuItem>
                      <MenuItem value='Shirts'>Shirts</MenuItem>
                      <MenuItem value='DressJumpSuits'>Dress & JumpSuits</MenuItem>
                      <MenuItem value='Dress'>Dress</MenuItem>
                      <MenuItem value='Jumpsuits'>JumpSuits</MenuItem>
                      <MenuItem value='Bottomwear'>Bottomwear</MenuItem>
                      <MenuItem value='Skirts'>Skirts</MenuItem>
                      <MenuItem value='Trousers'>Trousers</MenuItem>
                      <MenuItem value='Blazer Vests'>Blazer & Vests</MenuItem>
                      <MenuItem value='Blazer'>Blazer </MenuItem>
                      <MenuItem value='Vests'>Vests </MenuItem>
                      <MenuItem value='SetsCoordStyledSets'>Sets</MenuItem>
                      <MenuItem value='StyledSets'>Styled Sets</MenuItem>
                      <MenuItem value='CoordSets'>Coord Sets</MenuItem>
                      <MenuItem value='DateNight Outfits'>Date-Night Outfits</MenuItem>
                      <MenuItem value='Workwear'>Workwear</MenuItem>
                      <MenuItem value='Weekend'>Weekend</MenuItem>
                      <MenuItem value='Vacation Stores'>Vacation Stores</MenuItem>
                      <MenuItem value='Winter Outfits'>Winter Outfits</MenuItem>
                      <MenuItem value='AFRA'>AFRA</MenuItem>
                      <MenuItem value='harshitaSemiColon'>Harshita X Afra</MenuItem>
                      <MenuItem value='seasonSpringSummer'>Spring Season 2024</MenuItem>
                      <MenuItem></MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-multiple-select-label'>Product Occasion</InputLabel>
                    <Select
                      multiple
                      disabled={stateReadOnly1? true:false}
                      placeholder={stateReadOnly1 ? `${productOccasion.map((occasion) => occasion.name)}`:''}
                      value={productOccasion.map((occasion) => occasion.name)}
                      onChange={handleProductOccasion}
                      id='form-layouts-separator-multiple-select'
                      labelId='form-layouts-separator-multiple-select-label'
                      input={<OutlinedInput label='Language' id='select-multiple-language' />}
                    >
                      <MenuItem value='Diwali'>Diwali</MenuItem>
                      <MenuItem value='Holi'>Holi</MenuItem>
                      <MenuItem value='Eid-ul-Fitr'>Eid-ul-Fitr</MenuItem>
                      <MenuItem value='Christmas'>Christmas</MenuItem>
                      <MenuItem value='Navratri'>Navratri/Durga Puja</MenuItem>
                      <MenuItem value='Onam'>Onam</MenuItem>
                      <MenuItem value='Pongal'>Pongal</MenuItem>
                      <MenuItem value='Chhath Puja'>Chhath Puja</MenuItem>
                      <MenuItem></MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-multiple-select-label'>Product Material</InputLabel>
                    <Select
                      multiple
                      disabled={stateReadOnly1? true:false}
                      placeholder={stateReadOnly1 ? `${productMaterial.map((material) => material.name)}`:''}
                      value={productMaterial.map((material) => material.name)}
                      onChange={handleProductMaterial}
                      id='form-layouts-separator-multiple-select'
                      labelId='form-layouts-separator-multiple-select-label'
                      input={<OutlinedInput label='Language' id='select-multiple-language' />}
                    >
                      <MenuItem value='Silk'>Silk</MenuItem>
                      <MenuItem value='Cotton'>Cotton</MenuItem>
                      <MenuItem value='Linen'>Linen</MenuItem>
                      <MenuItem value='Wool'>Wool</MenuItem>
                      <MenuItem value='Chiffon'>Chiffon</MenuItem>
                      <MenuItem value='Polyester'>Polyester</MenuItem>
                      <MenuItem value='Georgette'>Georgette</MenuItem>
                      <MenuItem value='Velvet'>Velvet</MenuItem>
                      <MenuItem value='Rayon'>Rayon</MenuItem>
                      <MenuItem value='Sateen'>Sateen</MenuItem>
                      <MenuItem value='Ajrakh Fabric'>Ajrakh Fabric</MenuItem>
                      <MenuItem value='Crêpe'>Crêpe</MenuItem>
                      <MenuItem value='Denim'>Denim</MenuItem>
                      <MenuItem value='Jute'>Jute</MenuItem>
                      <MenuItem value='Kota Doria'>Kota Doria</MenuItem>
                      <MenuItem value='Muslin'>Muslin</MenuItem>
                      <MenuItem value='Nylon'>Nylon</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-multiple-select-label'>Product Sold Out</InputLabel>
                    <Select
                    // multiple
                    disabled={stateReadOnly1? true:false}
                    placeholder={stateReadOnly1 ? `${productSell}`:''}
                    value={productSell}
                    onChange={handleProductSold}
                    id='form-layouts-separator-multiple-select'
                    labelId='form-layouts-separator-multiple-select-label'
                    input={<OutlinedInput label='Language' id='select-multiple-language' />}
                    >
                      <MenuItem value='Yes'>Yes</MenuItem>
                      <MenuItem value='No'>No</MenuItem>
                      <MenuItem></MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-multiple-select-label'>Related Products</InputLabel>
                  <Select
                    multiple
                    disabled={stateReadOnly1 ? true : false}
                    placeholder={stateReadOnly1 ? `${relatedProduct.map((category) => category.name)}` : ''}
                    value={relatedProduct.map(product => product.name)} // Update this line
                    onChange={handleRelatedProductInfo}
                    id='form-layouts-separator-multiple-select'
                    labelId='form-layouts-separator-multiple-select-label'
                    input={<OutlinedInput label='Language' id='select-multiple-language' />}
                  >
                      {allProductNames && allProductNames.map((product, index) => (
                          <MenuItem key={index} value={product.productName}>{product.productName}</MenuItem>
                      ))}
                  </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField disabled={stateReadOnly1?true:false} value={productPrice} onChange={handleProductPrice} fullWidth type='number' label='Product Price' placeholder={stateReadOnly1? `${productPrice}`:'Product Price'} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField disabled={stateReadOnly1?true:false} value={productSalePrice} onChange={handleProductSalePrice} fullWidth type='number' label='Product Sale Price' placeholder={stateReadOnly1? `${productSalePrice}`:'Product Sale Price'} />
            </Grid>
            {stateProductSm && (
                <>
                    <Grid item xs={12} sm={12}>
                        <TextField disabled value={productSlug} InputProps={{readOnly: true, disableUnderline: true}} fullWidth aria-readonly="true"  label='Product Slug' placeholder='linen-blend-dress' />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField fullWidth disabled={stateReadOnly2? true:false} onChange={handleProductFiles} type='file'  label='' inputProps={{multiple: true}} placeholder='linen-blend-dress' id="ProductSmFiles" />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <FormControl fullWidth>
                            <InputLabel id='form-layouts-separator-multiple-select-label'>Product Thumbnail Dimension</InputLabel>
                            <Select
                                // multiple
                                value={smDimension}
                                onChange={handleSmDimensions}
                                disabled={stateReadOnly2? true:false}
                                id='form-layouts-separator-multiple-select'
                                labelId='form-layouts-separator-multiple-select-label'
                                input={<OutlinedInput label='Language' id='select-multiple-language' />}
                            >
                                <MenuItem value='300X408'>300 X 408</MenuItem>
                                <MenuItem value='800X1089'>800 X 1089</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </>
            )}
            {stateProductVariant && (
              <>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-multiple-select-label'>Product Variant Sizes</InputLabel>
                    <Select
                      multiple
                      disabled={stateReadOnly3? true:false}
                      value={sizes.map((item) => item.name)}
                      onChange={handleSizeChange}
                      id='form-layouts-separator-multiple-select'
                      labelId='form-layouts-separator-multiple-select-label'
                      input={<OutlinedInput label='Language' id='select-multiple-language' />}
                    >
                      <MenuItem value='Extrasmall'>Extra Small</MenuItem>
                      <MenuItem value='Small'>Small</MenuItem>
                      <MenuItem value='Medium'>Medium</MenuItem>
                      <MenuItem value='Large'>Large</MenuItem>
                      <MenuItem value='Extralarge'>Extra Large</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField disabled={stateReadOnly3? true:false} value={quantity} onChange={handleQuantityChange} fullWidth type='number' label='Product Variant Quantity' placeholder='Variant Quantity' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField disabled={stateReadOnly3? true:false} fullWidth value={price} onChange={handleVariantPriceChange} type='number' label='Product Variant Price' placeholder='Variant Quantity' />
                </Grid>
                <Grid item xs={12} sm={6} style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                  <InputLabel id='form-layouts-separator-multiple-select-label'>Product Variant Color</InputLabel>
                  <ColorPicker disabled={stateReadOnly3? true:false} format="hex" value={color} onChange={handleColorChange} />
                </Grid>
              </>
            )}
            {stateUploadLgPic && (
              <>
                <Grid item xs={12} sm={12}>
                  <TextField  onChange={handleLgProductFiles} fullWidth type='file' id='PrdocutLgPics'  label='' inputProps={{multiple: true}}  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-multiple-select-label'>Product Variant Thumbnail Dimension</InputLabel>
                    <Select
                      // multiple
                      // disabled={stateReadOnly4? true:false}
                      value={lgDimension}
                      onChange={handleLgDimensions}
                      id='form-layouts-separator-multiple-select'
                      labelId='form-layouts-separator-multiple-select-label'
                      input={<OutlinedInput label='Language' id='select-multiple-language' />}
                    >
                      <MenuItem value='300X408'>300 X 408</MenuItem>
                      <MenuItem value='800X1089'>800 X 1089</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button onClick={stateUploadLgPic?handleUploadedLargePic:stateProductVariant?handleProductVariant:stateProductSm? handleSmProductSubmit:handleSubmit} size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            {/* {stateUploadLgPic?"Upload Large Pictures":stateProductVariant?"Upload Product Variant":stateProductSm?"Upload Small Thumbnail":"Upload Product"} */}

            {loader ? (
              <ThreeDots color='white' height="24" width="40"/>
            ) : (
              stateUploadLgPic ? "Upload Large Pictures" :
              stateProductVariant ? "Upload Product Variant" :
              stateProductSm ? "Upload Small Thumbnail" :
              "Upload Product"
            )}
          </Button>
          {stateUploadLgPic && <Button onClick={handleAddNewVariant} size='large' color='warning' variant='contained'>
            Add New Variant
          </Button>}
          <Button onClick={handleReset} size='large' color='secondary' variant='outlined'>
            {stateUploadLgPic ? "Complete Upload Product":"Cancel"}
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormLayoutsSeparator
