import {Link, useUrl, useCart} from '@shopify/hydrogen';
import {useWindowScroll} from 'react-use';

import {
  Heading,
  IconAccount,
  IconBag,
  IconMenu,
  IconSearch,
  Input,
} from '~/components';

import {CartDrawer} from './CartDrawer.client';
import {MenuDrawer} from './MenuDrawer.client';
import {useDrawer} from './Drawer.client';

/**
 * A client component that specifies the content of the header on the website
 */
export function Header({title, menu}) {
  const {pathname} = useUrl();

  const localeMatch = /^\/([a-z]{2})(\/|$)/i.exec(pathname);
  const countryCode = localeMatch ? localeMatch[1] : undefined;

  const isHome = pathname === `/${countryCode ? countryCode + '/' : ''}`;

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  return (
    <>
      {/* <CartDrawer isOpen={isCartOpen} onClose={closeCart} /> */}
      <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />
      <DesktopHeader
        countryCode={countryCode}
        isHome={isHome}
        title={title}
        menu={menu}
        openCart={openCart}
      />
      <MobileHeader
        countryCode={countryCode}
        isHome={isHome}
        title={title}
        openCart={openCart}
        openMenu={openMenu}
      />
    </>
  );
}

function MobileHeader({countryCode, title, isHome, openCart, openMenu}) {
  const {y} = useWindowScroll();
  const {totalQuantity} = useCart()

  const styles = {
    button: 'relative flex items-center justify-center w-8 h-8',
    container: `${
      isHome
        ? 'bg-primary/80 dark:bg-contrast/60 text-contrast dark:text-primary shadow-darkHeader'
        : 'bg-contrast/80 text-primary'
    } ${
      y > 50 && !isHome && 'shadow-lightHeader'
    } flex lg:hidden items-center h-nav sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 px-4 md:px-8`,
  };

  return (
    <header role="banner" className="lg:hidden relative h-max w-full max-w-[100vw] flex flex-row justify-between items-center z-40 py-6 px-6 md:px-24">

      <Link
        className="font-black font-serif uppercase text-3xl tracking-widest overflow-hidden"
        to="/"
      >
        <Heading className="font-bold text-center" as={isHome ? 'h1' : 'h2'}>
          {title}
        </Heading>
      </Link>

      <div className="flex">
        <button onClick={openMenu} className={styles.button}>
          <Hamburger />
        </button>
        <button onClick={openCart} className={styles.button}>
          {/* <IconBag /> */}
          <img 
              src="/shopping-bag.png"
              className="w-5 ml-2"
              alt="Shopping bag icon"
            />
          <span className="text-black">({totalQuantity})</span>
          {/* <CartBadge dark={isHome} /> */}
        </button>
      </div>

    </header>
  );
}

function DesktopHeader({countryCode, isHome, menu, openCart, title}) {
  
  return (
    <header role="banner" className="hidden lg:flex relative h-max w-full max-w-[100vw] flex-row justify-between items-center z-40 py-6 px-6 md:px-24">
        <Link to="/">
          {title}
        </Link>
        <nav className="flex gap-8">
          <ul className="md:flex items-center justify-center">
          {/* Top level menu items */}
          {(menu?.items || []).map((item, i) => {
            let delay = i + 5;
            let animation = `animate-[slideUp_0.5s_ease-in-out_0.${delay}s_forwards]`
            return(
            <li className="overflow-hidden" key={item.id}>
              <NavLink to={item.to} target={item.target} classes={animation}>
                {item.title}
              </NavLink>
            </li>
            )})}
          </ul>
        </nav>
    </header>
  );
}

function NavLink({ classes, to, children, target, key }) {

  
  return(
    <Link to={to} key={key} target={target} className={`flex m-4 lowercase hover:underline tracking-widest text-black text-sm overflow-hidden`}>
      <span className={`flex translate-y-[60px] ${classes}`}>
      {children}
      </span>
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

// function CartBadge({dark}) {
//   const {totalQuantity} = useCart();

//   if (totalQuantity < 1) {
//     return null;
//   }
//   return (
//     <div
//       className={`${
//         dark
//           ? 'text-primary bg-contrast dark:text-contrast dark:bg-primary'
//           : 'text-contrast bg-primary'
//       } absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px`}
//     >
//       <span>{totalQuantity}</span>
//     </div>
//   );
// }
