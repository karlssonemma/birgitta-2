import {Link, useUrl, useCart, Image} from '@shopify/hydrogen';
import logob from '../../assets/logob.svg';

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

function MobileHeader({openMenu}) {
  const {totalQuantity} = useCart()

  return (
    <header role="banner" className="lg:hidden relative h-max w-full max-w-[100vw] flex flex-row justify-between items-center z-40 py-6 px-6 md:px-24 bg-gray-light">

      <Link
        className="font-black font-serif uppercase text-3xl tracking-widest overflow-hidden"
        to="/"
      >
        <Logo />
      </Link>

      <div className="flex items-center">
        <button onClick={openMenu} className='flex m-4 h-max'>
          <Hamburger />
        </button>
        <NavLink to='/cart'>
          <span className="text-black mr-2">({totalQuantity})</span>
          <Bag />
          {/* <CartBadge dark={isHome} /> */}
        </NavLink>
      </div>

    </header>
  );
}

function DesktopHeader({menu}) {

  const {totalQuantity} = useCart();
  
  return (
    <header role="banner" className="hidden lg:flex relative h-max w-full max-w-[100vw] flex-row justify-between items-center z-40 py-6 px-6 md:px-24 bg-gray-light">
        <Link to="/">
          <Logo />
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
            <NavLink to='/info'>
              info
            </NavLink>
            <NavLink to='/cart'>
              <span className="mr-2">({totalQuantity})</span>
              <Bag />
            </NavLink>
          </ul>
        </nav>
    </header>
  );
}

function NavLink({ classes, to, children, target, key }) {

  
  return(
    <Link to={to} key={key} target={target} className={`flex m-4 lowercase hover:underline tracking-widest text-black text-sm overflow-hidden`}>
      <span className={`flex ${classes}`}>
      {children}
      </span>
    </Link>
  )
}

const Hamburger = () => {
  return(
    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1H15" stroke="black" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M1 9H15" stroke="black" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M1 5H15" stroke="black" stroke-width="1.2" stroke-linecap="round"/>
    </svg>
  )
}

const Bag = () => {
  return(
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 19L2 5H14L15 19H1Z" stroke="black" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M5 7V4C5 2.34315 6.34315 1 8 1V1C9.65685 1 11 2.34315 11 4V7" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const Logo = () => {

  return(
    <Image 
      src={logob} 
      width="150" 
      height="50" 
      alt="Logo with link to homepage."
    />
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
