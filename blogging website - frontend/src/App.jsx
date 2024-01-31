import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";

export const userContext=createContext({})

const App = () => {
    const [userAuth,setuserAuth]=useState({data:{access_token:null}});

    useEffect(()=>{
        let userInSession=lookInSession("user");
        // console.log(userInSession,"user bhetla bho session madhe")
        userInSession ? setuserAuth(JSON.parse(userInSession)) : setuserAuth({data:{access_token:null}})
        console.log(userAuth ,"lad");
    },[])

    return (
        <userContext.Provider value={{userAuth,setuserAuth}}>
            <Routes>
                <Route path="/" element={<Navbar/>}>
                    <Route path="/signin" element={<UserAuthForm type="sign-in"/>}/>
                    <Route path="/signup" element={<UserAuthForm type="sign-up"/>}/>
                </Route>
            </Routes>
        </userContext.Provider>
    )
}
export default App;