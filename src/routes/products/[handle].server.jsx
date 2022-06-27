import {Suspense} from 'react';
import {
  gql,
  ProductOptionsProvider,
  Seo,
  ShopifyAnalyticsConstants,
  useLocalization,
  useRouteParams,
  useServerAnalytics,
  useShopQuery,
  ProductProvider,
  flattenConnection,
  Image,
  useProductOptions,
  ProductPrice
} from '@shopify/hydrogen';

import {MEDIA_FRAGMENT} from '~/lib/fragments';
import {getExcerpt} from '~/lib/utils';
import {NotFound, Layout} from '~/components/index.server';

import ProductOptions from '../../components/ProductOptions.client';
import NoImage from '../../components/NoImage';
import Gallery from '../../components/Gallery.client';
import MoneyPrice from '../../components/MoneyPrice.client'






export default function Product() {

  const {handle} = useRouteParams();
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();


  const {
    data: {product, shop},
  } = useShopQuery({
    query: PRODUCT_QUERY,
    variables: {
      country: countryCode,
      language: languageCode,
      handle,
    },
    preload: true,
  });

  if (!product) {
    return <NotFound type="product" />;
  }

  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.product,
      resourceId: product.id,
    },
  });

  const {media, title, vendor, description, id} = product;
  const {shippingPolicy, refundPolicy} = shop;

  console.log("MY PRODUCT =====>", product)

  const images = flattenConnection(product.media)

  let leftCol = images.filter((el, i) => {
    return (i % 2 === 0)
  })
  let rightCol = images.filter((el, i) => {
    return !(i % 2 === 0)
  })

  return (
    <Layout>
      <Suspense>
        <Seo type="product" data={product} />
      </Suspense>
      <ProductOptionsProvider data={product}>

        
        <Gallery media={media.nodes} />

        <div className="flex flex-col-reverse md:flex-row gap-16 mt-2">
          <section className="hidden md:block md:w-1/2">
            {leftCol.length > 0 ? leftCol.map(img => <Image key={img.id} data={img.image} className="pb-16" alt={img.image.altText} />) : <NoImage />}
          </section>
          <section className="md:w-1/2">
                
          {/* DIV FØR ANNAT GALLERI */}
          {/* <div className="mt-5 mb-8 md:w-1/2 relative"> */}
            <div className="mt-6 mb-12 relative w-full max-h-max p-8">
             
                <h1 className="text-2xl tracking-wide text-black font-serif pb-2">{title}</h1>
                <ProductPrice data={product} valueType="max" className="tracking-wide text-md max-w-fit mb-6" />
                <p className="max-w-fit uppercase mb-3 pb-1 text-xs border-b border-black tracking-wider">Description</p>
                <p className="font-sans font-light pb-6 text-black text-base tracking-wide">{description}</p>
            <ProductOptions />
            
                        
            </div>
              <div className="hidden md:block">
                {
                  rightCol.map(img => <Image key={img.id} data={img.image} className="pb-16" />)
                }
              </div>
          </section> 

        </div>



        {/* <Section padding="x" className="px-0">
          <div className="grid items-start md:gap-6 lg:gap-20 md:grid-cols-2 lg:grid-cols-3">
            <ProductGallery
              media={media.nodes}
              className="w-screen md:w-full lg:col-span-2"
            />
            <div className="sticky md:-mb-nav md:top-nav md:-translate-y-nav md:h-screen md:pt-nav hiddenScroll md:overflow-y-scroll">
              <section className="flex flex-col w-full max-w-xl gap-8 p-6 md:mx-auto md:max-w-sm md:px-0">
                <div className="grid gap-2">
                  <Heading as="h1" format className="whitespace-normal">
                    {title}
                  </Heading>
                  {vendor && (
                    <Text className={'opacity-50 font-medium'}>{vendor}</Text>
                  )}
                </div>
                <ProductForm />
                <div className="grid gap-4 py-4">
                  {description && (
                    <ProductDetail
                      title="Product Details"
                      content={description}
                    />
                  )}
                  {shippingPolicy?.body && (
                    <ProductDetail
                      title="Shipping"
                      content={getExcerpt(shippingPolicy.body)}
                      learnMore={`/policies/${shippingPolicy.handle}`}
                    />
                  )}
                  {refundPolicy?.body && (
                    <ProductDetail
                      title="Returns"
                      content={getExcerpt(refundPolicy.body)}
                      learnMore={`/policies/${refundPolicy.handle}`}
                    />
                  )}
                </div>
              </section>
            </div>
          </div>
        </Section> */}
        {/* <Suspense>
          <ProductSwimlane title="Related Products" data={id} />
        </Suspense> */}

      </ProductOptionsProvider>
    </Layout>
  );
}

const PRODUCT_QUERY = gql`
  ${MEDIA_FRAGMENT}
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      vendor
      description
      media(first: 7) {
        nodes {
          ...Media
        }
      }
      priceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 100) {
        nodes {
          id
          availableForSale
          selectedOptions {
            name
            value
          }
          image {
            id
            url
            altText
            width
            height
          }
          priceV2 {
            amount
            currencyCode
          }
          compareAtPriceV2 {
            amount
            currencyCode
          }
          sku
          title
          unitPrice {
            amount
            currencyCode
          }
        }
      }
      seo {
        description
        title
      }
    }
    shop {
      shippingPolicy {
        body
        handle
      }
      refundPolicy {
        body
        handle
      }
    }
  }
`;
