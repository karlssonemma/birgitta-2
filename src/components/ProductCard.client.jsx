import {flattenConnection, Image, Link} from "@shopify/hydrogen/client";
import { useEffect, useState } from "react";
import ArrowIcon from "./ArrowIcon";

import MoneyPrice from "./MoneyPrice.client";
import NoImage from "./NoImage";

/**
 * A shared component that displays a single product to allow buyers to quickly identify a particular item of interest
 */
export default function ProductCard({product}) {
  const selectedVariant = product.variants.nodes[0];
  
  if (selectedVariant == null) {
    return null;
  }

  const fadeUp = "translate-y-[20px] opacity-0 transition-all";
  const inView = "translate-y-[0px] opacity-1"

  const [cardInView, setCardInView] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    handleScroll()
  }, [])

  const handleScroll = (e) => {

    let prod = document.getElementById(product.id);    
    let productPosition = prod.getBoundingClientRect().top;
    let screenPosition = window.innerHeight / 1.2;

    if (productPosition < screenPosition) setCardInView(true)
    
  }

  return (
    <div id={product.id} className={`block text-md mb-4 relative group transition duration-500 ease-in-out ${cardInView ? "translate-y-0 opacity-1" : "translate-y-5 opacity-0"}`}>
    <Link to={`/products/${product.handle}`}>
        {selectedVariant.image ? (
          <Image
            className="object-cover aspect-square mb-2 group-hover:brightness-90 transition-all"
            data={selectedVariant.image}
            alt={selectedVariant.image.altText}
          />
        ) : <NoImage />}
      <div className="relative my-8">
        <p className="mb-2 text-black font-serif text-xl tracking-wide group-hover:underline">{product.title}</p>

          {/* {selectedVariant.compareAtPriceV2 && (
            <MoneyCompareAtPrice money={selectedVariant.compareAtPriceV2} className='font-light' />
          )} */}
          <MoneyPrice money={selectedVariant.priceV2} />
        <ArrowIcon classes="rotate-180 absolute top-2 right-0"/>
      </div>
    </Link>
    </div>
  );
}
