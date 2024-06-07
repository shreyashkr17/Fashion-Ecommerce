import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import ALink from '~/components/features/alink';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {actions as authActions} from '~/store/auth';
import { useRouter } from 'next/router';
import {toast} from "react-toastify"
function Login() {
    const {data:session}= useSession();
    // console.log("data",session)
    const dispatch = useDispatch();
    const router = useRouter();
    // const token = Cookies.get('token');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }
    
    const token = useSelector(state => state.auth.user?.token);
    // console.log(token)
    const handleLogin = async() => {
      

    const data = {
        input:email,
        password:password,
    }

      
        try {
            const response = await axios.post('https://njs.iretiensemble.com/users/login',data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if(response.status === 201 || response.status === 200){
                const {user,token} = response.data.responseData;
                // console.log(user, token);
                // const {user, token} = response.data;
                dispatch(authActions.loginSuccess(user,token));
                toast.success("Login Successfully")
                router.replace('/');
            }else{
                console.log("login error",response.data);
            }
        } catch (error) {
            console.log("login",error);
        }
    }
    const openNewTab=()=>{
        const width = window.innerWidth;
        const height = width * 0.6;
        const newWindow = window.open("https://www.iretiensemble.com/pages/BeforeLogin", "_blank", `toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=${height}`);
        window.newWindow = newWindow; 
        console.log(window);
    }
    async function handleGoogleSignin() {
        openNewTab()
        const result = await signIn('google',{callbackUrl:"https://www.iretiensemble.com/pages/signUpReDirect"});
        // console.log("resultttt",result)

        if (!result?.error) {
          
            const userData = result?.responseData.user; // Extract user data from result
            dispatch(authActions.loginSuccess(userData));// Dispatch action to store user data in Redux store
          
        } else {
            console.log(result?.error);
        }
    };




    const [emailRegister, setEmailRegister] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');

    const handleChangeEmailRegister = (e) => {
        setEmailRegister(e.target.value);
    }

    const handleChangePasswordRegister = (e) => {
        setPasswordRegister(e.target.value);
    }

    const handleRegister = async() => {
        const data = {
            email:emailRegister,
            password:passwordRegister,
        }

        try {
            const response = await axios.post('https://njs.iretiensemble.com/users/register', data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if(response.status === 201 || response.status === 201){
                const {user,token} = response.data.responseData;
                // console.log(response.data);
                // const {newUser, token} = response.data;
                dispatch(authActions.loginSuccess(user,token));
                router.push('/');
            }else{
                console.log(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
  


    // const handleGoogleRegister = async()=>{
    //     // window.open('https://www.iretiensemble.com')
    //      openNewTab()
    //      const result = await signIn('google',{callbackUrl:"https://www.iretiensemble.com/pages/signUpReDirect"});
    //     // console.log(result);
    //     if (!result?.error) {

    //         // Handle successful sign-in
    //         const userData = result.responseData.user; // Extract user data from result
    //         // console.log(userData);
    //         dispatch(authActions.loginSuccess(userData));

    //         router.replace('/');
    //     } else {
    //         console.log(result?.error);
    //     }
    // }

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data === "closeAndRedirect") {
              if (window.newWindow) {
                window.newWindow.close();
                window.location.href = "/";
              }
            }
        };
      
        window.addEventListener("message", handleMessage);
      
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    },[])

    return (
        <div className="main">
            <nav className="breadcrumb-nav border-0 mb-0">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/" style={{ fontFamily: "'Gotham Thin',sans-serif" }}>Home</ALink>
                        </li>
                        <li className="breadcrumb-item active" style={{ fontFamily: "'Gotham Thin',sans-serif", fontWeight: "800" }}>Login</li>
                    </ol>
                </div>
            </nav>

            <div className="login-page bg-image pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17" style={{ backgroundImage: `url(images/backgrounds/login-bg.jpg)` }}>
                <div className="container">
                    <div className="form-box">
                        <div className="form-tab">
                            <Tabs selectedTabClassName="show" defaultIndex={0}>
                                <TabList className="nav nav-pills nav-fill">
                                    <Tab className="nav-item">
                                        <span className="nav-link">Sign In</span>
                                    </Tab>

                                    <Tab className="nav-item">
                                        <span className="nav-link">Register</span>
                                    </Tab>
                                </TabList>

                                <div className="tab-content">
                                    <TabPanel style={{ paddingTop: "2rem" }}>
                                        <div>
                                            {/* <form action='/'> */}
                                                <div className="form-group">
                                                    <label htmlFor="singin-email-2" style={{ fontFamily: "'Gotham Medium',sans-serif" }}>Username or email address *</label>
                                                    <input value={email} onChange={handleChangeEmail} type="text" className="form-control" id="singin-email-2" name="singin-email" required style={{ fontFamily: "'Gotham Light',sans-serif" }} />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="singin-password-2" style={{ fontFamily: "'Gotham Medium',sans-serif" }}>Password *</label>
                                                    <input value={password} onChange={handleChangePassword} type="password" className="form-control" id="singin-password-2" name="singin-password" required style={{ fontFamily: "'Gotham Light',sans-serif" }} />
                                                </div>

                                                <div className="form-footer">
                                                    <button onClick={()=>handleLogin()}  className="btn btn-outline-primary-2">
                                                        <span>LOG IN</span>
                                                        <i className="icon-long-arrow-right"></i>
                                                    </button>

                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="signin-remember-2" />
                                                        <label className="custom-control-label" style={{ fontFamily: "'Gotham Medium',sans-serif" }} htmlFor="signin-remember-2">Remember Me</label>
                                                    </div>
                                                </div>
                                            {/* </form> */}
                                            <div className="form-choice">
                                                <p className="text-center" style={{ fontFamily: "'Gotham Medium',sans-serif" }}>or sign in with</p>
                                                <div className="flex">
                                                    <div className="">
                                                    <ALink href="/pages/login" className="btn btn-login btn-g">
                                                        <button type='button' onClick={openNewTab}>
                                                            <i className="icon-google"></i>
                                                            Login With Google
                                                        </button>
                                                        </ALink>
                                                    </div>
                                                    {/* <div className="col-sm-6">
                                                        <ALink href="/pages/login" className="btn btn-login btn-f">
                                                            <i className="icon-facebook-f"></i>
                                                            Login With Facebook
                                                            </ALink>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>

                                    <TabPanel>
                                        {/* <form action='/'> */}
                                            <div className="form-group">
                                                <label htmlFor="register-email-2" style={{ fontFamily: "'Gotham Medium',sans-serif" }}>Your email address *</label>
                                                <input value={emailRegister} onChange={handleChangeEmailRegister} type="email" style={{ fontFamily: "'Gotham Light',sans-serif" }} className="form-control" id="register-email-2" name="register-email" required />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="register-password-2" style={{ fontFamily: "'Gotham Medium',sans-serif" }}>Password *</label>
                                                <input value={passwordRegister} onChange={handleChangePasswordRegister} type="password" style={{ fontFamily: "'Gotham Light',sans-serif" }} className="form-control" id="register-password-2" name="register-password" required />
                                            </div>

                                            <div className="form-footer">
                                                <button onClick={() => handleRegister()} type="submit" className="btn btn-outline-primary-2">
                                                    <span>SIGN UP</span>
                                                    <i className="icon-long-arrow-right"></i>
                                                </button>

                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="register-policy-2" required />
                                                    <label className="custom-control-label" style={{ fontFamily: "'Gotham Medium',sans-serif" }} htmlFor="register-policy-2">I agree to the privacy policy *</label>
                                                </div>
                                            </div>
                                        {/* </form> */}
                                        <div className="form-choice">
                                            <p className="text-center" style={{ fontFamily: "'Gotham Medium',sans-serif" }}>or sign up with</p>
                                            <div className="flex" onClick={openNewTab}>
                                                <div className="">
                                                {/* href="/pages/signUpReDirect" */}
                                                    <ALink href=""   className="btn btn-login btn-g">
                                                        <i className="icon-google"></i>
                                                        Register With Google
                                                    </ALink>
                                                </div>
                                                {/* <div className="col-sm-6">
                                                    <ALink href="/pages/login" className="btn btn-login  btn-f">
                                                        <i className="icon-facebook-f"></i>
                                                        Login With Facebook
                                                    </ALink>
                                                </div> */}
                                            </div>
                                        </div>
                                    </TabPanel>
                                </div>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;