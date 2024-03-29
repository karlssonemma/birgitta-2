import {useLocalization, useShopQuery, CacheLong, gql} from "@shopify/hydrogen";
import { Suspense } from "react";

import {Header} from "~/components";
import {Footer} from "~/components/index.server";
import {parseMenu} from "~/lib/utils";
import CookieBanner from "../CookieBanner.client";


const HEADER_MENU_HANDLE = "main-menu";
const FOOTER_MENU_HANDLE = "footer";

/**
 * A server component that defines a structure and organization of a page that can be used in different parts of the Hydrogen app
 */
export function Layout({children}) {
  const {
    language: {isoCode: languageCode},
  } = useLocalization();

  const {data} = useShopQuery({
    query: SHOP_QUERY,
    variables: {
      language: languageCode,
      headerMenuHandle: HEADER_MENU_HANDLE,
      footerMenuHandle: FOOTER_MENU_HANDLE,
    },
    cache: CacheLong(),
    preload: '*',
  });

  const shopName = data ? data.shop.name : "Birgitta Jadenfelt";
  const customPrefixes = {BLOG: '', CATALOG: "products"};

  const headerMenu = data?.headerMenu
    ? parseMenu(data.headerMenu, customPrefixes)
    : undefined;

  const footerMenu = data?.footerMenu
    ? parseMenu(data.footerMenu, customPrefixes)
    : undefined;


  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>
        <Header title={shopName} menu={headerMenu} />
        <main role="main" id="mainContent" className="flex-grow bg-gray-light px-6 md:px-24 min-h-screen">
          {children}
        </main>
      </div>
      <Footer menu={footerMenu} />
      <CookieBanner />
    </>
  );
}

const SHOP_QUERY = gql`
  fragment MenuItem on MenuItem {
    id
    resourceId
    tags
    title
    type
    url
  }
  query layoutMenus(
    $language: LanguageCode
    $headerMenuHandle: String!
    $footerMenuHandle: String!
  ) @inContext(language: $language) {
    shop {
      name
    }
    headerMenu: menu(handle: $headerMenuHandle) {
      id
      title
      handle
      items {
        ...MenuItem
        items {
          ...MenuItem
        }
      }
    }
    footerMenu: menu(handle: $footerMenuHandle) {
      id
      title
      handle
      items {
        ...MenuItem
        items {
          ...MenuItem
        }
      }
    }
  }
`;
