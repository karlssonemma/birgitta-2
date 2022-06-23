import {Link, Image, useShopQuery} from "@shopify/hydrogen";
import gql from "graphql-tag";

import ArrowIcon from "../components/ArrowIcon";
import ArrowLink from "./ArrowLink";
import { PAYMENT_ICONS } from "./PaymentIcons";


/**
 * A server component that specifies the content of the footer on the website
 */
export default function Footer() {

  let year = new Date().getFullYear();

  const {data} = useShopQuery({
    query: QUERY
  })
  
  const {data: links} = useShopQuery({
    query: LINKS_QUERY,
    variables: {
      handle: "footer"
    }
  })

  console.log("LIIINKS", links.menu.items)

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
    // <footer className="w-screen h-40 py-6 px-6 md:px-24 bottom-0 left-0 relative flex justify-between items-center">
    //   <Image 
    //       src="/logo.png"
    //       width={160}
    //       height={160}
    //       alt="Logo with link to landing page"
    //     />
    //   <div>
    //     <ArrowLink to="/" direction="right" label="instagram" />
    //     <ArrowLink to="/" direction="right" label="email" />
    //   </div>
    // </footer>
    <footer className="w-screen h-40 py-6 px-6 md:px-24 bottom-0 left-0 relative flex flex-col justify-center items-center ">
      <section className="w-max flex justify-between items-center">
        <FooterLink to="mailto:info@birgittajadenfelt.com">Email me</FooterLink>
        <FooterLink to="/about">About</FooterLink>
        <FooterLink to="https://www.instagram.com/sybiggan/">Instagram</FooterLink>
      </section>
      <section className="flex pt-6">
        <Cards />
      </section>
      <small className="mt-6 text-gray-dark tracking-wider">
        Copyright &copy; {year}, Developed by&nbsp;
        <a href="http://www.karlssonemma.com" target="_blank">
           Emma Karlsson
        </a>
      </small>
      {/* <small className="mt-2 text-gray-dark tracking-wider">Powered by Shopify</small> */}
    </footer>
  );
}

const FooterLink = ({to, children}) => {
  return(
    <Link to={to} className="text-xs uppercase text-gray-dark hover:underline mx-4 tracking-wider">
      {children}
    </Link>
  )
}

const QUERY = gql`
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

const LINKS_QUERY = gql`
  query FooterLinks($handle: String!) {
    menu(handle: $handle) {
      handle
      items {
        url
        title
        id
      }
    }
  }
`;



