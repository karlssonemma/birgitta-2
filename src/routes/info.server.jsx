import { 
    flattenConnection, 
    Image, 
    useShopQuery, 
    useLocalization,
    gql
} from "@shopify/hydrogen";
import { Layout } from "../components/index.server";
import { Suspense } from "react";


export default function InfoPage() {
    const {
        language: {isoCode: languageCode},
    } = useLocalization();


    const {data} = useShopQuery({
        query: QUERY, 
        variables: {
            languageCode,
            handle: "information", 
            first: 100
        },
        preload: true,
    })

    const info = flattenConnection(data.blog.articles)
    const postsWithImage = info.filter(post => post.image)


    return(
        <Layout>
            <Suspense>
                <section id="infoSection" className="my-6 text-black font-light md:py-16 m-auto flex flex-col-reverse md:flex-row gap-[10%] opacity-0 animate-[fadeUp_0.5s_ease-in-out_1.2s_forwards]">
                    <section className="md:w-[40%]">
                        {postsWithImage && postsWithImage.map(post => {
                            return(
                                <Image data={post.image} key={post.image.id} className="w-full pb-[100px]" />
                            )
                        })
                        }
                    </section>
                    <section className="md:w-[60%]">
                        {info.map(article => {
                            return(
                                <article className={`mb-7 w-full`}>
                                        <div>
                                            <h2 className="font-serif font-normal tracking-wide text-lg pb-2">{article.title}</h2>
                                            <p className="tracking-wide">{article.content}</p>
                                        </div>
                                </article>
                            )
                        })}
                    </section>
                </section>
            </Suspense>
        </Layout>
    )
}

const QUERY = gql`
    query getBlog(
        $handle: String, 
        $first: Int,
        $languageCode: LanguageCode) 
    @inContext(language: $languageCode) {
        blog(handle: $handle) {
            handle
            articles(first: $first) {
                edges {
                    node {
                        title
                        handle
                        id
                        content
                        image {
                            id
                            url
                            altText
                        }
                    }
                }
            }
        }
    }
`;
