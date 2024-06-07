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
    // const [showOption , setShowOption] = useState(false);
    const [allCouponDetail, setAllCouponDetail] = useState();
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    

    useEffect(() => {
        const handleShowOrders = async () => {
            const response = await axios.get('https://njs.iretiensemble.com/orders/getAllCouponList', {
                headers:{
                    'Content-Type': 'application/json',
                }
            });
            
            if(response.status === 200 || response.status === 201){
                setAllCouponDetail(response.data.coupons);
            }else{
                setAllCouponDetail([]);
            }
        }

        handleShowOrders();
    },[]);

    const handleDeleteCoupon = async (couponCode) => {
        const data = {couponCode}
        //console.log(data);
        try {
            const response = await axios.post('https://njs.iretiensemble.com/orders/delete-coupon', data, {
                headers:{
                    'Content-Type': 'application/json',
                }
            });

            if(response.status === 200 || response.status === 201){
                alert("Order status updated successfully")
                const updatedCoupon = allCouponDetail.map((coupon) => {
                    if(coupon.couponCode === couponCode){
                        return {...coupon}
                    }
                    return coupon;
                });
                allCouponDetail(updatedCoupon);
                // setShowOption(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    // const handleEditStatusClick = (orderId) => {
    //     setShowOption(!showOption);
    //     setSelectedOrderId(orderId);
    // };

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label='sticky table'>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Sl. No.</TableCell>
                                <TableCell align='center'>Coupon Code</TableCell>
                                <TableCell align='center'>Coupon Percentage</TableCell>
                                <TableCell align='center'>Coupon Flat Values</TableCell>
                                <TableCell align='center'>Coupon Type</TableCell>
                                <TableCell align='center'>Coupon Category</TableCell>
                                <TableCell align='center'></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allCouponDetail && allCouponDetail.map((row, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align='center'>{index+1}</TableCell>
                                        <TableCell align='center'>{row.couponCode}</TableCell>
                                        <TableCell align='center'>{row.couponPercentage}%</TableCell>
                                        <TableCell align='center'>{row.couponFlatValue}</TableCell>
                                        <TableCell align='center'>{row.couponType}</TableCell>
                                        <TableCell align='center'>{row.couponCategory}</TableCell>
                                        <TableCell align='center' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <Button onClick={() => handleDeleteCoupon(row.couponCode)} type='danger' variant="contained" style={{ color: "white" }} >
                                                Delete Coupon
                                            </Button>
                                            {/* {showOption && row.orderId === selectedOrderId && (
                                                <div className='editStCont'>
                                                    <Button onClick={() => handleStatusChange(row.orderId, "Delivered")} variant="contained" style={{ color: "white", display: "flex", marginTop: "5px", marginBottom: "5px", justifyContent: "center", alignItems: "center" }}>
                                                        Delivered
                                                    </Button>
                                                    <Button onClick={() => handleStatusChange(row.orderId, "Cancelled")} variant="contained" style={{ color: "white", display: "flex", marginTop: "5px", marginBottom: "5px", justifyContent: "center", alignItems: "center" }}>
                                                        Cancelled
                                                    </Button>
                                                    <Button onClick={() => handleStatusChange(row.orderId, "Pending")} variant="contained" style={{ color: "white", display: "flex", marginTop: "5px", marginBottom: "5px", justifyContent: "center", alignItems: "center" }}>
                                                        Pending
                                                    </Button>
                                                </div>
                                            )} */}
                                        </TableCell>
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
