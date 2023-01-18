import {
    useLocalization,
    useShopQuery,
    gql,
    Image,
    Seo
  } from "@shopify/hydrogen";
import {Suspense} from "react";
import {NotFound, Layout} from "~/components/index.server";

export default function AboutPage({params}) {
    const {
        language: {isoCode: languageCode},
    } = useLocalization();

    
    // const {handle} = params;
  
    const {
      data: {page},
    } = useShopQuery({
      query: PAGE_QUERY,
      variables: {
        languageCode, 
        handle: "about",
        namespace: "my_fields",
        imgKey: "image",
        quoteKey: "quote"
    },
    });
  
    if (!page) {
      return <NotFound />;
    }

    //add to div for animation
    // let animationClasses = 'opacity-0 animate-[fadeUp_0.5s_ease-in-out_1.2s_forwards]'

    return(
        <Layout>
          <Suspense>
            <Seo type="page" data={page} />
          </Suspense>
            <div className={`flex flex-col md:flex-row m-auto gap-10 py-10 pb-20 text-black`}>
                <Image
                    data={page.image.reference.image} 
                    width="800px" 
                    height="400px"
                    className="w-[70vw] md:w-1/2 h-auto object-cover"
                />
                <section className="md:w-1/2">
                    <h1 className="text-3xl md:text-4xl py-6 font-serif tracking-wide">{page.quote.value}</h1>
                    <div
                        dangerouslySetInnerHTML={{__html: page.body}}
                        className="font-light"
                    />
                </section>
            </div>
        </Layout>
    )
};

const PAGE_QUERY = gql`
  query PageDetails(
    $languageCode: LanguageCode, 
    $handle: String!,
    $namespace: String!, 
    $imgKey: String!, 
    $quoteKey: String!)
  @inContext(language: $languageCode) {
    page(handle: $handle) {
      id
      title
      body
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
      quote: metafield(namespace: $namespace, key: $quoteKey) {
        type
        id
        value
      }
    }
  }
`;