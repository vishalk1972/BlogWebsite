import AnimationWrapper from "../common/page-animation"
import InputBox from "../components/input.component"
import googleIcon from "../imgs/google.png"
import {Link, Navigate} from "react-router-dom"
import {Toaster,toast} from "react-hot-toast"
import {emailRegex,passwordRegex} from "../regex.js"
import axios from "axios"
import { storeInSession } from "../common/session"
import { useContext } from "react"
import { userContext } from "../App"


const UserAuthForm=({type})=>{
    

    let {userAuth,setuserAuth}=useContext(userContext);
    let {data}=userAuth;
    console.log(data.access_token);

    let serverRroute = type==="sign-in" ? "/signin" : "/signup"
    const userAuthThroughServer=(serverRroute,formData)=>{
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRroute,formData)
        .then((data)=>{
            storeInSession("user",JSON.stringify(data));
            setuserAuth(data);
            toast.success("Successs")
        })
        .catch((err)=>{
             let data=JSON.parse(err.request.response)
             return toast.error(data.error)
        })
    }


    /////////////
    const handleSubmit=(e)=>{
        e.preventDefault();
        let form=new FormData(formElement)
        let formData={}
        for(let [key,value] of form.entries())
        {
            formData[key]=value
        }
        let {fullname,email,password}=formData
        console.log(fullname , "my name");
        if(type==="sign-up")
        {
            if(fullname.length<3)
            {
                return toast.error("Fullname must be of atleast length 3")
            }
        }
        if(!email.length)
        {
            return toast.error("Enter Email")
        }
        if(!emailRegex.test(email)) // regex pattern checking
        {
            return toast.error("Email is invalid")
        }
        if(!passwordRegex.test(password))
        {
            return toast.error("Password should be 6 to 20 charcters long with a neumeric, 1 lowercase and 1 uppercase letter")
        }
        userAuthThroughServer(serverRroute,formData);
    }
    /////////////
    // data.access_token ? <Navigate to="/"/> :
    return <AnimationWrapper keyId={type}>
        <section className="h-cover flex items-center justify-center">
            <Toaster/>
            <form id="formElement" className="w-[80%] max-w-[400px]">
                    <h1 className="text-4xl font-gelasio capitalize text-center mb-24">{type==="sign-in" ? "Welcome Back" : "Join Us Today"}</h1>
                        {
                            type==="sign-up" ?
                            <InputBox
                                name="fullname"
                                type="text"
                                placeholder="Full Name"
                                icon="fi-rr-user"
                            />
                            :""
                        }

                        <InputBox
                            name="email"
                            type="email"
                            placeholder="Email"
                            icon="fi-rr-envelope"
                        />
                        <InputBox
                            name="password"
                            type="password"
                            placeholder="Password"
                            icon="fi-rr-key"
                        />

                        <button className="btn-dark center mt-14"
                        type="submit"
                         onClick={(e)=>handleSubmit(e)}
                        >
                            {type.replace("-"," ")}
                        </button>


                        <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
                                <hr className="w-1/2 border-black"/>
                                <p>OR</p>
                                <hr className="w-1/2 border-black"/>
                        </div>

                    
                        <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
                            <img src={googleIcon} className="w-5 "></img>
                            continue with google
                        </button>


                        {
                            type==="sign-in" ?
                            <p className="mt-6 text-dark-grey text-xl text-center">
                                Don't Have an Account ?
                                <Link to="/signup" className="underline text-black text-xl ml-1">
                                    Join us today
                                </Link>
                            </p>
                            :
                            <p className="mt-6 text-dark-grey text-xl text-center">
                                Already a member ?
                                <Link to="/signin" className="underline text-black text-xl ml-1">
                                    sign in here
                                </Link>
                            </p>
                        }
            </form>
        </section>
    </AnimationWrapper>
}
export default UserAuthForm