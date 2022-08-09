import {useRef} from 'react';
import {useScroll} from 'react-use';
import {Skeleton} from '~/components';
import ArrowLink from '../ArrowLink';

export function CartEmpty({onClose}) {
  const scrollRef = useRef(null);

  return (
    <section className="pt-24">
      <h1 className="text-4xl text-black pb-10">Your cart is empty</h1>
      <ArrowLink label="shop" to="/products" direction="right" />
      <ArrowLink label="about" to="/pages/about" direction="right" />
    </section>
  );
}

function Loading() {
  return (
    <>
      {[...new Array(4)].map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} className="grid gap-2">
          <Skeleton className="aspect-[3/4]" />
          <Skeleton className="w-32 h-4" />
        </div>
      ))}
    </>
  );
}
