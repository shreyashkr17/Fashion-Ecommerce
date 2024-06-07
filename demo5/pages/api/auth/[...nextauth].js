import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { useDispatch } from "react-redux";

// const dispatch = useDispatch();

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,

      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },
});

// export default NextAuth({
//     providers:[
//         GoogleProvider({
//             clientId:process.env.GOOGLE_CLIENT_ID,
//             clientSecret:process.env.GOOGLE_CLIENT_SECRET,
//         }),
//     ],
//     callbacks: {
//         async signIn({ user }) {
//           // Optionally perform additional checks or data manipulation here
//           const db = getFirestore(app); // Get Firestore instance
//           const userRef = collection(db, "users");

//           try {
//             await addDoc(userRef, { email: user.email, name: user.name });
//             console.log("User data stored successfully (server-side)");

//             const response = await axios.post('https://njs.iretiensemble.com/users/redirect-with-google', JSON.stringify(user), {
//               headers:{
//                 'Content-Type':'application/json'
//               }
//             });

//             if(response.status === 200 || response.status === 201){
//               console.log(response.data);
//             }else{
//               console.log(response.data);
//             }
//           } catch (error) {
//             console.error("Error storing user data:", error);
//           }

//           return user;
//         },
//       },
//       session: {
//         strategy: "jwt",
//       },
// });
