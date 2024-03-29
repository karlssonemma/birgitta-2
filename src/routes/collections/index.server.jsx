import {useShopQuery, useLocalization, gql, Seo} from "@shopify/hydrogen";
import {Suspense} from "react";

import {Section, Grid} from "~/components";
import {Layout, CollectionCard} from "~/components/index.server";
import {getImageLoadingPriority, PAGINATION_SIZE} from "~/lib/const";

export default function Collections() {
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {data} = useShopQuery({
    query: COLLECTIONS_QUERY,
    variables: {
      pageBy: PAGINATION_SIZE,
      country: countryCode,
      language: languageCode,
    },
    preload: true,
  });

  const collections = data.collections.nodes;

  return (
    <Layout>
      <Suspense>
        <Seo
          type="page"
          data={{
            title: "All Collections",
          }}
        />
      </Suspense>
      <Section>
        <Grid items={collections.length === 3 ? 3 : 2}>
          {collections.map((collection, i) => (
            <CollectionCard
              collection={collection}
              key={collection.id}
              loading={getImageLoadingPriority(i, 2)}
            />
          ))}
        </Grid>
      </Section>
    </Layout>
  );
}

const COLLECTIONS_QUERY = gql`
  query Collections(
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int!
  ) @inContext(country: $country, language: $language) {
    collections(first: $pageBy) {
      nodes {
        id
        title
        description
        handle
        seo {
          description
          title
        }
        image {
          id
          url
          width
          height
          altText
        }
      }
    }
  }
`;
