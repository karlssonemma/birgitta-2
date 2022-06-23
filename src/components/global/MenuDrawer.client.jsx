import {Text} from '~/components';
import {Drawer} from './Drawer.client';
import {Link} from '@shopify/hydrogen';

export function MenuDrawer({isOpen, onClose, menu}) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="left">
      <div className="grid bg-gray-light">
        <MenuMobileNav menu={menu} onClose={onClose} />
      </div>
    </Drawer>
  );
}

function MenuMobileNav({menu, onClose}) {
  return (
    <nav className="grid gap-4 p-6 sm:gap-6 sm:px-12 sm:py-8 bg-gray-light">
      {/* Top level menu items */}
      {(menu?.items || []).map((item) => (
        <Link key={item.id} to={item.to} target={item.target} onClick={onClose} className="text-black">
            {item.title}
        </Link>
      ))}
    </nav>
  );
}
