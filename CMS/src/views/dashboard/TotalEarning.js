import React, {useState, useEffect} from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

// ** Icons Imports
import MenuUp from 'mdi-material-ui/MenuUp'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import axios  from 'axios'
import { set } from 'nprogress'

const data = [
  {
    progress: 75,
    imgHeight: 20,
    title: 'Zipcar',
    color: 'primary',
    amount: '$24,895.65',
    subtitle: 'Vuejs, React & HTML',
    imgSrc: '/images/cards/logo-zipcar.png'
  },
  {
    progress: 50,
    color: 'info',
    imgHeight: 27,
    title: 'Bitbank',
    amount: '$8,650.20',
    subtitle: 'Sketch, Figma & XD',
    imgSrc: '/images/cards/logo-bitbank.png'
  },
  {
    progress: 20,
    imgHeight: 20,
    title: 'Aviato',
    color: 'secondary',
    amount: '$1,245.80',
    subtitle: 'HTML & Angular',
    imgSrc: '/images/cards/logo-aviato.png'
  }
]

const TotalEarning = () => {
  const [totalRev, setTotalRev] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(()=>{
    const totalIncomeRev = async () => {
      try {
        const response = await axios.get('https://njs.iretiensemble.com/orders/get-total-income');
        // console.log(response.data.totalIncome);
        if(response.status === 200){
          setTotalRev(response.data.totalIncome);
        }else{
          console.log('Error')
        }
      } catch (error) {
        console.log(error);
      }
    };

    const totalOrdersRev = async (req,res) => {
      try {
        const response = await axios.get('https://njs.iretiensemble.com/orders/get-total-orders-length');

        // console.log(response)
        if(response.status === 200 || response.status === 201){
          setTotalOrders(response.data.totalOrders);
        }else{
          setTotalOrders(0);
        }
      } catch (error) {
        console.log(error);
        setTotalOrders(0);
      }
    }

    totalIncomeRev();
    totalOrdersRev();
  });

  console.log(totalRev)
  return (
    <Card>
      <CardHeader
        title='Total Orders & Earnings'
        titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Revenue Generated till now from the starting
            </Box>{' '}
          </Typography>
        }
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important` }}>
        <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h4' sx={{ fontWeight: 600, fontSize: '2.125rem !important' }}>
            {totalRev === 0 ? '₹ --' : `₹ ${totalRev}`}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
          </Box>
        </Box>
        <Typography component='p' variant='caption' sx={{ mb: 1 }}>
          Revenue generated from all the all the products
        </Typography>
      </CardContent>
      <CardHeader
        titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Orders Generated till now from the starting
            </Box>{' '}
          </Typography>
        }
      />

      <CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important` }}>
        <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h4' sx={{ fontWeight: 600, fontSize: '2.125rem !important' }}>
            {totalOrders === 0 ? '0' : `${totalOrders}`} Orders
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
          </Box>
        </Box>
        <Typography component='p' variant='caption' sx={{ mb: 1 }}>
          Revenue generated from all the all the products
        </Typography>
      </CardContent>
    </Card>
  )
}

export default TotalEarning
