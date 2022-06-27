// @ts-expect-error @headlessui/react incompatibility with node16 resolution
import {Link} from '@shopify/hydrogen';


/**
 * A server component that specifies the content of the footer on the website
 */
export function FooterMenu({menu}) {
  
  return (
    <section className="w-max flex justify-between items-center">

      {(menu?.items || []).map((item) => {
        return(
          <Link key={item.id} target={item.target} to={item.url} className="text-xs uppercase text-gray-dark hover:underline mx-4 tracking-wider">
            {item.title}
          </Link>
        )
      })}
    </section>
  );
}
