import ArrowLink from "../ArrowLink";

export function CartEmpty() {

  return (
    <section className="pt-24">
      <h1 className="text-4xl text-black pb-10">Your cart is empty</h1>
      <ArrowLink label="shop" to="/products" direction="right" />
      <ArrowLink label="about" to="/pages/about" direction="right" />
    </section>
  );
}
