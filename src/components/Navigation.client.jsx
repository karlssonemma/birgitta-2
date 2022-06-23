import {Link, useCart} from "@shopify/hydrogen/client";

/**
 * A client component that defines the navigation for a web storefront
 */
export default function Navigation({collections}) {

  const {totalQuantity} = useCart();

  return (
    <nav className="hidden lg:block text-center">
      <ul className="md:flex items-center justify-center">
        <li className="overflow-hidden">
          <NavLink classes="animate-[slideUp_0.5s_ease-in-out_0.6s_forwards]" to="/collections/main">Shop</NavLink>
        </li>
        <li className="overflow-hidden">
          <NavLink classes="animate-[slideUp_0.5s_ease-in-out_0.7s_forwards]" to="/about">About</NavLink>
        </li>
        <li className="overflow-hidden">
          <NavLink classes="animate-[slideUp_0.5s_ease-in-out_0.8s_forwards]" to="/info">Info</NavLink>
        </li>
        <li className="overflow-hidden">
          <NavLink classes="animate-[slideUp_0.5s_ease-in-out_0.9s_forwards]" to="/cart">
            <span>({totalQuantity})</span>
            <img 
              src="/shopping-bag.png"
              className="w-5 ml-2"
              alt="Shopping bag icon"
            />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}


function NavLink({ classes, to, children }) {

  
  return(
    <Link to={to} className={`flex m-4 lowercase hover:underline tracking-widest text-black text-sm overflow-hidden`}>
      <span className={`flex translate-y-[60px] ${classes}`}>
      {children}
      </span>
    </Link>
  )
}
