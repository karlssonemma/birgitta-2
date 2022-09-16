import {Suspense} from 'react';
import {
  CacheLong,
  gql,
  Seo,
  ShopifyAnalyticsConstants,
  useServerAnalytics,
  useLocalization,
  useShopQuery,
  flattenConnection,
  Image,
  Link

} from '@shopify/hydrogen';

import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {getHeroPlaceholder} from '~/lib/placeholders';
import {FeaturedCollections, Hero} from '~/components';
import {Layout, ProductSwimlane} from '~/components/index.server';

import ArrowIcon from '../components/ArrowIcon';
import FeaturedSection from '../components/FeaturedSection.client';


export default function Homepage() {
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();


  const {data} = useShopQuery({
    query: QUERY, 
    variables: {
      handle: 'landing',
      namespace: 'my_fields',
      imgKey: 'image',
      bodyKey: 'body_text',
      titleKey: 'title'
    },
    preload: true
  });

  const {data: featuredCollection} = useShopQuery({
    query: FEATQUERY, 
    variables: {
      handle: 'featured', 
      first: 3,
      country: countryCode
    },
    preload: true
  });

  const collection = featuredCollection.collection;
  const products = flattenConnection(collection.products);
  const page = data.page;



  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.home,
    },
  });

  return (
    <Layout>
      <Suspense>
        <Seo 
          type="page" 
          data={{
            title: "Home"
          }} 
        />
        <div className='h-max md:h-[calc(100vh-8rem)] text-black flex flex-col-reverse md:flex-row lg:justify-start items-center gap-24'>
          <Image 
            data={page.image.reference.image}
            width={2000}
            height={2000}
            className='lg:w-1/3 md:w-1/2 h-auto max-h-full object-cover'
          />
          
          <div className='h-[calc(100vh-8rem)] flex flex-col md:block justify-center md:h-auto md:w-1/2 lg:w-1/3 py-12'>
            <h1 className='text-5xl mb-4 font-serif tracking-wider opacity-0 animate-[fadeUp_0.5s_ease-in-out_1.2s_forwards]'>{page.title.value}</h1>
            <p className='font-light font-sans mb-4 tracking-wider opacity-0 animate-[fadeUp_0.5s_ease-in-out_1.4s_forwards]'>{page.bodyText.value}</p>
            <LinkToShop />
          </div>
        </div>
        <FeaturedSection collection={collection} products={products} />
      </Suspense>
    </Layout>
  );
}

const LinkToShop = () => {
  return(
    <Link to='/collections/main' className='group text-lg text-green-dark block mt-4 hover:underline font-bold tracking-wider transition-colors opacity-0 animate-[fadeUp_0.5s_ease-in-out_1.6s_forwards]'>Go to shop
      <ArrowIcon classes='rotate-180 stroke-green-dark ml-6 transition-colors scale-[150%]' />
    </Link>
  )
}

// function SeoForHomepage() {
//   const {
//     data: {
//       shop: {title, description},
//     },
//   } = useShopQuery({
//     query: HOMEPAGE_SEO_QUERY,
//     cache: CacheLong(),
//     preload: true,
//   });

//   return (
//     <Seo
//       type="homepage"
//       data={{
//         title,
//         description,
//         titleTemplate: '%s · Powered by Hydrogen',
//       }}
//     />
//   );
// }

// const HOMEPAGE_CONTENT_QUERY = gql`
//   ${MEDIA_FRAGMENT}
//   ${PRODUCT_CARD_FRAGMENT}
//   query homepage($country: CountryCode, $language: LanguageCode)
//   @inContext(country: $country, language: $language) {
//     heroBanners: collections(
//       first: 3
//       query: "collection_type:custom"
//       sortKey: UPDATED_AT
//     ) {
//       nodes {
//         id
//         handle
//         title
//         descriptionHtml
//         heading: metafield(namespace: "hero", key: "title") {
//           value
//         }
//         byline: metafield(namespace: "hero", key: "byline") {
//           value
//         }
//         cta: metafield(namespace: "hero", key: "cta") {
//           value
//         }
//         spread: metafield(namespace: "hero", key: "spread") {
//           reference {
//             ...Media
//           }
//         }
//         spreadSecondary: metafield(namespace: "hero", key: "spread_secondary") {
//           reference {
//             ...Media
//           }
//         }
//       }
//     }
//     featuredCollections: collections(
//       first: 3
//       query: "collection_type:smart"
//       sortKey: UPDATED_AT
//     ) {
//       nodes {
//         id
//         title
//         handle
//         image {
//           altText
//           width
//           height
//           url
//         }
//       }
//     }
//     featuredProducts: products(first: 12) {
//       nodes {
//         ...ProductCard
//       }
//     }
//   }
// `;

const QUERY = gql`
query PageDetails(
  $handle: String, 
  $namespace: String!, 
  $imgKey: String!,
  $bodyKey: String!,
  $titleKey: String!) {
  page(handle: $handle) {
    body
    bodySummary
    seo {
      description
      title
    }
    image: metafield(namespace: $namespace, key: $imgKey) {
      type
      id
      reference {
        ... on MediaImage {
            mediaContentType
          id
          image {
            url
          }
        }
      }
    }
    title: metafield(namespace: $namespace, key: $titleKey) {
      type
      id
      value
    }
    bodyText: metafield(namespace: $namespace, key: $bodyKey) {
      type
      id
      value
    }
  }
}
`;

const FEATQUERY = gql`
query Collection($handle: String!, $first: Int!, $country: CountryCode) @inContext(country: $country) {
  collection(handle: $handle) {
     description
     products(first: $first) {
       edges {
         node {
         title
         id
         description
         handle
         priceRange {
           maxVariantPrice {
             amount
             currencyCode
           }
         }
         featuredImage {
           altText
           id
           url
         }
         }
       }
     }
 }
}
    `

const HOMEPAGE_SEO_QUERY = gql`
  query homeShopInfo {
    shop {
      description
    }
  }
`;
