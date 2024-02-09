import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { useContext } from "react";
import { userContext } from "../App";
import { removeFromSession } from "../common/session";

const UserNavigationPanel=()=>{
    const {userAuth,setuserAuth}=useContext(userContext)
    const {data}=userAuth
    const {username}=data
    const signOutUser=()=>{
        removeFromSession("user");
        setuserAuth({data:{access_token:null}})
    }
    
    return(
        <AnimationWrapper
        className="absolute right-0 z-50"
        transition={{duration:0.2}}
        >
            <div className="bg-white border border-grey w-60 duration-200">
                <Link to="/editor" className="flex gap-2 link md:hidden pl-8 py-4 ">
                    <i class="fi fi-rr-file-edit"></i>Write
                </Link>

                <Link to={`/user/${username}`} className="link pl-8 py-4">
                    Profile
                </Link>

                <Link to='/dashboard/blogs' className="link pl-8 py-4">
                    Dashboard
                </Link>

                <Link to='/setting/edit-profile' className="link pl-8 py-4">
                    Setting
                </Link>

                <span className="absolute border-t border-grey w-[100%]"></span>

                <button onClick={signOutUser} className="text-left p-4 hover:bg-grey w-full pl-8 py-4">
                    <h1 className="font-bold text-xl mb-1">Sign Out</h1>
                    <p className="text-dark-grey">@{username}</p>
                </button>

            </div>

        </AnimationWrapper>
    )
}
export default UserNavigationPanel;