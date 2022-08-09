import {useUrl, useShopQuery, gql} from '@shopify/hydrogen';

import {Section, Heading, FooterMenu, CountrySelector} from '~/components';

import { PAYMENT_ICONS } from '../PaymentIcons';

/**
 * A server component that specifies the content of the footer on the website
 */
export function Footer({menu}) {

  const {data} = useShopQuery({
    query: PAYMENT_QUERY
  });

  const paymentMethods = [...data.shop.paymentSettings.acceptedCardBrands, ...data.shop.paymentSettings.supportedDigitalWallets]

    const Cards = () => {
    
      return(
        <>
          {PAYMENT_ICONS.map(icon => {
            if (paymentMethods.includes(icon.name)) 
                return(
                  <div className="mx-1">
                    {icon.svg()}
                  </div>
                )
          })}
        </>
      )
    }

  return (
    <footer
      className="w-screen h-40 py-6 px-6 md:px-24 bottom-0 left-0 relative flex flex-col justify-center items-center bg-gray-light"
    >
      <FooterMenu menu={menu} />
      <section className="flex pt-6">
        <Cards />
      </section>
      <CountrySelector />
      {/* <div
        className={`self-end pt-8 opacity-50 md:col-span-2 lg:col-span-${itemsCount}`}
      >
        &copy; {new Date().getFullYear()} / Shopify, Inc. Hydrogen is an MIT
        Licensed Open Source project. This website is carbon&nbsp;neutral.
      </div> */}
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
