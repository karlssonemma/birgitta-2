import {
  useCart,
  useCartLine,
  CartLineQuantityAdjustButton,
  CartLinePrice,
  CartLineQuantity,
  Image,
  Link,
} from '@shopify/hydrogen';

import CloseIcon from '../CloseIcon';
import MoneyPrice from '../MoneyPrice.client';
import NoImage from '../NoImage';

export function CartLineItem() {
  const {id: lineId, merchandise, cost, quantity} = useCartLine();

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

        <div className="pl-4">
          <Link to={`/products/${merchandise.product.handle}`} className="hover:underline">
            {merchandise.product.title}
          </Link>
          <div>
            <MoneyPrice money={cost.totalAmount} />
          </div>
          <p className="tracking-wide">{merchandise.selectedOptions[0].value}</p>
          <CartLineQuantityAdjust lineId={lineId} quantity={quantity} />
        </div>
      
        <div className="flex flex-col grow justify-between items-end">
          <CartLineQuantityAdjustButton adjust="remove">
            <CloseIcon />
          </CartLineQuantityAdjustButton>
          {/* <CartLinePrice as="span" /> */}
        </div>

    </li>
  );
}

function CartLineQuantityAdjust() {
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
