const CookieBanner = () => {

    return(
        <div className="w-full h-auto bg-slate-400 sticky bottom-0 p-4 tracking-wider text-xs">
            Cookiebanner
            <Accept />
        </div>
    )
}

const Accept = () => {
    return(
        <button className="absolute top-4 right-4">
            x
        </button>
    )
}

export default CookieBanner;