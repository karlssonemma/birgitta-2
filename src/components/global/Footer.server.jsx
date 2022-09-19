import {useShopQuery, gql} from '@shopify/hydrogen';

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
      className="w-screen h-max py-10 px-6 md:px-24 bottom-0 left-0 relative flex flex-col md:flex-row justify-between items-center bg-gray-medium"
    >
      {/* <FooterMenu menu={menu} /> */}

      <section className="flex flex-col pt-6">
        <CountrySelector />
        <Cards />
        <small className="text-gray-dark">Copyright &copy; {year}, Developed by&nbsp;
        <a href="http://www.karlssonemma.com" target="_blank">
           Emma Karlsson
        </a></small>
      </section>
    </footer>
  );
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
