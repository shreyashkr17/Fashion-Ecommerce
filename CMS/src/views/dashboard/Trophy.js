// ** MUI Imports
import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the trophy image
const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

const Trophy = () => {
  // ** Hook
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  const [monthlyRev, setMonthlyRev] = useState(null);
   useEffect(() => {
    const fetchMonthlyDetail = async () => {
      try {
        const response = await axios.get('https://njs.iretiensemble.com/orders/get-total-by-month');

        if(response.status === 200){
          // console.log(response.data.currentMonthTotal)
          setMonthlyRev(response.data.currentMonthTotal)
        }else {
          console.error('Failed to fetch orders:', response.status);
        }
      } catch (error) {
        console.error('Error fetching Monthly Details:', error);
      }
    }

    fetchMonthlyDetail();
   },[])

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6'>Monthly Revenue</Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          Revenue generated by this month
        </Typography>
        <Typography variant='h2' sx={{ my: 3, color: 'primary.main' }}>
          ₹ {monthlyRev}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Trophy
