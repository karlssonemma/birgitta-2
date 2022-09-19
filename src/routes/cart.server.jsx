import {Seo, useShopQuery, gql} from '@shopify/hydrogen';
import {Suspense} from 'react';
import {CartDetails} from '~/components';
import {Layout} from '~/components/index.server';

export default function Cart() {

  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      handle: 'information',
      articleHandle: 'info-om-pdf'
    }
  })

  return (
    <Layout>
      <Suspense>
        <Seo
          type="page"
          data={{
            title: 'Cart',
          }}
        />
      </Suspense>
      <section className="py-12">
        <CartDetails layout="page" data={data} />
      </section>
    </Layout>
  );
}

const QUERY = gql`
    query getBlogPost($handle: String!, $articleHandle: String!) {
        blog(handle: $handle) {
        articleByHandle(handle: $articleHandle) {
            handle
            id
            title
            excerpt
        }
        }
    }
`;
