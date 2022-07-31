import {  
    Link,
    Image,
} from "@shopify/hydrogen/client";

import { useState, useEffect } from "react";

import ArrowLink from "./ArrowLink";
import MoneyPrice from "./MoneyPrice.client";


const FeaturedSection = ({collection, products}) => {

  const [inView, setInView] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    handleScroll()
  }, [])

  const handleScroll = () => {

    let product = document.getElementById("featuredSection");
    
    let productPosition = product.getBoundingClientRect().top;
    let screenPosition = window.innerHeight / 1.2;

    if (productPosition < screenPosition) setInView(true)
    
  }
  

    return(
      <article className="w-screen relative left-[50%] translate-x-[-50%] py-20 px-6" id="featuredSection">
        <div className={`flex justify-between py-6 max-w-5xl m-auto overflow-hidden opacity-0 translate-y-[30px] ${inView && "animate-[fadeUp_0.7s_ease-in-out_forwards]"}`}>
          <h2 className="text-3xl text-black font-serif">{collection.description}</h2>
          <div>
            <ArrowLink to="/collections/main" direction="right" label="view all items" />
          </div>
        </div>
        <ul className={`flex justify-between overflow-x-scroll no-scrollbar scroll-snap-x scroll-smooth gap-6 m-auto max-w-5xl translate-y-[30px] opacity-0 ${inView && "animate-[fadeUp_0.7s_ease-in-out_forwards]"}`}>

          {products.map((product) => {  
              return(
                <li key={product.id} className="w-[60vw] max-w-[300px] h-full object-cover object-center flex-shrink-0 md:flex-shrink-1 snap-start group">
                  <Link to={`products/${product.handle}`}>
                    <Image 
                      data={product.featuredImage}
                      className="h-[400px] w-full object-cover group-hover:brightness-90 transition-all"
                      alt={product.featuredImage.altText}
                      width={300}
                      height={300}
                    />
                    <div className="my-6 text-center tracking-wide">
                      <p className="font-serif text-lg pb-2  group-hover:underline text-black">{product.title}</p>
                      <MoneyPrice money={product.priceRange.maxVariantPrice} />
                    </div>
                  </Link>
                </li>
              )
            })}

        </ul>
      </article>
    )
  }




  export default FeaturedSection;