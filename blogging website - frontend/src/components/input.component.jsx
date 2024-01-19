import { useState } from "react";

const InputBox=({name,type,id,value,placeholder,icon})=>{
    const [openEye,setOpenEye]=useState(false)
    return (
        <div className="relative w-[100%] mb-4">
            <input
                name={name}
                type={type==="password" ? openEye ? "text" : "password" : type}
                placeholder={placeholder}
                defaultValue={value}
                id={id}
                className="input-box"
            />
            <i className={"fi "+ icon+" input-icon"}></i>

            {
                type==="password" ?
                <i className={"fi " + (openEye ? "fi-rr-eye" : "fi-rr-eye-crossed") +" input-icon left-[auto] right-4 cursor-pointer"}
                    onClick={()=>setOpenEye(value=>!value)}
                ></i>
                :""
            }
        </div>
    )
}
export default InputBox;