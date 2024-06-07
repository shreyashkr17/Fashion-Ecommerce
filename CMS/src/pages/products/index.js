import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Upload from "../../views/products/upload"
import List from "../../views/products/list"
import Table from "../../views/products/saleByAmt"
import Table2 from "../../views/products/saleByQty"

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [handleList, setHandleList] = useState(false);

  const handleListChange = () => {
    setHandleList(!handleList);
  }

  const handleDeleteProduct = async (productSlug) => {
    try {
      const response = await axios.delete('https://njs.iretiensemble.com/products/delete-product', {
        data: {
          productSlug: productSlug
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if(response.status === 200 || response.status === 201){
        // console.log('Product Deleted:', response.data.message);
        alert('Product Deleted:', response.data.message);
      }
    } catch (error) {
      console.log('Error Deleting Product.', error);
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Upload Product" {...a11yProps(0)} />
          {!handleList && <Tab label="Product List" {...a11yProps(1)} />}
          {!handleList && <Tab label="Product & Sales Amount" {...a11yProps(2)} />}
          {!handleList && <Tab label="Product & Sales Quantity" {...a11yProps(3)} />}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Upload handleListChange={handleListChange}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <List handleDeleteProduct={handleDeleteProduct}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Table/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Table2/>
      </CustomTabPanel>
    </Box>
  );
}