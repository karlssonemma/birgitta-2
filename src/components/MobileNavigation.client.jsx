import {Fragment, useEffect, useState} from "react";
import {Link, useCart} from "@shopify/hydrogen/client";
import {FocusTrap} from "@headlessui/react";
import CloseIcon from "../components/CloseIcon";

/**
 * A client component that defines the navigation for a mobile storefront
 */
export default function MobileNavigation({collections, isOpen, setIsOpen}) {
  const OpenFocusTrap = isOpen ? FocusTrap : Fragment;

  const [topScrollOffset, setTopScrollOffset] = useState(0);
  const {totalQuantity} = useCart();

  useEffect(() => {
    if (isOpen) {
      setTopScrollOffset(window.scrollY);
      document.body.style.position = "fixed";
    } else {
      document.body.style.position = '';
      window.scrollTo(0, parseInt(topScrollOffset, 10));
    }
  }, [isOpen, topScrollOffset]);

  return (
    <div className="lg:hidden">
      <OpenFocusTrap>
        <div className="flex flex-row">
          <Link to="/cart" className={`flex flex-row mr-4 ${isOpen ? "hidden" : ''}`}>
            <img 
              src="/shopping-bag.png" 
              className="w-6 mr-2"
            />
            <span>({totalQuantity})</span>
          </Link>
          <button
            type="button"
            className="flex justify-center items-center self-center w-7 h-full z-20"
            onClick={() => setIsOpen((previousIsOpen) => !previousIsOpen)}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
          >
            {isOpen ? <CloseIcon /> : <Hamburger />}
          </button>

          <div>

          </div>
        </div>
        {isOpen ? ( 
          <nav className="fixed left-0 top-0 w-full h-screen z-10 bg-gray-light flex items-center justify-center">
            <ul>
              <li className="my-4 text-center tracking-widest">
                <NavLink
                  to="/collections/main"
                  onClick={() => setIsOpen(false)}
                >
                    Shop
                </NavLink>
              </li>
              <li className="my-4 text-center tracking-widest">
                <NavLink
                  to="/about"
                  onClick={() => setIsOpen(false)}
                >
                    About
                </NavLink>
              </li>
              <li className="my-4 text-center tracking-widest">
                <NavLink
                  to="/info"
                  onClick={() => setIsOpen(false)}
                >
                    Info
                </NavLink>
              </li>
            </ul>
            {/* <MobileCountrySelector /> */}
          </nav>
        ) : null}
      </OpenFocusTrap>
    </div>
  );
}

function NavLink({ to, children, ...props }) {
  return(
    <Link to={to} className="group text-gray-dark hover:underline lowercase" {...props}>
      {children}
    </Link>
  )
}


const Hamburger = () => {
  return(
    <div className="w-6 h-4 flex flex-col justify-between">
      <div className="w-full h-0.5 bg-black"></div>
      <div className="w-full h-0.5 bg-black"></div>
      <div className="w-4/5 h-0.5 bg-black"></div>
    </div>
  )
}
