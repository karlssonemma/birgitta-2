import {Text} from '~/components';
import {Drawer} from './Drawer.client';
import {Link} from '@shopify/hydrogen';

export function MenuDrawer({isOpen, onClose, menu}) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="left">
        <MenuMobileNav menu={menu} onClose={onClose} />
    </Drawer>
  );
}

function MenuMobileNav({menu, onClose}) {
  return (
    <nav className="p-6 flex flex-col bg-gray-light w-full h-full justify-center">
      {/* Top level menu items */}
      {(menu?.items || []).map((item) => (
        <Link key={item.id} to={item.to} target={item.target} onClick={onClose} className="text-black p-4 lowercase tracking-wider">
            {item.title}
        </Link>
      ))}
      <Link to='/info' onClick={onClose} className="text-black p-4 lowercase tracking-wider" key={'infoPage'}>
        Info
      </Link>
    </nav>
  );
}
