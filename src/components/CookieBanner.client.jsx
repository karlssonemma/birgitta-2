import { useState, useEffect } from "react"

const CookieBanner = () => {

    const [visibility, setVisibility] = useState(false)

    useEffect(() => {
        if(localStorage.getItem("cookieSeen") != "shown") {
            setVisibility(true)
        }
    }, [])

    const handleClick = () => {
        setVisibility(false)
        localStorage.setItem("cookieSeen", "shown")
    }


    return(
        <div className={`${visibility ? "flex" : "hidden"} w-full h-auto bg-black sticky bottom-0 p-4 tracking-wider text-xs flex-row justify-between items-center`}>
            This website uses cookies. By continuing to browse this site you are agreeing to our use of cookies. 
            <Accept handleClick={handleClick} />
        </div>
    )
}

const Accept = ({ handleClick }) => {

    return(
        <button 
            className="border-[1px] border-solid px-4 py-2" 
            onClick={() => handleClick()}
        >
            ok
        </button>
    )
}

export default CookieBanner;