import {useShopQuery, gql} from '@shopify/hydrogen';
import { renderIntoDocument } from 'react-dom/test-utils';

import {FooterMenu, CountrySelector} from '~/components';

import { PAYMENT_ICONS } from '../PaymentIcons';

/**
 * A server component that specifies the content of the footer on the website
 */
export function Footer({menu}) {

  const {data} = useShopQuery({
    query: PAYMENT_QUERY
  });

  let year = new Date().getFullYear();
  const paymentMethods = [...data.shop.paymentSettings.acceptedCardBrands, ...data.shop.paymentSettings.supportedDigitalWallets]

    const Cards = () => {
    
      return(
        <div className="flex my-5 justify-center md:justify-start">
          {PAYMENT_ICONS.map(icon => {
            if (paymentMethods.includes(icon.name)) 
                return(
                  <div className="mx-1">
                    {icon.svg()}
                  </div>
                )
          })}
        </div>
      )
    }

  return (
    <footer
      className="w-screen h-max py-10 px-6 md:px-24 bottom-0 left-0 relative flex flex-col md:flex-row justify-between items-center md:items-start bg-gray-light gap-10"
    >
      <section className="w-max flex gap-12">
        <Contact />
        <FooterMenu menu={menu} />
      </section>

      <section className="flex flex-col pt-6 md:pt-0">
        <CountrySelector />
        <Cards />
        <small className="text-gray-dark">Copyright &copy; {year}, Developed by&nbsp;
        <a href="http://www.karlssonemma.com" target="_blank">
           Emma Karlsson,&nbsp;
        </a>
        Powered by&nbsp;
        <a href="http://www.shopify.com" target="_blank">
           Shopify
        </a>
        </small>
      </section>
    </footer>
  );
}

const Contact = () => {
  return(
    <section className="w-max flex flex-col justify-between text-gray-dark text-xs leading-loose tracking-wider">
      <div className="flex flex-col text-center md:text-left">
        <p className="font-bold">Contact</p>
        <a 
          href="mailto:info@birgittajadenfelt.com" 
          target="_blank"
          className="hover:underline"
        >
          info@birgittajadenfelt.com
        </a>
        <a 
          href="tel:+46 675 45 45 45"
          className="hover:underline"
        >
          +46 675 45 45 45
        </a>
      </div>
    </section>
  )
}

const PAYMENT_QUERY = gql`
    query Payment {
        shop {
        paymentSettings {
            acceptedCardBrands
            supportedDigitalWallets
            currencyCode
        }
        }
    }
`;
