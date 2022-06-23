// @ts-expect-error @headlessui/react incompatibility with node16 resolution
import {Link} from '@shopify/hydrogen';


/**
 * A server component that specifies the content of the footer on the website
 */
export function FooterMenu({menu}) {
  

  return (
    <>
      {(menu?.items || []).map((item) => {
        console.log("FOOOTER ITEM",item)
        return(
        <section key={item.id} className="w-max flex justify-between items-center">
          <Link key={item.id} target={item.target} to={item.url} className="text-xs uppercase text-gray-dark hover:underline mx-4 tracking-wider">
            {item.title}
          </Link>
        </section>
        )
      })}{' '}
    </>
  );
}
