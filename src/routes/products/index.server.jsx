import {useShopQuery, gql, useLocalization, Seo} from "@shopify/hydrogen";

import {PRODUCT_CARD_FRAGMENT} from "~/lib/fragments";
import {PAGINATION_SIZE} from "~/lib/const";
import {Layout} from "~/components/index.server";
import {Suspense} from "react";
import ProductCard from "../../components/ProductCard.client";

export default function AllProducts() {
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {data} = useShopQuery({
    query: ALL_PRODUCTS_QUERY,
    variables: {
      country: countryCode,
      language: languageCode,
      pageBy: PAGINATION_SIZE,
    },
    preload: true,
  });

  const products = data.products;


  return (
    <Layout>
      <Suspense>
        <Seo
          type="page"
          data={{
            title: "All Products",
            description: "All product"
          }}
        />
      </Suspense>
      <p className="w-full text-right uppercase tracking-wider text-xs text-gray-dark py-5">{products.nodes.length} products</p>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 m-auto">

        {products?.nodes && products.nodes.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}

        </ul>
    </Layout>
  );
}

// API to paginate products
// @see templates/demo-store/src/components/product/ProductGrid.client.tsx
export async function api(request, {params, queryShop}) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
      headers: {Allow: "POST"},
    });
  }

  const url = new URL(request.url);
  const cursor = url.searchParams.get("cursor");
  const country = url.searchParams.get("country");
  const {handle} = params;

  return await queryShop({
    query: PAGINATE_ALL_PRODUCTS_QUERY,
    variables: {
      handle,
      cursor,
      pageBy: PAGINATION_SIZE,
      country,
    },
  });
}

const ALL_PRODUCTS_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query AllProducts(
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int!
    $cursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $pageBy, after: $cursor) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;

const PAGINATE_ALL_PRODUCTS_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query ProductsPage(
    $pageBy: Int!
    $cursor: String
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: $pageBy, after: $cursor) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
