import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import Cookies from "js-cookie";
import ALink from "~/components/features/alink";
import PageHeader from "~/components/features/page-header";
import { actions as authActions } from "~/store/auth";
import { useDispatch } from "react-redux";
import { actions as orderActions } from "~/store/orders";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify"; // import {actions as authActions} from '~/store/auth'
import Error from "~/pages/404";
import { useSession } from "next-auth/react";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

function DashBoard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  console.log(user)
  const token = useSelector((state) => state.auth.token);
  const [customerNameShipping, setCustomerNameShipping] = useState("");
  const [customerNumberShipping, setCustomerNumberShipping] = useState("");
  const [customerNameBilling, setCustomerNameBilling] = useState("");
  const [customerNumberBilling, setCustomerNumberBilling] = useState("");

  // console.log(bRed, sRed);

  const orders = useSelector((state) => state.order.orders);
  // console.log(orders.orderDetails);
  // console.log(token);
  let customer;
  // if(!user)
  if (user && user.user) {
    customer = user.user;
    // console.log(customer)
  }

  function toOrder(e) {
    e.preventDefault();
    document
      .querySelector(
        ".nav-dashboard .react-tabs__tab-list .nav-item:nth-child(2)"
      )
      .click();
  }

  function toAddress(e) {
    e.preventDefault();
    document
      .querySelector(
        ".nav-dashboard .react-tabs__tab-list .nav-item:nth-child(4)"
      )
      .click();
  }

  function toAccount(e) {
    e.preventDefault();
    document
      .querySelector(
        ".nav-dashboard .react-tabs__tab-list .nav-item:nth-child(5)"
      )
      .click();
  }

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phoneNo, setPhoneNo] = useState("");
  const [currentPassword, setCurrentPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [billingAddress, setBillingAddress] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [userCity, setUserCity] = useState("");

  const [billingAddressrec, setBilingAddressrec] = useState([]);
  const [shippingAddressrec, setShippingAddressrec] = useState([]);

  const [billingRedux, setBillingRedux] = useState("");
  const [shippingRedux, setShippingRedux] = useState("");

  const handleUserCity = (e) => {
    setUserCity(e.target.value);
  };

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handlePhoneNo = (e) => {
    setPhoneNo(e.target.value);
  };

  const handleCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleBillingAddress = (e) => {
    setBillingAddress(e.target.value);
  };

  const handleShippingAddress = (e) => {
    setShippingAddress(e.target.value);
  };

  const handleBillingRedux = (address) => {
    setBillingRedux(address);
  };

  const handleShippingRedux = (address) => {
    setShippingRedux(address);
  };

  const handleBillingAddressRdx = () => {
    dispatch(authActions.updateBillingAddress(billingRedux));
  };

  const handleShippingAddressRdx = () => {
    dispatch(authActions.updateShippingAddress(shippingRedux));
  };

  const handleUpdate = async () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      phoneNo: phoneNo,
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
      userCity: userCity,
    };
    console.log("token",token);

    try {
      const response = await axios.post(
        "https://njs.iretiensemble.com/users/edituser",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        // console.log(response.data);
        // dispatch(authActions.loginSuccess(response.data.responseData))
        dispatch(authActions.updateUser(response.data.user));
        toast.success("Account Updated Successfully");
        setFirstName("");
        setLastName("");
        setUserCity("");
        setPhoneNo("");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        // alert("Account Updated Successfully");
        // router.push('/shop/dashboard');
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddress = async () => {
    const data = {
      "billingAddress": {"name":customerNameBilling,
        "address":billingAddress,
        "phoneNo":customerNumberBilling,
        "datetime": Date.now()
      },
      "shippingAddress": {"name":customerNameShipping,
      "address":shippingAddress,
      "phoneNo":customerNumberShipping,
      "datetime": Date.now()
    },
};
// console.log("customer data", data)

    try {
      const response = await axios.post(
        "https://njs.iretiensemble.com/users/add-new-address",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        // console.log(response.data);
        fetchAddress();
        setBillingAddress("");
        setShippingAddress("");
        setCustomerNameBilling("")
        setCustomerNameShipping("");
        setCustomerNumberBilling("")
        setCustomerNumberShipping("");
        toast.success("Address Added Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const emailId = email;

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const response = await axios.get(
          "https://njs.iretiensemble.com/users/my-profile",
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          // console.log("Profile Changes", response.data);
          const { user } = response.data.responseData;
          dispatch(authActions.updateUser(user));
        } else {
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchOrders = async () => {
      try {
        const orderresponse = await axios.get(
          "https://njs.iretiensemble.com/orders/get-order-by-user",
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (orderresponse.status === 200 || orderresponse.status === 201) {
          // console.log(orderresponse.data);
          dispatch(orderActions.fetchOrdersSuccess(orderresponse.data.orders));
        } else {
          console.log(orderresponse.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyProfile();
    fetchOrders();
  }, [dispatch]);

  // useEffect(() => {
    console.log('Fetching')
  const fetchAddress = async () => {
    try {
      const addressResponse = await axios.get(
        "https://njs.iretiensemble.com/users/shipping-address",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("address response",addressResponse)

      if (addressResponse.status === 200 || addressResponse.status === 201) {
        console.log(addressResponse.data);
        if (addressResponse.data.billingAddress === null) {
          dispatch(authActions.updateBillingAddressList([]));
          dispatch(authActions.updateBillingAddress(null));
        }
        if (addressResponse.data.shippingAddress === null) {
          dispatch(authActions.updateShippingAddressList([]));
          dispatch(authActions.updateShippingAddress(null));
        }
        if (addressResponse.data.billingAddress?.length === 1) {
          dispatch(
            authActions.updateBillingAddress(
              addressResponse.data.billingAddress[0]
            )
          );
        }
        if (addressResponse.data.shippingAddress?.length === 1) {
          dispatch(
            authActions.updateShippingAddress(
              addressResponse.data.shippingAddress[0]
            )
          );
        }
        dispatch(
          authActions.updateBillingAddressList(
            addressResponse.data.billingAddress
          )
        );
        dispatch(
          authActions.updateShippingAddressList(
            addressResponse.data.shippingAddress
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  // fetchAddress();

  // },[]);

  const bRed = useSelector((state) => state.auth.billingAddress);
  const sRed = useSelector((state) => state.auth.shippingAddress);
  const billingList = useSelector((state) => state.auth.billingAddressList);

  console.log("bill",billingList)
  console.log("shipping",sRed)
  console.log("billing",bRed)

  
  // Example usage:

  


//   console.log("bill array",JSON.parse(billingList))
  
  const shippingList = useSelector((state) => state.auth.shippingAddressList);
  // console.log(sRed, bRed)

  // if(!user){
  //     return <Error/>
  // }

  return (
    <div className="main" style={{ background: "#f8f7f3" }}>
      <PageHeader title="My Account" subTitle="Shop" />
      <nav className="breadcrumb-nav mb-3">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink
                href="/"
                style={{ fontFamily: "'Gotham Thin',sans-serif" }}
              >
                Home
              </ALink>
            </li>
            <li
              className="breadcrumb-item active"
              style={{
                fontFamily: "'Gotham Thin',sans-serif",
                fontWeight: "800",
              }}
            >
              My Account
            </li>
          </ol>
        </div>
      </nav>

      <div className="page-content">
        <div className="dashboard">
          <div className="container">
            <ul
              className="nav nav-dashboard flex-column mb-3 mb-md-0"
              role="tablist"
            >
              <Tabs selectedTabClassName="active show">
                <div className="row">
                  <aside className="col-md-4 col-lg-3 mb-md-0 mb-2">
                    <TabList>
                      <Tab className="nav-item">
                        <span className="nav-link">Dashboard</span>
                      </Tab>

                      <Tab className="nav-item">
                        <span className="nav-link">Orders</span>
                      </Tab>
                      <Tab className="nav-item">
                        <span className="nav-link">Addresses</span>
                      </Tab>
                      <Tab className="nav-item">
                        <span className="nav-link">Add New Address</span>
                      </Tab>
                      <Tab className="nav-item">
                        <span className="nav-link">Edit Account Details</span>
                      </Tab>
                    </TabList>
                  </aside>

                  <div
                    className="col-md-8 col-lg-9"
                    style={{ marginTop: "1rem" }}
                  >
                    <div className="tab-pane">
                      <TabPanel>
                        <p
                          style={{
                            fontFamily: "'Gotham Thin',sans-serif",
                            fontWeight: "800",
                          }}
                        >
                          Hello{" "}
                          {customer &&
                          customer.firstName &&
                          customer.lastName ? (
                            <span
                              className="font-weight-normal text-dark"
                              style={{
                                fontFamily: "'Gotham Medium',sans-serif",
                                fontWeight: "800",
                              }}
                            >
                              {customer.firstName} {customer.lastName},
                            </span>
                          ) : (
                            <span
                              onClick={toAddress}
                              className="font-weight-normal text-dark"
                              style={{
                                fontFamily: "'Gotham Medium',sans-serif",
                                fontWeight: "800",
                              }}
                            >
                              User,
                            </span>
                          )}
                          <br />
                          Billing Address:{" "}
                          {bRed ? (
                            <div
                              className="font-weight-normal text-dark"
                              style={{
                                fontFamily: "'Gotham Medium',sans-serif",
                                fontWeight: "800",
                              }}
                            >
                              <p><span style={{color:'black'}}>Name:</span> {bRed.name}</p>
                              <p><span style={{color:'black'}}>Address:</span> {bRed.address}</p>
                              <p><span style={{color:'black'}}>Phone No.:</span> {bRed.phoneNo}</p>
                            </div>
                          ) : (
                            <span
                              onClick={toAddress}
                              className="font-weight-normal text-dark"
                              style={{
                                fontFamily: "'Gotham Medium',sans-serif",
                                fontWeight: "800",
                              }}
                            >
                              <a
                                href="#tab-address"
                                className="tab-trigger-link"
                              >
                                Update Billing Address
                              </a>
                            </span>
                          )}
                          <br />
                          Shipping Address:{" "}
                          {sRed ? (
                            <div
                              className="font-weight-normal text-dark"
                              style={{
                                fontFamily: "'Gotham Medium',sans-serif",
                                fontWeight: "800",
                              }}
                            >
                              <p><span style={{color:'black'}}>Name:</span> {sRed.name}</p>
                              <p><span style={{color:'black'}}>Address:</span> {sRed.address}</p>
                              <p><span style={{color:'black'}}>Phone No.:</span> {sRed.phoneNo}</p>
                            </div>
                          ) : (
                            <span
                              onClick={toAddress}
                              className="font-weight-normal text-dark"
                              style={{
                                fontFamily: "'Gotham Medium',sans-serif",
                                fontWeight: "800",
                              }}
                            >
                              <a
                                href="#tab-address"
                                className="tab-trigger-link"
                              >
                                Update Shipping Address
                              </a>
                            </span>
                          )}
                          <br />
                          User Email:{" "}
                          {customer && customer.userEmail ? (
                            <span
                              className="font-weight-normal text-dark"
                              style={{
                                fontFamily: "'Gotham Medium',sans-serif",
                                fontWeight: "800",
                              }}
                            >
                              {customer.userEmail}
                            </span>
                          ) : (
                            <span
                              onClick={toAddress}
                              className="font-weight-normal text-dark"
                              style={{
                                fontFamily: "'Gotham Medium',sans-serif",
                                fontWeight: "800",
                              }}
                            >
                              <a
                                href="#tab-address"
                                className="tab-trigger-link"
                              >
                                Update Email Address
                              </a>
                            </span>
                          )}
                          <br />
                          Phone No:{" "}
                          {customer && customer.phoneNo ? (
                            <span
                              className="font-weight-normal text-dark"
                              style={{
                                fontFamily: "'Gotham Medium',sans-serif",
                                fontWeight: "800",
                              }}
                            >
                              {customer.phoneNo}
                            </span>
                          ) : (
                            <span
                              onClick={toAddress}
                              className="font-weight-normal text-dark"
                              style={{
                                fontFamily: "'Gotham Medium',sans-serif",
                                fontWeight: "800",
                              }}
                            >
                              <a
                                href="#tab-address"
                                className="tab-trigger-link"
                              >
                                Update Phone Number
                              </a>
                            </span>
                          )}
                          <br />
                          From your account dashboard you can view your{" "}
                          <a
                            href="#tab-orders"
                            onClick={toOrder}
                            className="tab-trigger-link link-underline"
                          >
                            recent orders
                          </a>
                          , manage your{" "}
                          <a
                            href="#tab-address"
                            onClick={toAddress}
                            className="tab-trigger-link"
                          >
                            shipping and billing addresses
                          </a>
                          , and{" "}
                          <a
                            href="#tab-account"
                            onClick={toAccount}
                            className="tab-trigger-link"
                          >
                            edit your password and account details
                          </a>
                          .
                        </p>
                      </TabPanel>

                      <TabPanel>
                        {orders && orders.length > 0 ? (
                          orders?.map((order, index) => (
                            <Card sx={{ minWidth: 275 }}>
                              <CardContent>
                                <Typography
                                  sx={{ fontSize: 14 }}
                                  color="text.secondary"
                                  gutterBottom
                                >
                                  <p
                                    style={{
                                      fontFamily: "'Gotham Medium',sans-serif",
                                      color: "#1a1a1a",
                                    }}
                                  >
                                    Order ID: {order.orderId}
                                  </p>
                                </Typography>
                                <Typography
                                  sx={{ fontSize: 14 }}
                                  color="text.secondary"
                                  gutterBottom
                                >
                                  <p
                                    style={{
                                      fontFamily: "'Gotham Medium',sans-serif",
                                    }}
                                  >
                                    Order Date: {order.orderDate} &nbsp;
                                  </p>
                                </Typography>
                                <Typography>
                                  <h4
                                    style={{
                                      fontSize: "1.5rem",
                                      fontFamily: "'Gotham Black',sans-serif",
                                    }}
                                  >
                                    Order Billing Address:
                                  </h4>
                                  <p
                                    style={{
                                      fontFamily: "'Gotham Medium',sans-serif",
                                    }}
                                  >
                                    {order.billingAddress}
                                  </p>
                                </Typography>
                                <Typography>
                                  <h4
                                    style={{
                                      fontSize: "1.5rem",
                                      fontFamily: "'Gotham Black',sans-serif",
                                    }}
                                  >
                                    Order Shipping Address:
                                  </h4>
                                  <p
                                    style={{
                                      fontFamily: "'Gotham Medium',sans-serif",
                                    }}
                                  >
                                    {order.shippingAddress}
                                  </p>
                                </Typography>
                                <Typography>
                                  <h4
                                    style={{
                                      fontSize: "1.5rem",
                                      fontFamily: "'Gotham Black',sans-serif",
                                    }}
                                  >
                                    Product Details:
                                  </h4>
                                </Typography>

                                {order.orderDetails?.map(
                                  (orderDetail, index) => (
                                    <>
                                      <Typography variant="h5" component="div">
                                        <p
                                          style={{
                                            fontFamily:
                                              "'Gotham Medium',sans-serif",
                                          }}
                                        >
                                          {orderDetail.productSlug}
                                        </p>
                                      </Typography>
                                      <Typography variant="h5" component="div">
                                        <p
                                          style={{
                                            fontFamily:
                                              "'Gotham Medium',sans-serif",
                                          }}
                                        >
                                          Product Quantity:{" "}
                                          {orderDetail.quantity}
                                        </p>
                                      </Typography>
                                      <Typography variant="h5" component="div">
                                        <p
                                          style={{
                                            fontFamily:
                                              "'Gotham Medium',sans-serif",
                                            color: "#1a1a1a",
                                          }}
                                        >
                                          Product Amount:{" "}
                                          <span
                                            style={{
                                              fontFamily:
                                                "'Gotham Medium',sans-serif",
                                              color: "grey",
                                            }}
                                          >
                                            ₹ {orderDetail.amount}
                                          </span>
                                        </p>
                                      </Typography>
                                    </>
                                  )
                                )}
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <p
                            style={{
                              fontFamily: "'Gotham Thin',sans-serif",
                              fontSize: "1.7rem",
                            }}
                          >
                            No order has been made yet.
                          </p>
                        )}
                        <ALink
                          style={{ marginTop: "10px" }}
                          href="/shop/sidebar/list"
                          className="btn btn-outline-primary-2"
                        >
                          <span>GO SHOP</span>
                          <i className="icon-long-arrow-right"></i>
                        </ALink>
                      </TabPanel>
                      <TabPanel>
                        <p
                          style={{
                            fontFamily: "'Gotham Thin',sans-serif",
                            fontSize: "1.7rem",
                          }}
                        >
                          The following addresses will be used on the checkout
                          page by default.
                        </p>

                        <div className="row">
                          <div className="col-lg-6">
                            <div className="card card-dashboard">
                              <div
                                className="card-body"
                                style={{ background: "#f8f7f3" }}
                              >
                                <h3
                                  className="card-title"
                                  style={{
                                    fontFamily: "'Gotham Medium',sans-serif",
                                    fontSize: "1.7rem",
                                  }}
                                >
                                  Billing Address
                                </h3>

                                {customer && (
                                  <p
                                    style={{
                                      fontFamily: "'Gotham Thin',sans-serif",
                                      fontWeight: "800",
                                    }}
                                  >
                                    {billingList?.map((address, index) => (
                                      <ul>
                                        <li key={index} className="listAddress">
                                          <div className="inputAdd">
                                            <input
                                              type="radio"
                                              name=""
                                              id={`id-${index}`}
                                              onChange={() =>
                                                handleBillingRedux(address)
                                              }
                                            />
                                          </div>
                                          <div className="labelsAdd">
                                            <p>Name :{address.name}</p>
                                            <p>Phone No :{address.phoneNo}</p>
                                            <p>Address :{address.address}</p>
                                          </div>
                                        </li>
                                      </ul>
                                    ))}
                                    <br />
                                    {billingList && billingList.length>=0 ? (
                                      <button
                                        onClick={() =>
                                          handleBillingAddressRdx()
                                        }
                                        className="btn btn-outline-primary-2"
                                      >
                                        <span>UPDATE BILLING ADDRESS</span>
                                        <i className="icon-long-arrow-right"></i>
                                      </button>
                                    ) : (
                                      <p
                                        style={{
                                          fontFamily:
                                            "'Gotham Black',sans-serif",
                                        }}
                                      >
                                        No Billing Address
                                      </p>
                                    )}
                                    <br />
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="card card-dashboard">
                              <div
                                className="card-body"
                                style={{ background: "#f8f7f3" }}
                              >
                                <h3
                                  className="card-title"
                                  style={{
                                    fontFamily: "'Gotham Medium',sans-serif",
                                    fontSize: "1.7rem",
                                  }}
                                >
                                  Shipping Address
                                </h3>

                                {customer && (
                                  <p
                                    style={{
                                      fontFamily: "'Gotham Thin',sans-serif",
                                      fontWeight: "800",
                                    }}
                                  >
                                    {shippingList?.map((address, index) => (
                                      <ul>
                                        <li key={index} className="listAddress">
                                          <div className="inputAdd">
                                            <input
                                              type="radio"
                                              name=""
                                              id={`id-${index}`}
                                              onChange={() =>
                                                handleBillingRedux(address)
                                              }
                                            />
                                          </div>
                                          <div className="labelsAdd">
                                            <p>Name :{address.name}</p>
                                            <p>Phone No :{address.phoneNo}</p>
                                            <p>Address :{address.address}</p>
                                          </div>
                                        </li>
                                      </ul>
                                    ))}
                                    <br />
                                    {shippingList && shippingList.length>=0 ? (
                                      <button
                                        onClick={() =>
                                          handleShippingAddressRdx()
                                        }
                                        className="btn btn-outline-primary-2"
                                      >
                                        <span>UPDATE SHIPPING ADDRESS</span>
                                        <i className="icon-long-arrow-right"></i>
                                      </button>
                                    ) : (
                                      <p
                                        style={{
                                          fontFamily:
                                            "'Gotham Black',sans-serif",
                                        }}
                                      >
                                        No Shipping Address
                                      </p>
                                    )}
                                    <br />
                                    {/* {customer.userEmail}
                                    <br /> */}
                                    {/* <a href="#" onClick={toAddress}>
                                      Edit <i className="icon-edit"></i>
                                    </a> */}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div className="row">
                          <div className="col-sm-12">
                          <h3
                                  className="card-title"
                                  style={{
                                    fontFamily: "'Gotham Medium',sans-serif",
                                    fontSize: "1.7rem",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Billing Address
                                </h3>
                                <label>Name </label>
                            <input
                              type="text"
                              name="name"

                              required
                              id=""
                              value={customerNameBilling} placeholder
                              onChange={(e) =>
                                setCustomerNameBilling(e.target.value)
                              }
                              className="form-control"
                            />
                            <label>Phone Number </label>
                            <input
                            required
                              type="number"
                              name="number"
                              id=""
                              value={customerNumberBilling}
                              onChange={(e) =>
                                setCustomerNumberBilling(e.target.value)
                              }
                              className="form-control"
                            />


                            <label>Billing Address </label>
                            <textarea
                               required
                              value={billingAddress}
                              onChange={handleBillingAddress}
                              type="text"
                              className="form-control"
                            />
                          </div>
                          <div className="col-sm-12">
                          <h3
                                  className="card-title"
                                  style={{
                                    fontFamily: "'Gotham Medium',sans-serif",
                                    fontSize: "1.7rem",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Shipping Address
                                </h3>
                            <label>Name </label>
                            <input
                               required
                              type="text"
                              name="name"
                              id=""
                              value={customerNameShipping}
                              onChange={(e) =>
                                setCustomerNameShipping(e.target.value)
                              }
                              className="form-control"
                            />
                            <label>Phone Number </label>
                            <input
                               required
                              type="number"
                              name="number"
                              id=""
                              value={customerNumberShipping}
                              onChange={(e) =>
                                setCustomerNumberShipping(e.target.value)
                              }
                              className="form-control"
                            />
                            <label>Shipping Address </label>
                            <textarea
                               required
                              value={shippingAddress}
                              onChange={handleShippingAddress}
                              type="text"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => handleAddress()}
                          className="btn btn-outline-primary-2"
                        >
                          <span>ADD ADDRESS</span>
                          <i className="icon-long-arrow-right"></i>
                        </button>
                      </TabPanel>

                      <TabPanel>
                        <div className="row">
                          <div className="col-sm-6">
                            <label>First Name *</label>
                            <input
                              value={firstName}
                              onChange={handleFirstName}
                              type="text"
                              className="form-control"
                            />
                          </div>

                          <div className="col-sm-6">
                            <label>Last Name *</label>
                            <input
                              value={lastName}
                              onChange={handleLastName}
                              type="text"
                              className="form-control"
                            />
                          </div>

                          <div className="col-sm-6">
                            <label>City *</label>
                            <input
                              value={userCity}
                              onChange={handleUserCity}
                              type="text"
                              className="form-control"
                            />
                          </div>

                          <div className="col-sm-12">
                            <label>Phone Number *</label>
                            <input
                              value={phoneNo}
                              onChange={handlePhoneNo}
                              type="text"
                              className="form-control"
                            />
                          </div>
                        </div>

                        <label>
                          Current password (leave blank to leave unchanged)
                        </label>
                        <input
                          value={currentPassword}
                          onChange={handleCurrentPassword}
                          type="password"
                          className="form-control"
                        />

                        <label>
                          New password (leave blank to leave unchanged)
                        </label>
                        <input
                          value={newPassword}
                          onChange={handleNewPassword}
                          type="password"
                          className="form-control"
                        />

                        <label>Confirm new password</label>
                        <input
                          value={confirmPassword}
                          onChange={handleConfirmPassword}
                          type="password"
                          className="form-control mb-2"
                        />

                        <button
                          onClick={() => handleUpdate()}
                          className="btn btn-outline-primary-2"
                        >
                          <span>SAVE CHANGES</span>
                          <i className="icon-long-arrow-right"></i>
                        </button>
                      </TabPanel>
                    </div>
                  </div>
                </div>
              </Tabs>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(DashBoard);
