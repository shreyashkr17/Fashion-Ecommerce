import React, { useState, useEffect } from 'react';
import axios from 'axios';
// ** MUI Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
// ** Icons Imports
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd';
import CellphoneLink from 'mdi-material-ui/CellphoneLink';
import AccountOutline from 'mdi-material-ui/AccountOutline';

const StatisticsCard = () => {
  const date = new Date().getFullYear();

  const [yearlyRev, setYearlyRev] = useState(0);
  const [productsCnt, setProductsCnt] = useState(0);
  const [userCnt, setUserCnt] = useState(0);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('https://njs.iretiensemble.com/orders/get-total-by-year');
        if (response.status === 200) {
          // console.log(response.data.currentYearTotal);
          setYearlyRev(response.data.currentYearTotal);
        } else {
          console.error('Failed to fetch statistics: ', response.status);
        }
      } catch (error) {
        console.error('Error fetching statistics: ', error);
      }
    };

    const products = async () => {
      try {
        const response = await axios.get('https://njs.iretiensemble.com/orders/get-all-orders') 
        if(response.status === 200){
          // console.log(response.data.notcancelledOrders)
          setProductsCnt(response.data.notcancelledOrders);
        }else{
          console.error('Failed to fetch statistics: ', response.status);
        }
      } catch (error) {
        console.error('Error fetching statistics: ', error);
      }
    }

    const users = async () => {
      try {
        const response = await axios.get('https://njs.iretiensemble.com/users/get-this-year')
        if(response.status === 200){
          // console.log(response.data.result)
          setUserCnt(response.data.result);
        }else{
          console.error('Failed to fetch statistics: ', response.status);
        }
      } catch (error) {
        console.error('Error Users statistics: ', error);
      }
    }

    fetchStatistics();
    products();
    users();
  }, []);

  const salesData = [
    {
      stats: `${userCnt-1}`,
      title: 'Customers',
      color: 'success',
      icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />,
    },
    {
      stats: `${productsCnt}`,
      color: 'warning',
      title: 'Total Orders',
      icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />,
    },
    {
      stats: `₹ ${yearlyRev}`,
      color: 'info',
      title: 'Revenue',
      icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />,
    },
  ];

  const renderStats = (yearlyRev) => {
    return salesData.map((item, index) => (
      <Grid item xs={12} sm={3} key={index}>
        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 44,
              height: 44,
              boxShadow: 3,
              color: 'common.white',
              backgroundColor: `${item.color}.main`,
            }}
          >
            {item.icon}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>{item.title}</Typography>
            <Typography variant='h6'>{item.stats}</Typography>
          </Box>
        </Box>
      </Grid>
    ));
  };

  return (
    <Card>
      <CardHeader
        title={`Statistics Of The Year ${date}`}
        subheader={
          ""
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important',
          },
        }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats(yearlyRev)}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
