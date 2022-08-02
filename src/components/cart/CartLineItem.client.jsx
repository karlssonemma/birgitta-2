import {
  useCart,
  useCartLine,
  CartLineQuantityAdjustButton,
  CartLinePrice,
  CartLineQuantity,
  Image,
  Link,
} from '@shopify/hydrogen';

import {Heading, IconRemove, Text} from '~/components';
import CloseIcon from '../CloseIcon';
import MoneyPrice from '../MoneyPrice.client';

export function CartLineItem() {
  const {linesRemove} = useCart();
  const {id: lineId, quantity, merchandise} = useCartLine();
  console.log("MERCH",merchandise)

  return (
    <li key={lineId} className="flex h-40 p-6 bg-white mb-4 text-black">
      <Link to={`/products/${merchandise.product.handle}`}>
        {merchandise.image ? 
        <Image 
          data={merchandise.image}
          className="h-full w-[100px] object-cover" 
          alt={merchandise.product.title}
        />
        :  
        <NoImage />}            
      </Link>
      {/* <div className="flex-shrink">
        <Image
          width={112}
          height={112}
          widths={[112]}
          data={merchandise.image}
          loaderOptions={{
            scale: 2,
            crop: 'center',
          }}
          className="object-cover object-center w-24 h-24 border rounded md:w-28 md:h-28"
        />
      </div> */}



        <div className="pl-4">
          <Link to={`/products/${merchandise.product.handle}`} className="hover:underline">
            {merchandise.product.title}
          </Link>
          <div>
            <MoneyPrice money={merchandise.priceV2} />
          </div>
          <p className="tracking-wide">{merchandise.selectedOptions[0].value}</p>
          <CartLineQuantityAdjust lineId={lineId} quantity={quantity} />
        </div>


          {/* <div className="grid pb-2">
            {(merchandise?.selectedOptions || []).map((option) => (
              <Text color="subtle" key={option.name}>
                {option.name}: {option.value}
              </Text>
            ))}
          </div> */}
        
              <div className="flex flex-col grow justify-between items-end">
                <CartLineQuantityAdjustButton adjust="remove">
                  <CloseIcon />
                </CartLineQuantityAdjustButton>
                <CartLinePrice as="span" />
              </div>


            {/* <button
              type="button"
              onClick={() => linesRemove([lineId])}
              className="flex items-center justify-center w-10 h-10 border rounded"
            >
              <span className="sr-only">Remove</span>
              <IconRemove aria-hidden="true" />
            </button> */}
    </li>
  );
}

function CartLineQuantityAdjust({lineId, quantity}) {
  return (
      <div>
        <CartLineQuantityAdjustButton
          adjust="decrease"
          aria-label="Decrease quantity"
        >
          -
        </CartLineQuantityAdjustButton>
        <CartLineQuantity as="span" className="px-2" />
        <CartLineQuantityAdjustButton
          adjust="increase"
          aria-label="Increase quantity"
        >
          +
        </CartLineQuantityAdjustButton>
      </div>
  );
}
