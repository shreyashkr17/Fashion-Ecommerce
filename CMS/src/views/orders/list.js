import React, { useState, useEffect, useRef } from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import axios from 'axios';

function List() {
    const [showOption , setShowOption] = useState(false);
    const [showAllDetails, setShowAllDetails] = useState();
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    

    useEffect(() => {
        const handleShowOrders = async () => {
            const response = await axios.get('https://njs.iretiensemble.com/orders/get-all-order-detail', {
                headers:{
                    'Content-Type': 'application/json',
                }
            });
            
            if(response.status === 200 || response.status === 201){
                setShowAllDetails(response.data.formattedOrders);
            }else{
                setShowAllDetails([]);
            }
        }

        handleShowOrders();
    },[]);

    const handleStatusChange = async (orderId, orderStatus) => {
        const data = {orderId, orderStatus}
        //console.log(data);
        try {
            const response = await axios.post('https://njs.iretiensemble.com/orders/update-order-status', data, {
                headers:{
                    'Content-Type': 'application/json',
                }
            });

            if(response.status === 200 || response.status === 201){
                alert("Order status updated successfully")
                const updatedOrders = showAllDetails.map((order) => {
                    if(order.orderId === orderId){
                        return {...order, orderStatus: orderStatus}
                    }
                    return order;
                });
                setShowAllDetails(updatedOrders);
                setShowOption(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleEditStatusClick = (orderId) => {
        setShowOption(!showOption);
        setSelectedOrderId(orderId);
    };

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label='sticky table'>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Sl. No.</TableCell>
                                <TableCell align='center'>User Name</TableCell>
                                <TableCell align='center'>User Email Address</TableCell>
                                <TableCell align='center'>Order Total</TableCell>
                                <TableCell align='center'>Order Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {showAllDetails && showAllDetails.map((row, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align='center'>{index+1}</TableCell>
                                        <TableCell align='center'>{row.firstName} {row.lastName}</TableCell>
                                        <TableCell align='center'>{row.userEmail}</TableCell>
                                        <TableCell align='center'>{row.orderTotal}</TableCell>
                                        <TableCell align='center'>{row.orderStatus}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    )
}

export default List;
