import ArrowIcon from "./ArrowIcon";
import { Link } from "@shopify/hydrogen/client";

    

const ArrowLink = ({ label, to, direction, classes, color }) => {

    let LinkClasses = "group text-sm tracking-widest text-black pb-3 block hover:underline"
    let ArrowClasses = `stroke-black ${direction === "right" ? "rotate-180 ml-3" : "mr-3"}`;

    if(direction === "right") {
        return(
            <Link to={to} className={LinkClasses}>
                {label}
                <ArrowIcon classes={ArrowClasses} />
            </Link>
        )
    } else {
        return(
            <Link to={to} className={LinkClasses}>
                <ArrowIcon classes={ArrowClasses} />
                {label}
            </Link>
        )
    }
    
}



export default ArrowLink;


