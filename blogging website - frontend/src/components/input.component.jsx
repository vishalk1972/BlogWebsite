const InputBox=({name,type,id,value,placeholder})=>{
    retrun (
        <div className="relative w-[100%] mb-4">
            <input
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                id={id}
            />

        </div>
    )
}