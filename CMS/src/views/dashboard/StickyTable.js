// ** React Imports
import { useState, useEffect } from 'react'
import axios from 'axios'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'



const columns = [
  { id: 'name', label: 'Name', minWidth: 280 },
  { id: 'email', label: 'Email/Username', minWidth: 250 },
  {
    id: 'orderDate',
    label: 'Order Date',
    minWidth: 170,
    align: 'center',
    format: value => value.toLocaleString('en-US')
  },
  {
    id: 'orderAmt',
    label: 'Order Amount',
    minWidth: 170,
    align: 'center',
    format: value => value.toLocaleString('en-US')
  },
  {
    id: 'orderStatus',
    label: 'Order Status',
    minWidth: 170,
    align: 'center',
    format: value => value.toFixed(2)
  }
]
function createData(name, email, orderDate, orderAmt,orderStatus) {
  return { name, email, orderDate, orderAmt,orderStatus }
}
let rows;

const TableStickyHeader = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const [orderDetails, setOrderDetails] = useState([]);
  

  useEffect(()=>{
    const fetchOrders = async () =>{
        try {
            const response = await axios.get('https://njs.iretiensemble.com/orders/get-all-orders');
            if(response.status ===  200){
                // console.log(response)
                setOrderDetails(response.data.formattedOrders);
            }else{
                console.error('Failed to fetch orders: ', response.status)
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    fetchOrders();
  }, []);

  rows= orderDetails.map((order) => {
    return (
        createData(`${order.firstName} ${order.lastName}`,`${order.userEmail}`, `${order.orderDate}`,`₹ ${order.orderTotal}`, `${order.orderStatus}`)
    )
  })
//   console.log(orderDetails.map((order) => {
//     return (
//         console.log(order)
//     )
//   }))

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell  align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id]

                    return (
                      <TableCell align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>

    // {orderDetails}
  )
}

export default TableStickyHeader
