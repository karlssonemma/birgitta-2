import clsx from 'clsx';
import {
  flattenConnection,
  Image,
  Link,
  Money,
  useMoney,
} from '@shopify/hydrogen';

import {useState, useEffect} from 'react';

import {isDiscounted, isNewArrival} from '~/lib/utils';
import {getProductPlaceholder} from '~/lib/placeholders';

import ArrowIcon from '../ArrowIcon';
import MoneyPrice from '../MoneyPrice.client';

export function ProductCard({product, label, className, loading, onClick}) {
  let cardLabel;

  const cardData = product?.variants ? product : getProductPlaceholder();

  const {
    image,
    priceV2: price,
    compareAtPriceV2: compareAtPrice,
  } = flattenConnection(cardData?.variants)[0] || {};

  if (label) {
    cardLabel = label;
  } else if (isDiscounted(price, compareAtPrice)) {
    cardLabel = 'Sale';
  } else if (isNewArrival(product.publishedAt)) {
    cardLabel = 'New';
  }
 
  const styles = clsx('grid gap-6', className);

  // const [cardInView, setCardInView] = useState(false);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll)
  //   handleScroll()
  // }, [])

  // const handleScroll = (e) => {

  //   let prod = document.getElementById(product.id);    
  //   let productPosition = prod.getBoundingClientRect().top;
  //   let screenPosition = window.innerHeight / 1.2;

  //   if (productPosition < screenPosition) setCardInView(true)
    
  // }

  return (
    <div className={`block text-md mb-4 relative group transition duration-500 ease-in-out`}>
    <Link onClick={onClick} to={`/products/${product.handle}`}>
          {image && (
            <Image
              className="object-cover aspect-square mb-2 group-hover:brightness-90 transition-all"
              widths={[320]}
              sizes="320px"
              loaderOptions={{
                crop: 'center',
                scale: 2,
                width: 320,
                height: 400,
              }}
              // @ts-ignore Stock type has `src` as optional
              data={image}
              alt={image.altText || `Picture of ${product.title}`}
              loading={loading}
            />
          )}
        
        <div className="relative my-8">
          <p className="mb-2 text-black font-serif text-xl tracking-wide group-hover:underline">{product.title}</p>
          <MoneyPrice money={price} />
          <ArrowIcon classes="rotate-180 absolute top-2 right-0"/>

          {/* <div className="flex gap-4">
            <Text className="flex gap-4">
              <Money withoutTrailingZeros data={price} />
              {isDiscounted(price, compareAtPrice) && (
                <CompareAtPrice
                  className={'opacity-50'}
                  data={compareAtPrice}
                />
              )}
            </Text>
          </div> */}
        </div>
    </Link>
   </div>
  );
}

