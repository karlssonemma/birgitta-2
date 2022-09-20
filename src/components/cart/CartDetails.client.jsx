import {
  useCart,
  CartLineProvider,
  CartCheckoutButton,
} from '@shopify/hydrogen';

import {CartLineItem, CartEmpty} from '~/components';
import MoneyPrice from '../MoneyPrice.client';
import { BUTTON_DEFAULT_CLASS } from '../Button.client';

export function CartDetails({onClose, data}) {
  const {lines} = useCart();
  
  if (lines.length === 0) {
    return <CartEmpty onClose={onClose} />;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 relative">

      <section
        aria-labelledby="cart-contents"
        className={`w-full md:w-1/2`}
      >
        <ul className="grid gap-4">
          {lines.map((line) => {
            return (
              <CartLineProvider key={line.id} line={line}>
                <CartLineItem />
              </CartLineProvider>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="summary-heading" className="w-full md:w-1/2 md:p-6 flex flex-col">
        <article className="mb-8 text-black">
          <h2 className="mb-2">{data.blog.articleByHandle.title}</h2>
          <p className="text-sm font-light">{data.blog.articleByHandle.excerpt}</p>
        </article>

        <OrderSummary />
        
        <CartCheckoutButton className={`${BUTTON_DEFAULT_CLASS} px-10`}>Check out</CartCheckoutButton>
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

      {/* <div className="flex flex-row justify-between pb-2 text-md">
          <span>Taxes</span>
          {(cost?.totalTaxAmount) ? <MoneyPrice money={cost.totalTaxAmount} /> : <p>-</p>}
      </div> */}
      
      <div className="flex flex-row justify-between pb-8 text-xl">
          <span>Total</span>
          <MoneyPrice money={cost.totalAmount} />
      </div>

    </div>
  );
}
