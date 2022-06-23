const ArrowIcon = ({classes}) => {

    return(
        <svg 
            height="10" 
            width="50" 
            strokeLinecap="round" 
            strokeWidth="1.5"
            className={`${classes} inline stroke-black`}
        >
            <line 
                x1="2" 
                y1="5" 
                x2="48" 
                y2="5" 
                // strokeWidth='2' 
            />
            <line 
                x1="5" 
                y1="2" 
                x2="2" 
                y2="5" 
                // strokeWidth='2' 
            />
            <line 
                x1="2" 
                y1="5" 
                x2="5" 
                y2="8" 
                // strokeWidth='2' 
            />
        </svg>
    )
}

export default ArrowIcon;