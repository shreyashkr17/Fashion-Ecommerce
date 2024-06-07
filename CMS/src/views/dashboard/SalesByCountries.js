// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import { useEffect, useState } from 'react'
import axios from 'axios'



const SalesByCountries = () => {
  const [topProduct, setTopProduct] = useState();

  useEffect(() => {
    const fetchTopProduct = async () => {
      try {
        const response = axios.get('https://njs.iretiensemble.com/products/get-product-by-productAmountEarned', {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if(response.status === 200 || response.status === 201) {
          setTopProduct(response.data)
        }else{
          setTopProduct([]);
        }
      } catch (error) {
        setTopProduct([]);
      }
    }

    fetchTopProduct();
  },[])
  return (
    <Card>
      <CardHeader
        title='Sales by Products'
        titleTypographyProps={{ sx: { lineHeight: '1.2 !important', letterSpacing: '0.31px !important' } }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
        {topProduct && topProduct.map((item, index) => {
          return (
            <Box
              key={item.productName}
              sx={{
                display: 'flex',
                alignItems: 'center',
                ...(index !== data.length - 1 ? { mb: 6.7 } : {})
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 0.5, fontWeight: 600, letterSpacing: '0.25px' }}>{item.productName}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', textAlign: 'end', flexDirection: 'column' }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.72, letterSpacing: '0.22px' }}>
                    ₹ {item.productAmountEarned}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default SalesByCountries
