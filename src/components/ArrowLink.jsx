import ArrowIcon from "./ArrowIcon";
import { Link } from "@shopify/hydrogen/client";

    

const ArrowLink = ({ label, to, direction, classes, blank }) => {


    let LinkClasses = `group text-sm tracking-widest text-black pb-3 block hover:underline ${classes}`
    let ArrowClasses = `stroke-black ${direction === "right" ? "rotate-180 ml-3" : "mr-3"}`;

    if(direction === "right") {
        return(
            <Link to={to} className={LinkClasses} target={blank ? '_blank' : ''}>
                {label}
                <ArrowIcon classes={ArrowClasses} />
            </Link>
        )
    } else {
        return(
            <Link to={to} className={LinkClasses} target={blank ? '_blank' : ''}>
                <ArrowIcon classes={ArrowClasses} />
                {label}
            </Link>
        )
    }
    
}



export default ArrowLink;


