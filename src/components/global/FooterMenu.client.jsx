// @ts-expect-error @headlessui/react incompatibility with node16 resolution
import {Link} from '@shopify/hydrogen';
import ArrowLink from '../ArrowLink';


/**
 * A server component that specifies the content of the footer on the website
 */
export function FooterMenu({menu}) {
  
  return (
    <section className="w-max flex flex-col justify-between">

      {(menu?.items || []).map((item) => {
        return(
          // <Link key={item.id} target={item.target} to={item.url} className="text-xs lowercase text-gray-dark hover:underline mx-4 tracking-wider">
          //   {item.title}
          // </Link>
          <ArrowLink direction='right' to={item.url} label={item.title} classes='lowercase' blank={true} />
        )
      })}
    </section>
  );
}
