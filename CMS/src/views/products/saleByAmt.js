import React, { useEffect, useState } from 'react'
// import  from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import axios from 'axios'


function createData(name, variant, variantStocks, sales) {
  return { name, variant, variantStocks, sales }
}
function table() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [showAllQty, setShowAllQty] = useState(null);

  useEffect(() => {
    const fetchAllQty = async () => {
      try {
        const response = await axios.get('https://njs.iretiensemble.com/orders/analyze-order', {
          headers:{
            'Content-Type': 'application/json',
          }
        });

        if(response.status === 200 || response.status === 201){
          // console.log(response.data);
          setShowAllQty(response.data.uniqueSortedProductCountByAmount);
        }else{
          setShowAllQty([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllQty();
  },[]);

  const rows = showAllQty && showAllQty.map((qty) => {
    return createData(qty.productName, qty.variantColor, qty.variantStock,  qty.variantKeyQuant)
  });
  // console.log(rows)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='left' sx={{minWidth:200}}>
                Product Name
              </TableCell>
              <TableCell align='center' sx={{minWidth:200}}>
                Variant Color
              </TableCell>
              <TableCell align='center' sx={{minWidth:200}}>
                Variant Stocks
              </TableCell>
              <TableCell align='right' sx={{minWidth:170}}>
                Sales BY Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(showAllQty && showAllQty.length > 0) ? 
              showAllQty.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(qty => (
                <TableRow hover role='checkbox' tabIndex={-1} key={qty.productName}>
                  <TableCell align='left'>{qty.productName}</TableCell>
                  <TableCell align='center'>{qty.variantColor}</TableCell>
                  <TableCell align='center'>{qty.variantStock}</TableCell>
                  <TableCell align="right">₹ {qty.variantKeyQuant}</TableCell>
                </TableRow>
              )) : 
              <TableRow>
                <TableCell colSpan={4} align="center">No data available</TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows && rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    // null
  )
}

export default table
