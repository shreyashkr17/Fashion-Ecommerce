import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import ALink from "~/components/features/alink";
import { useSession } from "next-auth/react";

import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions as authActions } from "~/store/auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function SignUpReDirect() {
  const  {data:session}  = useSession();
  const sessionStatus= useSession();
  // console.log("sesion status",sessionStatus)
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.auth.user);
// console.log("session",session)
  useEffect(() => {
    if(session){
      setEmail(sessionStatus.data?.user.email);
      setPassword(sessionStatus.data?.user.email);
    }
  }, [session]);

  const handleLogin = async () => {
    const data = {
      input: sessionStatus.data.user.email,
      password: sessionStatus.data.user.email,
    };
    try {
      const response = await axios.post(
        "https://njs.iretiensemble.com/users/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201 || response.status === 200) {
        const { user, token } = response.data?.responseData;
        // console.log(user, token);
        dispatch(authActions.loginSuccess(user, token));
        toast.success("Login Successfully");
        // router.replace("/");
        if(window.opener){
          window.opener.postMessage("closeAndRedirect", "*");
        }else{
          router.replace("/");
        }
      }
    } catch (error) {
        toast.error(error.response?.data.message);
      console.log("error", error);
    }
  };

  const handleContinue = async () => {
    const [firstName, lastName] = sessionStatus.data?.user.name.split(" ");
    const data = {
      email: sessionStatus.data.user.email,
      password: sessionStatus.data.user.email,
      firstName: firstName,
      lastName: lastName,
    };
// console.log("register data",data);
    try {
      const response = await axios.post(
        "https://njs.iretiensemble.com/users/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.status === 201) {
        handleLogin();
      } else {
        console.log(response.data);
      }
    } catch (error) {
      if (error.response?.data.message == "User already exists") {
        // console.log("user already exists");
        handleLogin();
        // toast.warning(error.response.data.message);
      }
      console.log("try",error);
    }
  };

  return (
    <div className="main">
      <nav className="breadcrumb-nav border-0 mb-0">
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
              Login
            </li>
          </ol>
        </div>
      </nav>
      <div
        className="login-page bg-image pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17"
        style={{ backgroundImage: `url(images/backgrounds/login-bg.jpg)` }}
      >
        <div className="container">
          <div className="form-box">
            <div className="form-tab">
              <Tabs selectedTabClassName="show" defaultIndex={0}>
                <TabList className="nav nav-pills nav-fill">
                  <Tab className="nav-item">
                    <span className="nav-link">Register/Login</span>
                  </Tab>
                </TabList>
              
   
               <div className="tab-content">
                  <TabPanel style={{ paddingTop: "2rem" }}>
                    <div>
                      <div>
                        <p>
                          Continue with{" "}
                          {sessionStatus.status === "loading" ? <p>Loading...</p> : <span>{sessionStatus.data.user.email}</span>}
                        </p>
                      </div>

                      <div
                        className="form-footer flex"
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <button
                          onClick={() => handleContinue()}
                          className="btn btn-outline-primary-2"
                        >
                          <span>Continue</span>
                          <i className="icon-long-arrow-right"></i>
                        </button>
                      </div>
                      <p> <i> * Note : If you have already Registered with Email and Password Use the same way for login.</i></p>
                    </div>
                  </TabPanel>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpReDirect;
