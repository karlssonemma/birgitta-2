import {useRef} from 'react';
import {useScroll} from 'react-use';
import {
  useCart,
  CartLineProvider,
  CartShopPayButton,
  Money,
  CartCheckoutButton
} from '@shopify/hydrogen';

import {Button, Text, CartLineItem, CartEmpty} from '~/components';
import MoneyPrice from '../MoneyPrice.client';
import { BUTTON_DEFAULT_CLASS } from '../Button.client';

export function CartDetails({layout, onClose}) {
  const {lines} = useCart();
  const scrollRef = useRef(null);
  const {y} = useScroll(scrollRef);

  
  if (lines.length === 0) {
    return <CartEmpty onClose={onClose} />;
  }

  // const container = {
  //   drawer: 'grid grid-cols-1 h-screen-no-nav grid-rows-[1fr_auto]',
  //   page: 'pb-12 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-start gap-4 md:gap-8 lg:gap-12',
  // };

  // const content = {
  //   drawer: 'px-6 pb-6 sm-max:pt-2 overflow-auto transition md:px-12',
  //   page: 'flex-grow md:translate-y-4',
  // };

  // const summary = {
  //   drawer: 'grid gap-6 p-6 border-t md:px-12',
  //   page: 'sticky top-nav grid gap-6 p-4 md:px-6 md:translate-y-4 bg-primary/5 rounded w-full max-w-md',
  // };

  return (
    <div className="flex flex-col md:flex-row gap-8 relative">

      <section
        aria-labelledby="cart-contents"
        className={`w-full md:w-1/2`}
      >
        <ul className="grid gap-6 md:gap-10">
          {lines.map((line) => {
            return (
              <CartLineProvider key={line.id} line={line}>
                <CartLineItem />
              </CartLineProvider>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="summary-heading" className="w-full md:w-1/2 p-6 flex flex-col">
        <OrderSummary />
        <CartCheckoutButton className={`${BUTTON_DEFAULT_CLASS} px-10`}>Check out</CartCheckoutButton>

        {/* <h2 id="summary-heading" className="sr-only">
          Order summary
        </h2>
        <OrderSummary />
        <CartCheckoutActions /> */}
      </section>

    </div>
  );
}

function OrderSummary() {
  const {cost} = useCart();

  return (
    <div className="text-black">

      <div className="flex flex-row justify-between pb-2 text-md">
          <span>Subtotal</span>
          <MoneyPrice money={cost.subtotalAmount} />
      </div>

      <div className="flex flex-row justify-between pb-2 text-md">
          <span>Taxes</span>
          {(cost?.totalTaxAmount) ? <MoneyPrice money={cost.totalTaxAmount} /> : <p>-</p>}
      </div>
      
      <div className="flex flex-row justify-between pb-8 text-xl">
          <span>Total</span>
          <MoneyPrice money={cost.totalAmount} />
      </div>

    </div>
  );
}
