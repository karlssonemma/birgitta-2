// @ts-expect-error @headlessui/react incompatibility with node16 resolution
import ArrowLink from '../ArrowLink';


/**
 * A server component that specifies the content of the footer on the website
 */
export function FooterMenu({menu}) {
  
  return (
    <section className="w-max flex flex-col justify-between">

      {(menu?.items || []).map((item) => {
        return(
          <ArrowLink direction='right' to={item.url} label={item.title} classes='lowercase' blank={true} />
        )
      })}
    </section>
  );
}
