// @ts-expect-error @headlessui/react incompatibility with node16 resolution
import ArrowLink from '../ArrowLink';
import { Link } from '@shopify/hydrogen';


/**
 * A server component that specifies the content of the footer on the website
 */
export function FooterMenu({menu}) {
  
  return (
    <section className="w-max flex flex-col justify-between text-gray-dark text-xs mb-4 leading-loose tracking-wider">
      {(menu?.items || []).map((item) => (
          <>
            {(item?.items?.length > 0) && (
              <div className="flex flex-col text-center md:text-left">
                <p className="font-bold">{item.title}</p>
                {item.items.map((subItem) => (
                  <Link 
                    key={subItem.id} 
                    to={subItem.to} 
                    target={subItem.target}
                    className="hover:underline"
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            )}
          </>
      ))}{' '}
    </section>
  )
};
