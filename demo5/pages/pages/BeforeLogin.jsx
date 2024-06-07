import { signIn } from "next-auth/react";
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import ALink from "~/components/features/alink";
import {actions as authActions} from '~/store/auth';
const BeforeLogin = () => {


const dispatch = useDispatch()


  async function handleGoogleSignin() {
    const result = await signIn("google", {
      callbackUrl: "https://www.iretiensemble.com/pages/signUpReDirect",
    });
    // console.log("resultttt",result)

    if (!result?.error) {
      const userData = result?.responseData.user; // Extract user data from result
      dispatch(authActions.loginSuccess(userData)); // Dispatch action to store user data in Redux store
    } else {
      console.log(result?.error);
    }
  }

  return (
    <div className="" style={{height:"500px", width:"100%" , display:"flex" , justifyContent:"center", alignItems:"center"}}>
   
                                                        <button type='button' className="btn btn-primary" onClick={handleGoogleSignin}>
                                                            <i className="icon-google"></i>
                                                            Continue With Google
                                                        </button>
                                                       
    </div>
  );
};

export default BeforeLogin;
