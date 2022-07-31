import {Layout} from '~/components/index.server';
import { Image, useShopQuery, gql } from "@shopify/hydrogen";
import { Suspense } from 'react';




function AboutPage() {

    const {data} = useShopQuery({
        query: QUERY, 
        variables: {
            handle: "about",
            namespace: "my_fields",
            imgKey: "image",
            quoteKey: "quote",
            bodyKey: "body_text"

        }
    })
    const page = data.page;


    return(
        <Layout>
            <Suspense>
            <div className="flex flex-col md:flex-row m-auto gap-10 py-10 opacity-0 animate-[fadeUp_0.5s_ease-in-out_1.2s_forwards]">
                <Image 
                    data={page.image.reference.image} 
                    width="800px" 
                    height="400px"
                    className="w-[70vw] md:w-1/2 h-auto rounded-tr-[100px] object-cover"
                />
                <section className="md:w-1/2 md:pt-20">
                    <h1 className="text-3xl md:text-4xl font-serif tracking-wide">{page.quote.value}</h1>
                        {/* <RawHtml string={page.body} as="div" className="my-6 font-light tracking-wide" /> */}
                        <p>{page.bodyText.value}</p>
                </section>
            </div>
            </Suspense>
        </Layout>
    )
}

const QUERY = gql`
    query Page(
        $handle: String, 
        $namespace: String!, 
        $imgKey: String!, 
        $quoteKey: String!,
        $bodyKey: String!) {
        page(handle: $handle) {
            body
            handle
            id
            seo {
                description
                title
            }
            title
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
            quote: metafield(namespace: $namespace, key: $quoteKey) {
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

export default AboutPage;